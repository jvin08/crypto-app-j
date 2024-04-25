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
    notification: "",
    error: false,
    showNotification: "hidden",
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
    },
    setNotification:(state, action) => {
      state.notification = action.payload;
    },
    setShowNotification:(state, action) => {
      state.showNotification = action.payload;
    },
    setError:(state, action) => {
      state.error = action.payload;
    }
  }
});
export const { setError, setShowNotification, setCoinOneSymbol, setCoinTwoSymbol, setCompare, setCurrency, setDarkmode, setNotification } = dynamicValuesSlice.actions;
export const selectCoinOneSymbol = (state: any) => state.dynamicValues.coinOneSymbol;
export const selectCoinTwoSymbol = (state: any) => state.dynamicValues.coinTwoSymbol;
export const selectCompare = (state: any) => state.dynamicValues.compare;
export const selectCurrency = (state: any) => state.dynamicValues.currency;
export const selectDarkmode = (state: any) => state.dynamicValues.darkmode;
export const selectNotification = (state: any) => state.dynamicValues.notification;
export const selectShowNotification = (state: any) => state.dynamicValues.showNotification;
export const selectError = (state: any) => state.dynamicValues.error;
export default dynamicValuesSlice.reducer;