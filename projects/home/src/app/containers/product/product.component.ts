import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addToCart, ProductResponse } from '@commons-lib';
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

  public images: string[] = [
    'https://img.freepik.com/vector-premium/no-hay-foto-disponible-icono-vector-simbolo-imagen-predeterminado-imagen-proximamente-sitio-web-o-aplicacion-movil_87543-10615.jpg'
  ];

  public selectedQuantity: { label: string; value: number } | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private store: Store) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const paramsHttp = new HttpParams().set('id', id);
      this.http.get<ProductResponse>(process.env['urlBase'] + 'product',
        { params: paramsHttp }).subscribe({
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
    return this.producto?.stock > 0;
  }

  public addProduct(producto: any) {
    console.log(producto)
    const quantity = this.selectedQuantity?.value || 1;
    this.store.dispatch(addToCart({ product: producto, quantity: quantity }));
  }

}
