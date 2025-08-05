import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteEntryComponent } from './remote-entry.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    RemoteEntryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent
      },
      {
        path: 'mi-cuenta',
        loadChildren: () => import('../containers/user-profile/user-profile.module').then(m => m.UserProfileModule),
      },
      {
        path: 'panel-control',
        loadChildren: () => import('../containers/management-control/management-control.module').then(m => m.ManagementControlModule),
      }
    ]),
    ReactiveFormsModule,
    ButtonModule,
    StoreModule
  ]
})
export class RemoteEntryModule { }
