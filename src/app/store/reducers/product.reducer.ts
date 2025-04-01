import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/product.actions';
import { Price, Product } from 'src/app/shared/models/chocolate';

const calculatePrices = (prices: Price[]) => {
  if (prices.length === 0) {
    return {
      lowestPricePer100g: 0,
      averagePricePer100g: 0,
      cheapestShopLink: '',
    };
  }

  let lowestPrice = Infinity;
  let totalPrice = 0;
  let totalCount = 0;
  let cheapestLink = '';

  prices.forEach((price) => {
    const pricePer100g = price.unit === 'g' ? (price.price / price.amount) * 100 : price.price / (price.amount * 100);

    if (pricePer100g < lowestPrice) {
      lowestPrice = pricePer100g;
      cheapestLink = price.link;
    }

    totalPrice += pricePer100g;
    totalCount++;
  });

  const averagePrice = totalCount ? totalPrice / totalCount : 0;

  return {
    lowestPricePer100g: parseFloat(lowestPrice.toFixed(2)),
    averagePricePer100g: parseFloat(averagePrice.toFixed(2)),
    cheapestShopLink: cheapestLink,
  };
};




export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products: products.map((product) => {
      const { lowestPricePer100g, averagePricePer100g, cheapestShopLink } = calculatePrices(product.prices);
      return { ...product, lowestPricePer100g, averagePricePer100g, cheapestShopLink };
    }),
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
