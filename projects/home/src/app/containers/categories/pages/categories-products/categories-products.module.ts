import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesProductsComponent } from './categories-products.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoriesProductsComponent
      },
    ]),
    HttpClientModule,
    PaginatorModule,
    TagModule
  ],
  declarations: [CategoriesProductsComponent]
})
export class CategoriesProductsModule { }
