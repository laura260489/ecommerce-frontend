import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnChanges {

  @Input() reportType: any = {};

  columns: any[] = [];
  rows: any[] = [];
  showColumnFilters = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reportType'] && changes['reportType'].currentValue) {
      this.loadReport(changes['reportType'].currentValue);
    }
  }

  loadReport(report: any) {
    const reportCode = report?.code;
    this.showColumnFilters = reportCode === 'PA';

    switch (reportCode) {
      case 'CMF':
        this.columns = [
          { field: 'name', header: 'Nombre' },
          { field: 'email', header: 'E-mail' },
          { field: 'role', header: 'Rol' }
        ];
        this.rows = [
          { name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin' },
          { name: 'Ana Gómez', email: 'ana@example.com', role: 'Cliente' }
        ];
        break;

      case 'PMV':
      case 'PA':
        this.columns = [
          { field: 'product', header: 'Producto' },
          { field: 'quantity', header: 'Cantidad' },
          { field: 'total', header: 'Total' }
        ];
        this.rows = [
          { product: 'Laptop', quantity: 3, total: 4500 },
          { product: 'Mouse', quantity: 10, total: 300 }
        ];
        break;
    }
  }

}
