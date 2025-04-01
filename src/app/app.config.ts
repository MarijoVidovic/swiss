import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProductEffects } from './store/effects/product.effects';
import { productReducer } from './store/reducers/product.reducer';
import { TableModule } from 'primeng/table';
import { provideHttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';  // Import the ChartModule here


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideStore({ product: productReducer }),
    provideEffects(ProductEffects),
    provideStoreDevtools({ maxAge: 25 }),
    importProvidersFrom(TableModule),
    importProvidersFrom(DialogModule),
    importProvidersFrom(ButtonModule),
    importProvidersFrom(ChartModule)
  ],
};
