import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductActions from '../app/store/actions/product.actions';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'org';

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }
}
