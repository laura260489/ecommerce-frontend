import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesProductsComponent } from './categories-products.component';
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoriesProductsComponent
      },
    ]),
    PaginatorModule,
    TagModule,
    ButtonModule
  ],
  declarations: [CategoriesProductsComponent]
})
export class CategoriesProductsModule { }
