import { createSlice } from '@reduxjs/toolkit';

const dynamicValuesSlice = createSlice({
    name: 'dynamicValues',
    initialState: {
        coinOneSymbol: ['bitcoin','btc'],
        coinTwoSymbol: ['',''],
        compare: false,
    },
    reducers: {
        setCoinOneSymbol: (state, action) => {
            state.coinOneSymbol = action.payload
        },
        setCoinTwoSymbol: (state, action) => {
            state.coinTwoSymbol = action.payload
        },
        setCompare:(state, action) => {
            state.compare = action.payload
        }
    }
})

export const { setCoinOneSymbol, setCoinTwoSymbol, setCompare } = dynamicValuesSlice.actions
export const selectCoinOneSymbol = (state: any) => state.dynamicValues.coinOneSymbol
export const selectCoinTwoSymbol = (state: any) => state.dynamicValues.coinTwoSymbol
export const selectCompare = (state: any) => state.dynamicValues.compare
export default dynamicValuesSlice.reducer