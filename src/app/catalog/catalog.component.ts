import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FavoriteDialogComponent } from '../favorite-dialog/favorite-dialog.component';
import { ApiService } from '../shared/api/api.service';
import { ItemResponse } from '../shared/model/ItemResponse';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../state/app.state';
import * as fromSearchApp from '../shared/state';
import * as searchAppActions from '../shared/state/search.app.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  items: Array<ItemResponse>;
  filteredItems: Array<ItemResponse>;
  orderByKey: string;
  favoriteItems: Array<ItemResponse>;
  favoriteItems$: Observable<ItemResponse[]>;

  constructor(
    private _dialog: MatDialog,
    private apiService: ApiService,
    private store: Store<ApplicationState>
  ) {
    this.items = [];
    this.filteredItems = [];
    this.favoriteItems = [];
    this.orderByKey = 'title';
    this.favoriteItems$ = this.store.pipe(
      select(fromSearchApp.getFavoriteItems)
    );
  }

  ngOnInit(): void {
    this.apiService.getItems().subscribe((items: Array<ItemResponse>) => {
      this.items = items;
      this.items.map((e, index) => {
        e.id = index.toString();
      });
      this.filteredItems = [...this.items];
      this.onOrderBy(this.orderByKey);
      this.favoriteItems$.subscribe((favorites) => {
        this.favoriteItems = favorites;
        console.log(favorites);
      });
    });
  }

  onShowFavorites() {
    const dialogRef = this._dialog.open(FavoriteDialogComponent, {
      data: { items: this.favoriteItems },
    });
  }

  onSubmitSearch(value: string): void {
    if (!value) {
      this.filteredItems = this.items;
    } else {
      value = value.toLowerCase();
      this.filteredItems = this.items.filter((item: ItemResponse) => {
        let itemCopy = { ...item };
        itemCopy.image = '';
        delete itemCopy.id;
        return JSON.stringify(itemCopy).toLowerCase().includes(value);
      });
    }
    this.onOrderBy(this.orderByKey);
  }

  onAddFavorite(item: ItemResponse) {
    this.store.dispatch(
      new searchAppActions.AddFavoriteItem({
        title: item.title,
        image: item.image,
        favorite: true,
        id: item.id,
      })
    );
  }

  onRemoveFavorite(item: ItemResponse) {
    this.store.dispatch(new searchAppActions.RemoveFavoriteItem(item));
  }

  onOrderBy(key: string): void {
    if (key === 'price') {
      this.filteredItems.sort((a: ItemResponse, b: ItemResponse) => {
        return Number(a[key]) - Number(b[key]);
      });
    } else {
      this.filteredItems = this.filteredItems.sort(
        (a: ItemResponse, b: ItemResponse) => {
          if (
            (a[key] as string).toLowerCase() > (b[key] as string).toLowerCase()
          ) {
            return 1;
          }
          if (
            (a[key] as string).toLowerCase() < (b[key] as string).toLowerCase()
          ) {
            return -1;
          }
          return 0;
        }
      );
    }
  }

  isFavoriteItem(item: ItemResponse): boolean {
    const itemFound = this.favoriteItems.find((e) => e.id === item.id);
    if (itemFound) {
      return itemFound?.favorite as boolean;
    }
    return false;
  }
}
