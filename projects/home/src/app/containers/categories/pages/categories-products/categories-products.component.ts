import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories-products',
  templateUrl: './categories-products.component.html',
  styleUrls: ['./categories-products.component.scss']
})
export class CategoriesProductsComponent implements OnInit {

  slug!: string;
  categoryProducts: any;
  first = 0;
  rows = 10;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.http.get<any[]>('https://dummyjson.com/products/category/'+ this.slug).subscribe({
        next: (data) => {
          this.categoryProducts = data;
        },
        error: () => {
          
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
