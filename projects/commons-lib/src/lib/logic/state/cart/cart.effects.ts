import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectCartProducts } from './cart.selectors';// si usas un estado global
import { addToCart, removeFromCart } from './cart.actions';

@Injectable()
export class CartEffects {
    constructor(
        private actions$: Actions,
        private store: Store
    ) { }

    persistCart$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(addToCart, removeFromCart),
                withLatestFrom(this.store.select(selectCartProducts)),
                tap(([action, products]) => {
                    sessionStorage.setItem('cartProducts', JSON.stringify(products));
                })
            ),
        { dispatch: false }
    );
}
