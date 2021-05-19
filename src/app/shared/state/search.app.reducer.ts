import { SearchAppActions, SearchAppActionTypes } from './search.app.actions';
import { ItemResponse } from '../model/ItemResponse';

export interface SearchAppState {
  favoriteItems: Array<ItemResponse>;
}

export const initialState: SearchAppState = {
  favoriteItems: [],
};

export function reducer(
  state = initialState,
  action: SearchAppActions
): SearchAppState {
  switch (action.type) {
    case SearchAppActionTypes.ADD_FAVORITE_ITEM:
      let index = state.favoriteItems.findIndex((i: ItemResponse) => {
        return i.id === action.item.id;
      });
      if (index !== -1) {
        return {
          ...state,
          favoriteItems: state.favoriteItems.map((item) =>
            item.id === action.item.id ? { ...item, favorite: true } : item
          ),
        };
      } else {
        return {
          ...state,
          favoriteItems: [...state.favoriteItems, action.item],
        };
      }
    case SearchAppActionTypes.REMOVE_FAVORITE_ITEM:
      return {
        ...state,
        favoriteItems: state.favoriteItems.filter(
          (item) => item.id !== action.item.id
        ),
      };
    default:
      return state;
  }
}
