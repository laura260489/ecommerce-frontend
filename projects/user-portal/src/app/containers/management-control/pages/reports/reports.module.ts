import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule } from '@angular/router';
import { ReportTableModule } from '@commons-lib';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReportsComponent
      }
    ]),
    ReportTableModule,
    DropdownModule,
    FormsModule,
  ],
  declarations: [ReportsComponent]
})
export class ReportsModule { }
