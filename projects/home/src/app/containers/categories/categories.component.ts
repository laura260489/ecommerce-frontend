import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@commons-lib';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: any[] = [];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Category[]>(process.env['urlBase']+'list-categories').subscribe({
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
