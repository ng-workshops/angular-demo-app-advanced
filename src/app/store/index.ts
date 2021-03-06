import * as fromRouter from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer
} from '@ngrx/store';

import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
import { performanceLogger } from '../core/router/performance-logger';
import { RouterEffects } from '../core/router/router.effects';
import { RouterStateUrl } from '../core/router/router.serializer';

// tslint:disable-next-line:no-empty-interface
export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>; // default from ngrx
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer // default from ngrx
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [performanceLogger, localStorageSyncReducer]
  : [localStorageSyncReducer];

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('router');

export const effects: any[] = [RouterEffects];

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['customer'] })(reducer);
}
