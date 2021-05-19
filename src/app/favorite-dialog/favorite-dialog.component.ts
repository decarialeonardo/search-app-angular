import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemResponse } from '../shared/model/ItemResponse';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../state/app.state';
import * as fromSearchApp from '../shared/state';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-favorite-dialog',
  templateUrl: './favorite-dialog.component.html',
  styleUrls: ['./favorite-dialog.component.scss'],
})
export class FavoriteDialogComponent implements OnInit {
  favoriteItems$: Observable<ItemResponse[]>;
  favoriteItems: Array<ItemResponse>;
  filteredItems: Array<ItemResponse>;
  constructor(
    public dialogRef: MatDialogRef<FavoriteDialogComponent>,
    private store: Store<ApplicationState>
  ) {
    this.favoriteItems$ = this.store.pipe(
      select(fromSearchApp.getFavoriteItems)
    );
    this.favoriteItems = [];
    this.filteredItems = [];
  }

  ngOnInit(): void {
    this.favoriteItems$.subscribe((favorites) => {
      this.favoriteItems = favorites;
      this.filteredItems = [...this.favoriteItems];
    });
  }

  onSubmitSearch(value: string): void {
    if (!value) {
      this.filteredItems = this.favoriteItems;
    } else {
      value = value.toLowerCase();
      this.filteredItems = this.favoriteItems.filter((item: ItemResponse) => {
        let itemCopy = { ...item };
        itemCopy.image = '';
        delete itemCopy.id;
        return JSON.stringify(itemCopy).toLowerCase().includes(value);
      });
    }
  }
}
