import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface BackroundSlice {
  value: string
}

const initialState: BackroundSlice = {
  value: 'white',
}

export const counterSlice = createSlice({
  name: 'bgcolor',
  initialState,
  reducers: {
    changeBg: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeBg } = counterSlice.actions

export default counterSlice.reducer