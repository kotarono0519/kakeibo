import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {year: '0', month: '0', data: '0'} };

export const dateIdSlice = createSlice({
    name: 'dateId',
    initialState,
    reducers: {
        setDateId: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setDateId } = dateIdSlice.actions;
export default dateIdSlice.reducer;