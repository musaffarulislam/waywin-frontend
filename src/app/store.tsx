import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import trainerReducer from './slices/trainerSlice';
import adminReducer from './slices/adminSlice';
import userReducer from './slices/userSlice';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  trainer: trainerReducer,
  admin: adminReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof store.getState>;

const middleware: Middleware[] = [thunk];

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store);

