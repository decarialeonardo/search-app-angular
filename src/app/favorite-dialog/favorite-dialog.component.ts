import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemResponse } from '../shared/model/ItemResponse';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../app.state';
import * as fromSearchApp from '../store';
@Component({
  selector: 'app-favorite-dialog',
  templateUrl: './favorite-dialog.component.html',
  styleUrls: ['./favorite-dialog.component.scss'],
})
export class FavoriteDialogComponent implements OnInit {
  favoriteItems: Array<ItemResponse>;
  filteredItems: Array<ItemResponse>;
  constructor(
    public dialogRef: MatDialogRef<FavoriteDialogComponent>,
    private store: Store<ApplicationState>
  ) {
    this.favoriteItems = [];
    this.filteredItems = [];
  }

  ngOnInit(): void {
    this.store
      .pipe(select(fromSearchApp.getFavoriteItems))
      .subscribe((favorites) => {
        this.favoriteItems = favorites;
        this.filteredItems = [...this.favoriteItems];
      });
  }

  onSubmitSearch(filteredItems: Array<ItemResponse>): void {
    this.filteredItems = [...filteredItems];
  }
}
