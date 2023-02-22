import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './src/slices/userBalance'
import backgroundReducer from './src/slices/backgroundSlice'
import fontColorReducer from './src/slices/fontColorSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bgcolor: backgroundReducer,
    fontColor: fontColorReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch