import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectCartProducts } from './cart.selectors';
import { addToCart, clearCart, removeFromCart } from './cart.actions';

@Injectable()
export class CartEffects {
    constructor(
        private actions$: Actions,
        private store: Store
    ) { }

    persistCart$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(addToCart, removeFromCart, clearCart),
                withLatestFrom(this.store.select(selectCartProducts)),
                tap(([action, products]) => {
                    if (products.length === 0) {
                        sessionStorage.removeItem('cartProducts');
                    } else {
                        sessionStorage.setItem('cartProducts', JSON.stringify(products));
                    }
                })
            ),
        { dispatch: false }
    );

}
