import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addToCart } from '@commons-lib';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public producto: any = null;
  public data: any[] = [];

  public quantities: { label: string; value: number }[] = [];
  public stock: number = 0;

  public selectedQuantity: { label: string; value: number } | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private store: Store) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<any>(`https://dummyjson.com/products/${id}`).subscribe({
        next: (product) => {
          this.producto = product;
          this.data = Object.entries(product)
            .filter(([key]) => ['brand', 'weight', 'warrantyInformation'].includes(key))
            .map(([key, value]) => ({ campo: key, valor: value }));
          this.stock = product.stock;
          const maxQuantity = this.stock >= 6 ? 6 : this.stock;

          this.quantities = Array.from({ length: maxQuantity }, (_, i) => {
            const number = i + 1;
            return {
              label: `${number} ${number === 1 ? 'unidad' : 'unidades'}`,
              value: number
            };
          });
        },
        error: () => {

        }
      });
    }
  }

  get inStock(): boolean {
    return this.producto?.availabilityStatus?.includes('In Stock');
  }

  public addProduct(producto: any) {
    const quantity = this.selectedQuantity?.value || 1;
    this.store.dispatch(addToCart({ product: producto, quantity: quantity }));
  }

}
