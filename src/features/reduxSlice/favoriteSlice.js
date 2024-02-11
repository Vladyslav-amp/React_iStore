import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  quantity: 0,
}

const favoritesSlice = createSlice({
  name: "favor",
  initialState,
  reducers: {
    addFavorites: (state, action) => {
      const find = state.favorites.findIndex(item => item.id === action.payload.id)
      if (find >= 0) {
        state.favorites[find].quantity += 1
      } else {
        const count = { ...action.payload, quantity: 1 }
        state.favorites.push(count)
      }
    },

    removeFromFavorites: (state, action) => {
      const nextFavoriteItems = state.favorites.filter(
        favorite => favorite.id !== action.payload.id
      )
      state.favorites = nextFavoriteItems;
    },

  }

})

export const { addFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
