import { ItemPizza } from "./item-pizza";

export class OrderCart {
    name!: string;
    phone!: string;
    address!: string;
    itemPizza: ItemPizza[] = [];
}
