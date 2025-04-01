export interface ApiResponse {
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
  data: Product[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  currency: string;
  prices: Price[];
  nutrition: Nutrition;
  lowestPricePer100g?: number;
  averagePricePer100g?: number;
  cheapestShopLink?: string;
}

export interface Price {
  price: number;
  shop: string;
  link: string;
  unit: string;
  amount: number;
}

export interface Nutrition {
  fat: FatContent;
  carbohydrates: Carbohydrates;
  protein: number;
  salt: number;
}

export interface FatContent {
  total: number;
  saturated: number;
}

export interface Carbohydrates {
  total: number;
  sugar: number;
}
