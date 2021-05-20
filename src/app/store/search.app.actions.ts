import { Action } from '@ngrx/store';
import { ItemResponse } from '../shared/model/ItemResponse';

export enum SearchAppActionTypes {
  ADD_FAVORITE_ITEM = '[Search App] Add favorite Item',
  REMOVE_FAVORITE_ITEM = '[Search App] Remove favorite Item',
}

export class AddFavoriteItem implements Action {
  readonly type = SearchAppActionTypes.ADD_FAVORITE_ITEM;
  constructor(readonly item: ItemResponse) {}
}
export class RemoveFavoriteItem implements Action {
  readonly type = SearchAppActionTypes.REMOVE_FAVORITE_ITEM;
  constructor(readonly item: ItemResponse) {}
}
// Union the valid types
export type SearchAppActions = AddFavoriteItem | RemoveFavoriteItem;
