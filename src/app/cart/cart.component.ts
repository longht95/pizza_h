import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemPizza } from '../item-pizza';
import { ItemServiceService } from '../item-service.service';
import { OrderCart } from '../order-cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private itemService: ItemServiceService,private router:Router) { }

  orderCart : OrderCart = {
    name: '',
    phone: '',
    address: '',
    itemPizza: []
  };
  listItem:ItemPizza[] = [];
  email = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.listItem = JSON.parse(sessionStorage.getItem('cart') || '[]' );
  }

  removeItem(item: ItemPizza): void {
    this.listItem = this.listItem.filter(i => i !== item);
  }
  submitOrder():void {
    this.orderCart.address = this.address.value;
    this.orderCart.name = this.email.value;
    this.orderCart.phone = this.phone.value;
    this.orderCart.itemPizza = this.listItem;
    sessionStorage.removeItem('cart');
    this.itemService.orderCart(this.orderCart).subscribe(data => {
      this.router.navigate(['/order/pizza']);
    })
  }
}
