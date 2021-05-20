import { Injectable } from '@angular/core';
import { ItemResponse } from '../model/ItemResponse';

@Injectable()
export class HelperService {
  constructor() {}

  sortItemsByNumber(
    items: Array<ItemResponse>,
    key: string
  ): Array<ItemResponse> {
    return items.sort((a: ItemResponse, b: ItemResponse) => {
      return Number(a[key]) - Number(b[key]);
    });
  }

  sortItemsBy(items: Array<ItemResponse>, key: string): Array<ItemResponse> {
    return items.sort((a: ItemResponse, b: ItemResponse) => {
      if ((a[key] as string).toLowerCase() > (b[key] as string).toLowerCase()) {
        return 1;
      }
      if ((a[key] as string).toLowerCase() < (b[key] as string).toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }
}
