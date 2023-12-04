import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import pitchSlice from "./pitch/pitchSlice";
import storage from "redux-persist/lib/storage";

import userSlice from "./user/userSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from "redux-persist";
const commonConfig = {
  key: "pitch/user",
  storage,
};
const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token"],
};
export const store = configureStore({
  reducer: {
    app: appSlice,
    pitches: pitchSlice,
    user: persistReducer(userConfig, userSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
