'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import globalSelectionReducer from './globalSelectionSlice';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  globalSelection: globalSelectionReducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // You can turn this back on later; leaving false matches your current setup
      serializableCheck: false,
    }),
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
