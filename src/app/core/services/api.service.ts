import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Product } from "src/app/shared/models/chocolate";

@Injectable({
  providedIn: 'root'  // This ensures ApiService is available globally
})
export class ApiService {
  private jsonUrl = 'assets/mocks/chocolate-data.json';
  
  constructor(private http: HttpClient) {}
  
  getProducts(): Observable<Product[]> {
    return this.http.get<{ data: Product[] }>(this.jsonUrl).pipe(
      map(response => response.data)  // Extract only the `data` array
    );
  }
}
