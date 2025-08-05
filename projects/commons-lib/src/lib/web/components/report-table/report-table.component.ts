import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductReport } from '@commons-lib';
import { UserReport } from '../../../logic/interfaces/user-report.interface';
import { ProductResponse } from '../../../logic/interfaces/product-response.interface';

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

  constructor(private http: HttpClient) { }

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
        this.setColumns([
          { field: 'name', header: 'Nombre' },
          { field: 'email', header: 'E-mail' },
          { field: 'orders', header: 'Total de ordenes' }
        ]);
        this.fetchData<UserReport>('users', data => data.map(user => ({
          name: user.name,
          email: user.email,
          orders: user.totalOrders
        })));
        break;

      case 'PMV':
        this.setColumns([
          { field: 'product', header: 'Producto' },
          { field: 'category', header: 'Categoría' },
          { field: 'quantity', header: 'Cantidad' }
        ]);
        this.fetchData<ProductReport>('products', data => data.map(product => ({
          product: product.title,
          category: product.category,
          quantity: product.totalSell
        })));
        break;
      case 'PA':
        this.setColumns([
          { field: 'title', header: 'Producto' },
          { field: 'price', header: 'Precio' },
          { field: 'description', header: 'Descripción' },
          { field: 'stock', header: 'Stock' },
          { field: 'category', header: 'Categoría' }
        ]);
        this.fetchDirect<ProductResponse>('product-active', data =>
          data.map(({ title, price, description, stock, categories }) => ({
            title,
            price,
            description,
            stock,
            category: categories[0]
          }))
        );
        break;
    }
  }

  private setColumns(columns: any[]): void {
    this.columns = columns;
  }

  private fetchDirect<T>(endpoint: string, mapFn: (data: T[]) => any[]): void {
    this.http.get<T[]>(`${process.env['urlBase']}${endpoint}`).subscribe({
      next: (data) => {
        this.rows = mapFn(data);
      },
      error: (error) => {
        console.error(`Error al obtener datos desde "${endpoint}":`, error);
      }
    });
  }

  private fetchData<T>(type: string, mapFn: (data: T[]) => any[]): void {
    const params = new HttpParams().set('type', type);
    this.http.get<T[]>(`${process.env['urlBase']}reports`, { params }).subscribe({
      next: (data) => {
        this.rows = mapFn(data);
      },
      error: (error) => {
        console.error(`Error al cargar reporte de tipo "${type}":`, error);
      }
    });
  }

}
