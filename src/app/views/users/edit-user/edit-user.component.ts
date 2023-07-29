import { Component, OnInit } from '@angular/core';
import {  
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  EmailValidator,
} from '@angular/forms';

import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {


  today: number = Date.now();
  userForm: FormGroup;
  isError = false;
  userData:any;
  constructor(private userService: UserService, private router: Router, public datepipe: DatePipe) {
    this.userForm = new FormGroup({
      email: new FormControl(),
      fullname: new FormControl('111', [Validators.required, Validators.minLength(4)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(9)]),
      gender: new FormControl(),
      dob: new FormControl('', [Validators.required])   
    }); 
   }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || '{}');     
    this.userForm.patchValue({
      'email':this.userData.email, 
      'fullname':this.userData.fullname,      
      'phoneNumber':this.userData.phoneNumber,
      'gender':this.userData.gender,
      'dob': this.userData.dob
    });
    
  }

  public updateUser(formData: any) {   
    formData.dob = this.datepipe.transform(formData.dob, 'dd-MM-yyyy');
    console.log(formData.dob);
    this.userService
    .updateUser(formData)
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
