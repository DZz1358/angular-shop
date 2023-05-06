import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl: string = 'https://fakestoreapi.com/products'

constructor(private http: HttpClient) { }


getProducts(){
  return this.http.get(`${this.apiUrl}`)
}

getProduct(id: number){
  return this.http.get(`${this.apiUrl}/${id}`)
}

}
