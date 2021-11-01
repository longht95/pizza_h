import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsItemComponent } from './details-item/details-item.component';
import { ListCardsComponent } from './list-cards/list-cards.component';

const routes: Routes = [
  {path:'', component: ListCardsComponent},
  {path:'pizza/:id', component: DetailsItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {   }
