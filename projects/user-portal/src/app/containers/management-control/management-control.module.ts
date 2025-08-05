import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementControlComponent } from './management-control.component';
import { RouterModule } from '@angular/router';
import { LoginAuthGuard } from '@commons-lib';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManagementControlComponent,
        canActivate: [LoginAuthGuard]
      },
      {
        path: 'administracion-usuarios',
        loadChildren: () => import('./pages/user-management/user-management.module').then(m => m.UserManagementModule),
        canActivate: [LoginAuthGuard]
      },
      {
        path: 'reportes',
        loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule),
        canActivate: [LoginAuthGuard]
      },
    ]),
  ],
  declarations: [ManagementControlComponent],
})
export class ManagementControlModule { }
