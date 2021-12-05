import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogOrderComponent } from '../dialog-order/dialog-order.component';
import { ItemPizza } from '../item-pizza';
import { ItemServiceService } from '../item-service.service';
import { ShareService } from '../share.service';
import { StateOrder } from '../state-order';
import { Topping } from '../topping';

@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.css']
})
export class DetailsItemComponent implements OnInit {

  constructor(private itemService: ItemServiceService, private route:ActivatedRoute,public dialog: MatDialog, private router:Router, private shareService:ShareService){ }
  itemPizza!: ItemPizza;
  price: number | undefined;
  toppingsCheese: Topping[] = [];
  toppingsOther: Topping[] = [];

  selectToppings: Topping[] = [];

  isHalf: boolean = false;

  isPizza: boolean = false;
  itemHalf!: ItemPizza;

  navigation?:string;
  ngOnInit(): void {
    console.log('ccccccccccccc');
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.navigation = params['name'];
      if (this.navigation == StateOrder[0]) {
        this.isPizza = true;
      }
      if(id) {
        this.itemService.getItem(id).subscribe(data => {
          this.itemPizza = data;
          this.calcPrice();
          console.log('item', this.itemPizza);
        });
      }
    });
    this.itemService.getTopping().subscribe(data => {
      this.toppingsCheese = data.filter(topping => topping.cheese);
      this.toppingsOther = data.filter(topping => !topping.cheese);
    })
    if (history.state.itemHalf) {
      console.log('state details', history.state);
      this.selectToppings = history.state.selectToppings;
      this.isHalf = true;
      this.itemHalf = history.state.itemHalf;
      this.calcPrice();
    }
    
    
  }

  checkedTopping(checked:boolean, item: Topping): void {
    if (checked) {
      this.selectToppings.push(item);
    } else {
      this.selectToppings = this.selectToppings.filter(t => t.id != item.id);
    }
    this.calcPrice();
  }

  initChecked(topping: Topping) {
    return this.selectToppings.some((item) => item.id == topping.id);
  }

  halfPizza(checked: boolean): void {
    this.isHalf = checked;
    this.calcPrice();
  }

  calcPrice():void {
    console.log('calc');
    if (this.isHalf) {
      this.price = ((this.itemHalf?.price || 0) / 2) + ((this.itemPizza?.price || 0) / 2);
    } else {
      this.price = this.itemPizza?.price;
    }
    
    this.price = (this.selectToppings.reduce((acc, val) => acc += val.price || 0, 0) || 0) + (this.price || 0);
  }

  

  addItem(): void {
    if (this.isHalf && !this.itemHalf) {
        console.log('select half');
        this.router.navigateByUrl('/order/'+this.navigation, { state: { id: this.itemPizza?.id, selectToppings:this.selectToppings } });
    } else {
        let listCart = JSON.parse(sessionStorage.getItem('cart') || '[]' );
        this.itemPizza.toppings = this.selectToppings;
        if (this.isHalf) {
          this.itemPizza.itemHalf = this.itemHalf;
        }
        this.itemPizza.priceTotal = this.price;
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
        this.router.navigate(['/order', this.navigation]);
    }

  }
}
