import { configureStore  } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import movieSlice from "./slices/movieSlice";
import userSlice from "./slices/userSlice"
// import { ThunkDispatch } from 'redux-thunk';
// import { AnyAction } from 'redux';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    movie:movieSlice,
    userSlice:userSlice
  },

});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
