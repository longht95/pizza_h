import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemPizza } from './item-pizza';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private httpClient: HttpClient) { }

  getItem(id:number): Observable<ItemPizza> {
    return this.httpClient.get<ItemPizza>('127.0.0.1:8080/pizza/'+id);
  }
}
