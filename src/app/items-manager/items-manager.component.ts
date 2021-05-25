import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteDialogComponent } from '../favorite-dialog/favorite-dialog.component';
import { ApiService } from '../shared/api/api.service';
import { ItemResponse } from '../shared/model/ItemResponse';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../app.state';
import * as fromSearchApp from '../store';
import { HelperService } from '../shared/helpers/helper.service';
import { SortFieldsType } from '../shared/model/sortFieldsType';
import { AppParameters } from '../app.parameters';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator | undefined;
  pageSize: number;
  currentPage: number;
  totalSize: number;

  constructor(
    private _dialog: MatDialog,
    private apiService: ApiService,
    private helperService: HelperService,
    private store: Store<ApplicationState>
  ) {
    this.items = [];
    this.filteredItems = [];
    this.favoriteItems = [];
    this.pageSize = AppParameters.PAGINATION.ITEMS_PER_PAGE;
    this.currentPage = 0;
    this.totalSize = 0;
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

  handlerPage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    const start = this.currentPage * this.pageSize;
    const end = (this.currentPage + 1) * this.pageSize;
    const part = this.filteredItems.slice(start, end);
    this.paginatedItems = part;
  }

  onShowFavorites(): void {
    this._dialog.open(
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
    this.handlerPage({
      pageIndex: 0,
      pageSize: AppParameters.PAGINATION.ITEMS_PER_PAGE,
      length: this.filteredItems.length,
    });
    if (this.paginator) {
      this.paginator.firstPage();
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
