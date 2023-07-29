import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { take } from 'rxjs';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public data: any;

  constructor(private userData: UserService) {}

  ngOnInit(): void {
    this.userData
      .getDashboardData()
      .pipe(take(1))
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
      });
  }
}
