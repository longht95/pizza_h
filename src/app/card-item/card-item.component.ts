import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogOrderComponent } from '../dialog-order/dialog-order.component';
import { ItemPizza } from '../item-pizza';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {

  constructor(private router: Router, private shareService:ShareService, public dialog: MatDialog) { }
  @Input()
  itemPizza!: ItemPizza;

  isHalf : boolean = false;
  isExist:boolean = false;
  state: any;
  ngOnInit(): void {
    if (history.state.id) {
      this.isHalf = true;
      if (history.state.id == this.itemPizza.id) {
        this.isExist = true;
      }
      
      this.state = history.state;
    }
  }

  addToCart() {
    let listCart = JSON.parse(sessionStorage.getItem('cart') || '[]' );
    listCart.push(this.itemPizza);
    sessionStorage.setItem('cart', JSON.stringify(listCart));
    this.shareService.sendMessage(listCart.length);
    const timeout = 3000;

      const dialogRef = this.dialog.open(DialogOrderComponent, {
        hasBackdrop: false,
        data: {
          itemPizza: this.itemPizza,
        }
      });
  
      dialogRef.afterOpened().subscribe(_ => {
        setTimeout(() => {
           dialogRef.close();
        }, timeout)
      });
  }

  selectHalf() {
    if (this.state && this.state.id) {
      console.log('pass half');
      this.router.navigate(['/order/pizza', this.state.id], {state: { selectToppings:this.state.selectToppings , itemHalf: this.itemPizza }});
    } else {
      this.router.navigate(['/order/pizza', this.itemPizza.id]);
    }
    
  }
}
