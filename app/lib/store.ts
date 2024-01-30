import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from 'redux'
import { marketApi } from './marketSlice'

const rootReducer = combineReducers({
  [marketApi.reducerPath]: marketApi.reducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware().concat(marketApi.middleware),
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
