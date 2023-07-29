import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: any;
  public totalUsers: any;
  public currentPage = 0;
  public totalPagesCount: any;
  public perPageRecord = 10;
  public successMessage = "";

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {    
    this.getUserData(0);
  }

  public getUserData(pageNumber: number) {        
    this.userService
      .getUsersList(pageNumber)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.totalUsers = res.data.count
        this.users = res.userList;
        this.totalPagesCount = Array(Math.ceil(this.totalUsers / this.perPageRecord));
        this.currentPage = pageNumber;
      });
  }

  public editUser(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData)); 
    this.router.navigate(['/edit-user']);
  }

  public changeUserStatus(userId: number) {
    this.userService
      .changeStatus(userId)
      .pipe(take(1))
      .subscribe((res: any) => {        
        this.successMessage = "User status changed successfully.";
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
        setTimeout(() => {
            this.successMessage = "";
        }, 1000);
        this.getUserData(0);
      });
    
  }
  public deleteUser(userId: number) {
    if (confirm("Do you really want to delete this User Profile?")) {
      this.userService
      .deleteUser(userId)
      .pipe(take(1))
      .subscribe((res: any) => {        
        this.successMessage = "User deleted successfully.";
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
        setTimeout(() => {
            this.successMessage = "";
        }, 1000);
        this.getUserData(0);
      });
    }
  }
}
