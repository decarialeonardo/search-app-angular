import { Component, Input, OnInit } from '@angular/core';
import { ItemResponse } from '../shared/model/ItemResponse';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() item: ItemResponse;
  favorite: boolean;

  constructor() {
    this.favorite = false;
    this.item = {} as ItemResponse;
  }

  ngOnInit(): void {}
}
