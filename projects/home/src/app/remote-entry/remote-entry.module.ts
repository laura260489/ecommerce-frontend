import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteEntryComponent } from './remote-entry.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    RemoteEntryComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule.forChild([
      {
        path: "",
        component: RemoteEntryComponent,
        children: [
          { path: "", redirectTo: "categorias", pathMatch: "full" },
          {
            path: "categorias",
            loadChildren: () =>
              import("../containers/categories/categories.module").then(
                (m) => m.CategoriesModule
              ),
          },
          {
            path: "producto",
            loadChildren: () =>
              import("../containers//product/product.module").then(
                (m) => m.ProductModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class RemoteEntryModule { }
