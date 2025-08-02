import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: any[] = [];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('https://dummyjson.com/products/categories').subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: () => {
        
      }
    });
  }

  goToCategory(slug: string) {
    this.router.navigate(['/categorias', slug]);
  }

}
