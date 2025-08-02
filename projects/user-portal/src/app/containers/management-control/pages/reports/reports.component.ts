import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reports: any[];

  selectedReport: any;

  constructor() {
    this.reports = [
      { name: 'Productos activos', code: 'PA' },
      { name: 'Los 5 más vendidos', code: 'PMV' },
      { name: 'Clientes más frecuentes', code: 'CMF' },
    ];

    this.selectedReport = this.reports[0];
  }

  ngOnInit() {
  }
}
