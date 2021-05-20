import { TestBed } from '@angular/core/testing';
import { reducer, initialState, SearchAppState } from './search.app.reducer';
import * as searchAppActions from './search.app.actions';
import { ItemResponse } from '../shared/model/ItemResponse';

describe('SearchAppReducer', () => {
  const initState = initialState;
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  describe('Favorite Items', () => {
    it('AddFavoriteItem should add an new fav item', () => {
      const addFavoriteItemAction = new searchAppActions.AddFavoriteItem({
        id: '1',
      } as ItemResponse);
      const newState: SearchAppState = reducer(
        initState,
        addFavoriteItemAction
      );
      expect(newState.favoriteItems.length).toBe(1);
    });

    it('AddFavoriteItem should changed the favorite attr if the item has already exists', () => {
      const addFavoriteItemAction = new searchAppActions.AddFavoriteItem({
        id: '1',
      } as ItemResponse);
      const newState: SearchAppState = reducer(
        { favoriteItems: [{ id: '1' } as ItemResponse] },
        addFavoriteItemAction
      );
      expect(newState.favoriteItems.length).toBe(1);
      expect(newState.favoriteItems[0].favorite).toBe(true);
    });

    it('RemoveFavoriteItem should remove a fav item', () => {
      const addFavoriteItemAction = new searchAppActions.RemoveFavoriteItem({
        id: '1',
      } as ItemResponse);
      const newState: SearchAppState = reducer(
        { favoriteItems: [{ id: '1' } as ItemResponse] },
        addFavoriteItemAction
      );
      expect(newState.favoriteItems.length).toBe(0);
    });

    it('default action should not mutate the state', () => {
      const defaultAction = ({
        type: 'DEFAULT',
        payload: {},
      } as unknown) as searchAppActions.SearchAppActions;
      const newState: SearchAppState = reducer(undefined, defaultAction);
      expect(newState).toEqual(initState);
    });
  });
});
