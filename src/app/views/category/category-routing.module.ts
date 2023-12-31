import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CategoryComponent } from './category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    data: {
      title: $localize`Categories`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
