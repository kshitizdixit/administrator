import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  EmailValidator,
} from '@angular/forms';

import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  isError = false;
  constructor(private userService: UserService, private router: Router) {
    this.userForm = new FormGroup({
      fullname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])      
    }); 
   }

  ngOnInit(): void {
  }

  public addUser(formData: any) {
    console.log("======", formData);
    this.userService
    .addUser(formData)
    .pipe(
      catchError((error) => {
        console.log('Redirect to user');
        this.isError = true;
        return throwError(error);
      })
    )
    .subscribe((userData: any) => {      
      this.router.navigate(['/users']);
    });
  }
    
}
