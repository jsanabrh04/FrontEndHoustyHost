import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import charactersReducer from '../features/characters/characterSlice';
import charactersSaga from '../features/characters/characterSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(charactersSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
