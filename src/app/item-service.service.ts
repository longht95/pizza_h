import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemPizza } from './item-pizza';
import { OrderCart } from './order-cart';
import { Topping } from './topping';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  

  constructor(private httpClient: HttpClient) { }

  getItem(id:number): Observable<ItemPizza> {
    return this.httpClient.get<ItemPizza>('http://127.0.0.1:8080/getItem/'+id);
  }

  getTopping(): Observable<Topping[]> {
    return this.httpClient.get<Topping[]>('http://127.0.0.1:8080/getTopping');
  }

  getItemByCategoryid(id:number): Observable<ItemPizza[]> {
    return this.httpClient.get<ItemPizza[]>('http://localhost:8080/getListItem/'+id);
  }

  orderCart(orderCart:OrderCart): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/order', orderCart);
  }
}
