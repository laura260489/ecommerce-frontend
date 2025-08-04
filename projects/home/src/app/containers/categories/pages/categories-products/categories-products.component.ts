import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResponse } from '@commons-lib';

@Component({
  selector: 'app-categories-products',
  templateUrl: './categories-products.component.html',
  styleUrls: ['./categories-products.component.scss']
})
export class CategoriesProductsComponent implements OnInit {

  categoryProducts: any;
  first = 0;
  rows = 10;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      const paramsHttp = new HttpParams().set('categoryName', slug ?? '');

      this.http.get<ProductResponse[]>(
        process.env['urlBase'] + 'products/category',
        { params: paramsHttp }
      ).subscribe({
        next: (data) => {
          this.categoryProducts = data;
        },
        error: (error) => {
          console.error('Error al obtener productos:', error);
        }
      });
    });
  }
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  goToProduct(productId: number) {
    this.router.navigate(['/producto', productId]);
  }

}
