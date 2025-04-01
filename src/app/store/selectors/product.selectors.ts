import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectAllProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectLoading = createSelector(
  selectProductState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectProductState,
  (state) => state.error
);
