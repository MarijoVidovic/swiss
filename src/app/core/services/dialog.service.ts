import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/shared/models/chocolate'; // Correct the path

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogVisibleSubject = new BehaviorSubject<boolean>(false);
  private selectedProductSubject = new BehaviorSubject<Product | null>(null);

  dialogVisible$ = this.dialogVisibleSubject.asObservable();
  selectedProduct$ = this.selectedProductSubject.asObservable();

  openDialog(product: Product) {
    this.selectedProductSubject.next(product);
    this.dialogVisibleSubject.next(true);
  }

  closeDialog() {
    this.dialogVisibleSubject.next(false);
  }
}
