import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl: string = 'https://fakestoreapi.com/products'

  constructor(private http: HttpClient) { }


  getProducts() {
    return this.http.get<IProduct[]>(`${this.apiUrl}`)
  }

  getProduct(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addProduct(data: IProduct) {
    return this.http.post(`${this.apiUrl}`, data);
  }

}
