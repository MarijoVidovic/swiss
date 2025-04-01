import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from '../actions/product.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.apiService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) => of(ProductActions.loadProductsFailure({ error })))
        )
      )
    )
  );
}
