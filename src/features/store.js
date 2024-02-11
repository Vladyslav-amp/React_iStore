import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reduxSlice/cartSlice";
import favoriteSlice from "./reduxSlice/favoriteSlice";


 const store = configureStore({
  reducer: {
    user: cartSlice,
    favor: favoriteSlice,
  }
})

export default store;
