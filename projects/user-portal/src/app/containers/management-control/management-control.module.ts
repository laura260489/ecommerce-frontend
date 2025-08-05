import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementControlComponent } from './management-control.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManagementControlComponent
      },
      {
        path: 'administracion-usuarios',
        loadChildren: () => import('./pages/user-management/user-management.module').then(m => m.UserManagementModule),
      },
      {
        path: 'reportes',
        loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule),
      },
    ]),
  ],
  declarations: [ManagementControlComponent],
})
export class ManagementControlModule { }
