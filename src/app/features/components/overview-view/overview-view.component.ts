import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/chocolate';
import { selectAllProducts } from 'src/app/store/selectors/product.selectors';
import { DialogService } from 'src/app/core/services/dialog.service';
import { DetailsViewComponent } from '../details-view/details-view.component';

@Component({
  selector: 'app-overview-view',
  imports: [CommonModule, TableModule, DetailsViewComponent],
  templateUrl: './overview-view.component.html',
  styleUrl: './overview-view.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewViewComponent implements OnInit{
  products$: Observable<Product[]>;
  selectedProduct: Product | null = null;
  metaKey = false;
  cheapestProduct: Product | null = null;

  constructor(private store: Store, private dialogService: DialogService) {
    this.products$ = this.store.select(selectAllProducts);
  }

  ngOnInit(): void {
    this.products$.pipe(
      map(products => {
        return products.reduce((prev, curr) => {
          if (prev.lowestPricePer100g == null || (curr.lowestPricePer100g != null && curr.lowestPricePer100g < prev.lowestPricePer100g)) {
            return curr;
          }
          return prev;
        }, {} as Product); 
      })
    ).subscribe(cheapestProduct => {
      this.cheapestProduct = cheapestProduct;
    });
  }

  sortProducts(field: keyof Product | 'lowestPricePer100g' | 'averagePricePer100g') {
    this.products$ = this.products$.pipe(
      map((products) => {
        return [...products].sort((a, b) => {
          const valueA = a[field] ?? (typeof a[field] === 'number' ? 0 : ''); 
          const valueB = b[field] ?? (typeof b[field] === 'number' ? 0 : '');
  
          if (valueA < valueB) return -1;
          if (valueA > valueB) return 1;
          return 0;
        });
      })
    );
  }

  onRowSelect(product: any) {
    this.dialogService.openDialog(product.data);
  }
}
