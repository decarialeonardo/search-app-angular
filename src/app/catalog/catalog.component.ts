import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteDialogComponent } from '../favorite-dialog/favorite-dialog.component';
import { ApiService } from '../shared/api/api.service';
import { ItemResponse } from '../shared/model/ItemResponse';

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

  constructor(private _dialog: MatDialog, private apiService: ApiService) {
    this.items = [];
    this.filteredItems = [];
    this.favoriteItems = [];
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

  onSubmitSearch(value: string): void {
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

  onAddFavorite(item: ItemResponse) {
    let index = this.favoriteItems.findIndex((i: ItemResponse) => {
      return JSON.stringify(i) === JSON.stringify(item);
    });
    if (index !== -1) {
      this.favoriteItems[index].favorite = true;
    } else {
      item.favorite = true;
      this.favoriteItems.push(item);
    }
  }

  onRemoveFavorite(item: ItemResponse) {
    this.favoriteItems.map((i: ItemResponse) => {
      if (JSON.stringify(i) === JSON.stringify(item)) {
        i.favorite = false;
      }
      return i;
    });
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
}
