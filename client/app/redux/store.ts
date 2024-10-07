import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

// standard redux toolkit store. nothing interesting sadly
