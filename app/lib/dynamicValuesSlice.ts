import { createSlice } from "@reduxjs/toolkit";
const dynamicValuesSlice = createSlice({
    name: "dynamicValues",
    initialState: {
        coinOneSymbol: ["bitcoin","btc"],
        coinTwoSymbol: ["",""],
        compare: false,
        currency: {
            id:1, 
            label: "USD", 
            sign: "$"
        },
        darkmode: true,
    },
    reducers: {
        setCoinOneSymbol: (state, action) => {
            state.coinOneSymbol = action.payload;
        },
        setCoinTwoSymbol: (state, action) => {
            state.coinTwoSymbol = action.payload;
        },
        setCompare:(state, action) => {
            state.compare = action.payload;
        },
        setCurrency:(state, action) => {
            state.currency = action.payload;
        },
        setDarkmode:(state, action) => {
            state.darkmode = action.payload;
        }
    }
});
export const { setCoinOneSymbol, setCoinTwoSymbol, setCompare, setCurrency, setDarkmode } = dynamicValuesSlice.actions;
export const selectCoinOneSymbol = (state: any) => state.dynamicValues.coinOneSymbol;
export const selectCoinTwoSymbol = (state: any) => state.dynamicValues.coinTwoSymbol;
export const selectCompare = (state: any) => state.dynamicValues.compare;
export const selectCurrency = (state: any) => state.dynamicValues.currency;
export const selectDarkmode = (state: any) => state.dynamicValues.darkmode;
export default dynamicValuesSlice.reducer;