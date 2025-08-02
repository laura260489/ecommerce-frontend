import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public producto: any = null;
  public data: any[] = [];

  public quantities: { label: string; value: number }[] = [];
  public quantity: number = 1;
  public stock: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

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

  onQuantityChange(value: number): void {
    this.quantity = value;
  }

  get inStock(): boolean {
    return this.producto?.availabilityStatus?.includes('In Stock');
  }

}
