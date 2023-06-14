import { configureStore } from '@reduxjs/toolkit'
import roomOpenReducer from './Room/RoomOpen.reducer'
import commonReducer from './Common/Common.reducer'

export const store = configureStore({
  reducer: { 
    room_open: roomOpenReducer, 
    common: commonReducer, 
  },
})

// lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch