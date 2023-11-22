import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import pitchSlice from "./pitch/pitchSlice";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
// import userSlice from './user/userSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    pitches: pitchSlice,
  },
});
