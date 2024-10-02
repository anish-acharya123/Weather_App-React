import { configureStore } from "@reduxjs/toolkit";
import Darkreducer from "../features/DarkmodeSlice";
// we can import the reducer by any name because while we export in darkmodeslice we use default

const store = configureStore({
  reducer: {
    ToogleDark: Darkreducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
