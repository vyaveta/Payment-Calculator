import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface fontColorSliceType {
  value: string
}

const initialState: fontColorSliceType = {
  value: 'rgb(36, 151, 245)',
}

export const fontColorSlice = createSlice({
  name: 'fontColor',
  initialState,
  reducers: {
    changeFontColor: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeFontColor } = fontColorSlice.actions

export default fontColorSlice.reducer