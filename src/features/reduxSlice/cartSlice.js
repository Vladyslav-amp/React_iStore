import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  quantity: 0,
}

const cartSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addCard: (state, action) => {
      const find = state.carts.findIndex(item => item.id === action.payload.id)
      if (find >= 0) {
        state.carts[find].quantity += 1
      } else {
        const count = { ...action.payload, quantity: 1 }
        state.carts.push(count)
      }
    },

    removeFromCart: (state, action) => {
      const nextCartItems = state.carts.filter(
        carts => carts.id !== action.payload.id
      )
      state.carts = nextCartItems;
    },

    increaseQuantity: (state, action) => {
      const find = state.carts.findIndex(item => item.id === action.payload.id)
      if (find >= 0) {
        state.carts[find].quantity += 1
      }
    },

    decreaseQuantity: (state, action) => {
      const itemIdToRemove = action.payload.id;
      const itemIndex = state.carts.findIndex(item => item.id === itemIdToRemove);

      if (itemIndex !== -1 && state.carts[itemIndex].quantity > 1) {
        state.carts[itemIndex].quantity -= 1;
      } else if (itemIndex !== -1 && state.carts[itemIndex].quantity === 1) {
        state.carts.splice(itemIndex, 1); // Usuń ostatni element o danym identyfikatorze produktu
      }
    },

    clearCart: (state) => {
      state.carts = [];
    },

  }

})

export const { addCard, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
