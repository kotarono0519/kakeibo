import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [{year: '0', month: '0'}] };

export const kakeiboSlice = createSlice({
    name: 'kakeibo',
    initialState,
    reducers: {
        setKakeibo: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setKakeibo } = kakeiboSlice.actions;
export default kakeiboSlice.reducer;