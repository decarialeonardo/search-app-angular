import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FavoriteDialogComponent } from '../favorite-dialog/favorite-dialog.component';
import { ApiService } from '../shared/api/api.service';
import { ItemResponse } from '../shared/model/ItemResponse';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../app.state';
import * as fromSearchApp from '../store';
import { HelperService } from '../shared/helpers/helper.service';
import { SortFieldsType } from '../shared/model/sortFieldsType';
import { AppParameters } from '../app.parameters';

@Component({
  selector: 'app-items-manager',
  templateUrl: './items-manager.component.html',
  styleUrls: ['./items-manager.component.scss'],
})
export class ItemsManagerComponent implements OnInit {
  items: Array<ItemResponse>;
  filteredItems: Array<ItemResponse>;
  favoriteItems: Array<ItemResponse>;
  paginatedItems: Array<ItemResponse> = [];

  step = AppParameters.INFINIT_SCROLL.ITEMS_SHOW;
  throttle = AppParameters.INFINIT_SCROLL.TRHTOTTLE;
  scrollDistance = AppParameters.INFINIT_SCROLL.SCROLLDISTANCE;

  constructor(
    private _dialog: MatDialog,
    private apiService: ApiService,
    private helperService: HelperService,
    private store: Store<ApplicationState>
  ) {
    this.items = [];
    this.filteredItems = [];
    this.favoriteItems = [];
  }

  ngOnInit(): void {
    this.apiService.getItems().subscribe((items: Array<ItemResponse>) => {
      this.items = items;
      this.filteredItems = [...this.items];
      this.store
        .pipe(select(fromSearchApp.getFavoriteItems))
        .subscribe((favorites) => {
          this.favoriteItems = favorites;
        });
      this.onOrderBy(SortFieldsType.TITLE);
    });
  }

  initScroll(): void {
    this.step = AppParameters.INFINIT_SCROLL.ITEMS_SHOW;
    this.paginatedItems = [];
    for (let i = 0; i < this.step; ++i) {
      if (this.filteredItems[i])
        this.paginatedItems.push(this.filteredItems[i]);
    }
  }

  onScrollDown(): void {
    if (this.step < this.filteredItems.length) {
      const start = this.step;
      this.step += AppParameters.INFINIT_SCROLL.ITEMS_SHOW;
      for (let i = start; i < this.step; ++i) {
        if (this.filteredItems[i])
          this.paginatedItems.push(this.filteredItems[i]);
      }
    }
  }

  onShowFavorites(): void {
    const dialogRef = this._dialog.open(
      FavoriteDialogComponent,
      AppParameters.FAVORITE_DIALOG_PARAMS
    );
  }

  onSubmitSearch(filteredItems: Array<ItemResponse>): void {
    this.filteredItems = [...filteredItems];
    this.onOrderBy(SortFieldsType.TITLE);
  }

  onOrderBy(key: string): void {
    if (key === SortFieldsType.PRICE) {
      this.filteredItems = this.helperService.sortItemsByNumber(
        this.filteredItems,
        key
      );
    } else {
      this.filteredItems = this.helperService.sortItemsBy(
        this.filteredItems,
        key
      );
    }
    this.initScroll();
  }

  isFavoriteItem(item: ItemResponse): boolean {
    const itemFound = this.favoriteItems.find((e) => e.id === item.id);
    if (itemFound) {
      return itemFound?.favorite as boolean;
    }
    return false;
  }
}
