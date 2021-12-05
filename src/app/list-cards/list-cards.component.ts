import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemPizza } from '../item-pizza';
import { ItemServiceService } from '../item-service.service';
import { StateOrder } from '../state-order';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css']
})

export class ListCardsComponent implements OnInit {
  
  constructor(private _router:ActivatedRoute, private itemService : ItemServiceService) { }

  listItem: ItemPizza[] = [];

  ngOnInit(): void {
    const category = this._router.snapshot.paramMap.get("id");
    const isExist = Object.keys(StateOrder).filter(k => isNaN(Number(k))).find(k => k === category);
    if (isExist) {
      const id = StateOrder[isExist as keyof typeof StateOrder];
      this.itemService.getItemByCategoryid(id).subscribe(data => {
        console.log('data', data);
        this.listItem = data;
      })
      
    }
  }

}
