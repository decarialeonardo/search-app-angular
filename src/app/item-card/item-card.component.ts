import { Component, Input, OnInit } from '@angular/core';
import { ItemResponse } from '../shared/model/ItemResponse';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../state/app.state';
import * as fromSearchApp from '../shared/state';
import * as searchAppActions from '../shared/state/search.app.actions';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() item: ItemResponse;
  @Input() favorite: boolean | undefined;

  constructor(private store: Store<ApplicationState>) {
    this.item = {} as ItemResponse;
    this.favorite = false;
  }

  ngOnInit(): void {}

  add() {
    this.store.dispatch(
      new searchAppActions.AddFavoriteItem({
        title: this.item.title,
        image: this.item.image,
        favorite: true,
        id: this.item.id,
      })
    );
  }

  remove() {
    this.store.dispatch(new searchAppActions.RemoveFavoriteItem(this.item));
  }
}
