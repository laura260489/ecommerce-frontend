import { createReducer, on } from '@ngrx/store';
import { addToCart, clearCart, removeFromCart } from './cart.actions';
import { CartProduct, initialCartState } from './cart.state';

export const cartReducer = createReducer(
    initialCartState,
    on(addToCart, (state, { product, quantity }) => {
        const existingProductIndex = state.products.findIndex(p => p.id === product.id);

        let updatedProducts: CartProduct[];

        if (existingProductIndex !== -1) {
            updatedProducts = state.products.map((p, i) =>
                i === existingProductIndex ? { ...p, quantity: p.quantity + quantity } : p
            );
        } else {
            updatedProducts = [...state.products, { ...product, quantity }];
        }

        return {
            ...state,
            products: updatedProducts
        };
    }),

    on(removeFromCart, (state, { productId }) => ({
        ...state,
        products: state.products.filter(p => p.id !== productId)
    })),
    
    on(clearCart, (state) => ({
    ...state,
    products: []
}))

);
