import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'hermanos-bistro';
  selectedItem?:boolean = false;
  onSelect(): void {
    console.log('xxxxxxxxxx');
    this.selectedItem = !this.selectedItem;
  }
}
