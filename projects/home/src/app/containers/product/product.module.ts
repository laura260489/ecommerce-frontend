import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: ':id',
      component: ProductComponent
    }]),
    HttpClientModule,
    GalleriaModule,
    ButtonModule,
    DividerModule,
    DropdownModule,
    FormsModule
  ],
  declarations: [ProductComponent],
})
export class ProductModule { }
