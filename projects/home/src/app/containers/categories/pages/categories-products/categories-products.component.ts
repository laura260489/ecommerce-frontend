import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addToCart, ProductRandom, ProductResponse } from '@commons-lib';
import { IMG_BASE } from '@commons-lib';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-categories-products',
  templateUrl: './categories-products.component.html',
  styleUrls: ['./categories-products.component.scss']
})
export class CategoriesProductsComponent implements OnInit {

  public categoryProducts: any;
  public first = 0;
  public rows = 10;

  public imgBase = IMG_BASE;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private store: Store) { }

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

  public goToRandomOrder() {
    this.http.get<ProductRandom[]>(process.env['urlBase'] + 'product-random').subscribe({
      next: (data) => {
        data.forEach(item => {
          this.store.dispatch(addToCart({ product: item.product, quantity: item.quantity }));
        });
      },
      error: () => {
      }
    });
  }

}
