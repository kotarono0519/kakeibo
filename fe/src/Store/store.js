import { configureStore } from '@reduxjs/toolkit';
import kakeiboReducer from './kakeiboSlice';
import dateIdReducer from './dateId';

export const store = configureStore({
    reducer: {
        kakeibo: kakeiboReducer,
        dateId: dateIdReducer,
    },
});