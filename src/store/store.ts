// import { STORY_SCREEN_SLICE, storyScreenSlice, storyScreenApi } from '../features/stories/story-screens.store';
import {
  configureStore,
  StateFromReducersMapObject,
  combineReducers,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  authApi,
  authSlice,
  AuthState,
  AUTH_API_KEY,
  AUTH_SLICE_KEY,
} from "../features/auth/auth.store";
import {
  usersApi,
  usersSlice,
  USERS_SLICE_KEY,
} from "../features/users/users.store";
// import { categoriesApi, categoriesSlice, CATEGORIES_SLICE } from '../features/categories/categories.store';
// import { STORIES_SLICE, storiesSlice, storiesApi } from '../features/stories/stories.store';
// import { articleAPI, articleSlice, ARTICLE_SLICE } from '../features/articles/articles.store';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rolesApi } from "../features/roles/roles.store";

const reducer = {
  [AUTH_API_KEY]: authApi.reducer,
  [AUTH_SLICE_KEY]: authSlice.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [USERS_SLICE_KEY]: usersSlice.reducer,
  [rolesApi.reducerPath]: rolesApi.reducer,
};

const rootReducer = combineReducers(reducer);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blackList: ["roles", "users"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = StateFromReducersMapObject<typeof reducer>;

export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(authApi.middleware, usersApi.middleware, rolesApi.middleware),
    devTools: import.meta.env.DEV,
    preloadedState,
  });
let preloadedAuthState: AuthState | undefined;

export const store = makeStore({
  auth: preloadedAuthState,
});
export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
