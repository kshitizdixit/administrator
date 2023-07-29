import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

import { WidgetsModule } from '../widgets/widgets.module';
import { AddCategoryComponent } from './add-category/add-category.component';

@NgModule({
  imports: [
    CategoryRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,    
    BsDatepickerModule.forRoot(), 
  ],
  declarations: [CategoryComponent, AddCategoryComponent]
})
export class CategoryModule {
}
