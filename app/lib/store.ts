import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { marketApi } from "./marketSlice";
import  dynamicValuesReducer  from "./dynamicValuesSlice";
const rootReducer = combineReducers({
  [marketApi.reducerPath]: marketApi.reducer,
  dynamicValues: dynamicValuesReducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware().concat(marketApi.middleware),
  });
};
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
