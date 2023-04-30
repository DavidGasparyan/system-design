import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${API_URL}/products`, { responseType: 'json' });
  }

  getOne(uuid: string): Observable<any> {
    return this.http.get(`${API_URL}/products/${uuid}`, { responseType: 'json' });
  }

  /*
    "name": "Test Product",
    "unitPrice": 10.13,
    "description": "Test product description",
    "image": "images/"
   */
  create(product: any): Observable<any> {
    return this.http.post(`${API_URL}/products`, { ... product });
  }

  update(uuid: string, updatedProduct: any): Observable<any> {
    return this.http.patch(`${API_URL}/products/${uuid}`, { ...updatedProduct });
  }

  delete(uuid: string): Observable<any> {
    return this.http.delete(`${API_URL}/products/${uuid}`);
  }
}
