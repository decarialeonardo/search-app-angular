import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteDialogComponent } from '../favorite-dialog/favorite-dialog.component';
import { ApiService } from '../shared/api/api.service';
import { ItemResponse } from '../shared/model/ItemResponse';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  items: Array<ItemResponse>;
  filteredItems: Array<ItemResponse>;
  searchBy: string;
  orderByKey: string;

  constructor(private _dialog: MatDialog, private apiService: ApiService) {
    this.items = [];
    this.filteredItems = [];
    this.searchBy = '';
    this.orderByKey = 'title';
  }

  ngOnInit(): void {
    this.apiService.getItems().subscribe((items: Array<ItemResponse>) => {
      this.items = items;
      this.filteredItems = [...items];
      this.onOrderBy(this.orderByKey);
    });
  }

  onShowFavorites() {
    const dialogRef = this._dialog.open(FavoriteDialogComponent, {});
  }

  onClickSearch(value: string): void {
    if (!value) {
      this.filteredItems = this.items;
    } else {
      value = value.toLowerCase();
      this.filteredItems = this.items.filter((item: ItemResponse) => {
        let itemCopy = { ...item };
        itemCopy.image = '';
        return JSON.stringify(itemCopy).toLowerCase().includes(value);
      });
    }
    this.onOrderBy(this.orderByKey);
  }

  onOrderBy(key: string): void {
    if (key === 'price') {
      this.filteredItems.sort((a: any, b: any) => {
        return Number(a[key]) - Number(b[key]);
      });
    } else {
      this.filteredItems = this.filteredItems.sort(
        (a: ItemResponse, b: ItemResponse) => {
          if (a[key] > b[key]) {
            return 1;
          }
          if (a[key] < b[key]) {
            return -1;
          }
          return 0;
        }
      );
    }
  }
}
