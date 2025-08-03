import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ModalInformationModule } from '@commons-lib';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: PaymentComponent
    }]),
    ButtonModule,
    ModalInformationModule
  ],
  declarations: [PaymentComponent]
})
export class PaymentModule { }
