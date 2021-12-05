import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { filter, map, pluck } from "rxjs/operators";
import { ItemPizza } from '../item-pizza';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', 
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ])
  ]
})
export class OrderComponent implements OnInit {

  constructor(private shareService:ShareService,private router: Router) { }
  numberOfCart: number = 0;
  ngOnInit(): void {
    this.shareService.getMessage().subscribe(cart => {
      this.numberOfCart = cart.text;
    })
  }

  navigationToCart() {
    this.router.navigate(['/order/cart/checkout']);
  }

  
}
