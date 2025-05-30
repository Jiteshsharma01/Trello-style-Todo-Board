import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import boardReducer from './reducers/boardReducer';

export const store = configureStore({
  reducer: {
    board: boardReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;