/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../app.state';
import * as fromSearchApp from './search.app.reducer';

export interface State extends fromRoot.ApplicationState {
  app: fromSearchApp.SearchAppState;
}

// Selector functions
const getAppFeatureState = createFeatureSelector<fromSearchApp.SearchAppState>(
  'app'
);

export const getFavoriteItems = createSelector(
  getAppFeatureState,
  (state) => state?.favoriteItems
);
