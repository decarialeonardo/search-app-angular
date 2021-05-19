import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemResponse } from '../shared/model/ItemResponse';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() item: ItemResponse;
  @Input() favorite: boolean;
  @Output() removeFavorite: EventEmitter<ItemResponse> = new EventEmitter();
  @Output() addFavorite: EventEmitter<ItemResponse> = new EventEmitter();

  constructor() {
    this.item = {} as ItemResponse;
    this.favorite = false;
  }

  ngOnInit(): void {}

  add() {
    this.addFavorite.emit(this.item);
  }

  remove() {
    this.removeFavorite.emit(this.item);
  }
}
