import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemPizza } from '../item-pizza';
import { ItemServiceService } from '../item-service.service';

@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.css']
})
export class DetailsItemComponent implements OnInit {

  constructor(private itemService: ItemServiceService, private route:ActivatedRoute){ }
  itemPizza!: ItemPizza;
  ngOnInit(): void {
    const id = Number(this.route.snapshot.params.id);
    this.itemService.getItem(id).subscribe(item => this.itemPizza = item);
    console.log('pizza', this.itemPizza);
  }

}
