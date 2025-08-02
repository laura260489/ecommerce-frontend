import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { formatRoute } from './config-routes';
import { MICRO_FRONTS } from '../core/constants';

const routes: Routes = [
  formatRoute(MICRO_FRONTS.AUTH.name, 'auth'),
  formatRoute(MICRO_FRONTS.HOME.name, ''),
  formatRoute(MICRO_FRONTS.USER_PORTAL.name, 'portal-usuario'),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
