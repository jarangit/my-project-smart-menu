/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { configureStore } from '@reduxjs/toolkit'
import stateUIReducer from './features/ui-state.slice'
export const store = configureStore({
  reducer: {
    stateUI: stateUIReducer,
  }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch