import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private router: Router) {
    super();
  }

  public logoutUser() {    
    if (localStorage.getItem('token')) {
      console.log('Before Clear token===========' + localStorage.getItem('token'));
      localStorage.clear();
      console.log('After Clear token===========' + localStorage.getItem('token'));
      this.router.navigate(['/login']);
    }
  }
}
