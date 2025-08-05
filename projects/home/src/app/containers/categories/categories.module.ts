import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoriesComponent
      },
      {
        path: ":slug",
        loadChildren: () =>
          import("./pages/categories-products/categories-products.module").then(
            (m) => m.CategoriesProductsModule
          ),
      },
    ])
  ],
  declarations: [CategoriesComponent]
})
export class CategoriesModule { }
