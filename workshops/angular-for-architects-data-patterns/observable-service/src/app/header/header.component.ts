import { Component, OnInit, OnDestroy } from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  cartItemsCount: any = 0;
  shoppingCartSub: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartSub = this.shoppingCartService.shoppingCartChanged$.subscribe(data => { this.cartItemsCount = data });
  }

  ngOnDestroy() {
    if (this.shoppingCartSub) { this.shoppingCartSub.unsubscribe(); }
  }

}
