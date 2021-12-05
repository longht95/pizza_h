import { ItemPizza } from "./item-pizza";
import { Topping } from "./topping";

export class OrderDetails {
    pizzaItem?: ItemPizza;
    pizzaHalf?: ItemPizza;
    toppings?: Topping[];
    isHalf?: boolean;
    
}
