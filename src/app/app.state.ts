import { ActionReducerMap } from '@ngrx/store';
import * as search from './store/search.app.reducer';
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
