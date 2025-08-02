import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTableComponent } from './report-table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    InputTextModule
  ],
  declarations: [ReportTableComponent],
  exports: [ReportTableComponent]
})
export class ReportTableModule { }
