import { Component } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  EmailValidator,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isError = false;
  public fileName: any;

  constructor(private userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl('', Validators.required)      
    });   
  }

  ngOnInit() {
    /*if (localStorage.getItem('token')) {
      console.log('T===========' + localStorage.getItem('token'));
      this.router.navigate(['/dashboard']);
    }*/
  }

  public onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

       // const upload$ = this.http.post("/api/thumbnail-upload", formData);

       // upload$.subscribe();
    }
}

  public submitLogin(data: any) {
    console.log('asdasdsa', data);

    this.userService
      .submitUserData(data)
      .pipe(
        catchError((error) => {
          console.log('Redirect to user');
          this.isError = true;
          return throwError(error);
        })
      )
      .subscribe((userData: any) => {
        console.log('DATA=====', userData.data.token);    
        const payload = userData.data.token.split('.')[1];
        console.log('data2---',payload);
        const payloadContent = JSON.parse(window.atob(payload));
        console.log('data3---',payloadContent);       
        localStorage.setItem('token', userData.data.token);

        this.router.navigate(['/dashboard']);
      });
    //this.userData.submitUserData(data); */
  }
}
