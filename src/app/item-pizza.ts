import { Topping } from "./topping";


export class ItemPizza {
    id?:number;
    name?: string;
    price?: number;
    srcImg?: string;
    description?: string;
    toppings!: Topping[];
    itemHalf!: ItemPizza;
    priceTotal?: number;
}
