import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categories: any;
  public totalCategories: any;
  public currentPage = 0;
  public totalPagesCount: any;
  public perPageRecord = 10;
  public successMessage = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {    
    this.getCategories(0);
  }

  public getCategories(pageNumber: number) {        
    this.userService
      .getCategoriesList(pageNumber)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.totalCategories = res.data.count;
        this.categories = res.categorieslist;        
        console.log(this.totalCategories+"==="+this.perPageRecord+'AAAA' , this.categories[0]);
        let abc = Math.ceil(this.totalCategories / this.perPageRecord);
        this.totalPagesCount = Array(abc);console.log(this.totalPagesCount);
        this.currentPage = pageNumber;
      });
  }

  public editCategory(categoryData: any) {
    localStorage.setItem('category', JSON.stringify(categoryData)); 
    this.router.navigate([`/edit-category/${categoryData.categoryId}`]);
  }

  public changeCategoryStatus(categoryId: number) {
    this.userService
      .changeCategoryStatus(categoryId)
      .pipe(take(1))
      .subscribe((res: any) => {        
        this.successMessage = "Category status changed successfully.";
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
        setTimeout(() => {
            this.successMessage = "";
        }, 1000);
        this.getCategories(0);
      });
    
  }
  public deleteCategory(rowId: number, categoryId: number) {
    if (confirm("Do you really want to delete this Category?")) {
      this.userService
      .deleteCategory(categoryId)
      .pipe(take(1))
      .subscribe((res: any) => {        
        this.successMessage = "Category deleted successfully.";
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
        setTimeout(() => {
            this.successMessage = "";
        }, 1000);
        this.getCategories(0);
      });
    }
  

    //this.users.splice(rowId, 1);
  }

}
