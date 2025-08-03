import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserManagementComponent
      }
    ]),
    TableModule,
    ButtonModule,
    DynamicDialogModule,
    ConfirmDialogModule,
  ],
  declarations: [UserManagementComponent],
  providers: [DialogService, ConfirmationService]
})
export class UserManagementModule { }
