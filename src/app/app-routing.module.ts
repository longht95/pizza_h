import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DetailsItemComponent } from './details-item/details-item.component';
import { IndexComponent } from './index/index.component';
import { ItemPizza } from './item-pizza';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path:'', component: IndexComponent},
  
  {path:'order', component: OrderComponent,
  children: [
    {path:':id', component:ListCardsComponent},
    {path:'cart/checkout', component: CartComponent},
    {path:':name/:id', component: DetailsItemComponent},
  ],

},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {   }
