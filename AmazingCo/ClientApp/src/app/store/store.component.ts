import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
})

export class StoreComponent {
  public promotions: Promotion[];

  //replace with db call
  experiences: any[] = [
    {
      "id": 0,
      "eventType": "Kids Party",
      "eventCost": 220
    },
    {
      "id": 1,
      "eventType": "Wine Tour",
      "eventCost": 440
    },
    {
      "id": 2,
      "eventType": "Team Building",
      "eventCost": 800
    },
    {
      "id": 3,
      "eventType": "Picnic",
      "eventCost": 110
    },
  ]

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Promotion[]>(baseUrl + 'promotion').subscribe(result => {
      this.promotions = result;
    }, error => console.error(error));
  }

  public cartItems: Array<CartItem> = new Array<CartItem>();

  //public discounts = new Discount();//.getDiscounts();

  public addToCart(id) {
    if (this.cartItems.length == 0)
      this.cartItems = new Array<CartItem>();

    // determine if the cart item exists in the cart, if it does then increment the quantity number
    var cartIndex = this.cartItems.findIndex(element => element.id === id)
    if (cartIndex >= 0)
      this.cartItems[cartIndex].addCartItem();
    else
      var experience = this.experiences.find(e => e.id === id)

    this.cartItems.push(new CartItem(id, experience.eventType, experience.eventCost, 1, this.promotions));
  }
}

interface Promotion {
  experienceId: number;
  eventName: string;
  condition: number;
  modifier: number;
  description: string
}

class CartItem {
  // Assign an apply to all events condition will be designated and checked for when adding cart items

  public id: number = 0;
  public quantity: number;
  public eventName: string;
  public subTotal: number;
  public appliedDiscounts: string = "";

  private promotion: Promotion[];
  private itemCost: number = 0;

  constructor(id: number, eventName: string, itemCost: number, quantity: number, promotion: Promotion[]) {
    this.id = id;
    this.eventName = eventName;
    this.itemCost = itemCost;
    this.quantity = quantity;
    this.subTotal = this.itemCost * this.quantity;
    this.promotion = promotion;
  }

  public addCartItem() {
    this.quantity += 1;
    // calculate subtotal for cart item for a given event
    var discountIndex = this.promotion.findIndex(d => d.experienceId === this.id);
    // todo fix
    var anyDiscountAvailable = this.promotion.find(d => d.experienceId === -1);

    if (this.quantity === anyDiscountAvailable.condition) {
      var anyDiscount = this.quantity / anyDiscountAvailable.condition;
      var anyDiscountValue = anyDiscount * this.itemCost * anyDiscountAvailable.modifier;
      this.subTotal += anyDiscountValue
      this.appliedDiscounts = this.appliedDiscounts.length > 0 ? this.appliedDiscounts + " + " + anyDiscountAvailable.description : anyDiscountAvailable.description;
    }
    else if (discountIndex > 0 && this.quantity === this.promotion[discountIndex].condition) {
      var itemDiscount = this.promotion[discountIndex].modifier;
      if (itemDiscount > 0 && itemDiscount < 1) {
        this.subTotal += itemDiscount * this.itemCost;
        this.appliedDiscounts = this.promotion[discountIndex].description;
      }
      else if (itemDiscount < 0) {
        this.subTotal = (this.quantity + itemDiscount) * this.itemCost;
        this.appliedDiscounts = this.promotion[discountIndex].description;
      }
      else if (itemDiscount >= 1) {
        this.subTotal += this.itemCost;
        this.quantity += itemDiscount;
        this.appliedDiscounts = this.promotion[discountIndex].description;
      }
    }
    else {
      this.subTotal += this.itemCost
    }
  }
}
