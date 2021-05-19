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
      this.items.map((e, index) => {
        e.id = index.toString();
      });
      this.filteredItems = [...this.items];
      this.onOrderBy(this.orderByKey);
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
    let index = this.favoriteItems.findIndex((i: ItemResponse) => {
      return i.id === item.id;
    });
    if (index !== -1) {
      this.favoriteItems[index].favorite = true;
    } else {
      this.favoriteItems.push({
        title: item.title,
        image: item.image,
        favorite: true,
        id: item.id,
      });
    }
  }

  onRemoveFavorite(item: ItemResponse) {
    const idx = this.favoriteItems.findIndex(
      (i: ItemResponse) => i.id === item.id
    );
    if (idx !== -1) {
      this.favoriteItems.splice(idx, 1);
    }
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
