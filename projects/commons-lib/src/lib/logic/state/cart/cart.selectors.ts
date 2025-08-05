import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartProducts = createSelector(
    selectCartState,
    state => state.products
);

export const selectCartTotalQuantity = createSelector(
    selectCartProducts,
    (products) => products.reduce((total, prod) => total + prod.quantity, 0)
);

export const selectCartProductsWithTotal = createSelector(
    selectCartProducts,
    (products) =>
        products.map(prod => ({
            ...prod,
            total: prod.price * prod.quantity
        }))
);

export const selectCartTotalPrice = createSelector(
    selectCartProductsWithTotal,
    (products) => products.reduce((acc, prod) => acc + prod.total, 0)
);
