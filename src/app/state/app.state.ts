import { ActionReducerMap } from '@ngrx/store';
import * as search from '../shared/state/search.app.reducer';

// Representation of the entire app state
// Extended by lazy loaded modules
export interface ApplicationState {
  app: search.SearchAppState;
}

export const initialReducerMap = {
  app: search.reducer,
} as ActionReducerMap<ApplicationState>;

export function getInitialState() {
  return {
    app: search.initialState,
  } as ApplicationState;
}
