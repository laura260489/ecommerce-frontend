import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule } from '@angular/router';
import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserProfileComponent
      },
    ]),
    CardModule,
    ButtonModule,
    DynamicDialogModule,
  ],
  declarations: [UserProfileComponent],
  providers: [DialogService]
})
export class UserProfileModule { }
