import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm: FormGroup;
  isError = false;  
  categoryId: number = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addCategoryForm = new FormGroup({
      categoryName: new FormControl(),
      categoryImage: new FormControl(),
      profile: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {console.log("@@@@@@@@@@@",params);
      this.categoryId = params['id'];
      if (params['id']) {
        const categoryData = JSON.parse(localStorage.getItem('category') || '{}');
        this.addCategoryForm.patchValue({
          'categoryName': categoryData.categoryName        
        });
      }
    });    
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addCategoryForm.get('profile')?.setValue(file);
    }
  }

  public addCategory(formDatas: any) {
    const formData = new FormData();
    formData.append('categoryName',this.addCategoryForm.get('categoryName')?.value);
    formData.append('categoryImage',this.addCategoryForm.get('profile')?.value);
    console.log("@@@@",formData);
    this.userService
      .addCategory(formData, this.categoryId)
      .pipe(
        catchError((error) => {
          console.log('Redirect to user',error);
          this.isError = true;
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        this.router.navigate(['/category']);
      });
  }
}
