import { Component, Input, OnInit } from '@angular/core';
import { ItemPizza } from '../item-pizza';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {

  constructor() { }
  itemDetails?: ItemPizza;
  ngOnInit(): void {
  }
  onSelect(): void { 
    
  }
}
