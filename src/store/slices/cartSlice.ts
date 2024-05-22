import {
  CancelOrderOptions,
  CartSliceType,
  CreateOrderOptions,
} from "@/types/cart";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CartSliceType = {
  items: [],
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "cart/createOrder",
  async (options: CreateOrderOptions, thunkApi) => {
    const { payload, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const dataFromServer = await response.json();
      onSuccess && onSuccess(dataFromServer);
    } catch (err) {
      onError && onError(err);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "cart/cancelOrder",
  async (options: CancelOrderOptions, thunkApi) => {
    const { orderId, onSuccess, onError } = options;
    try {
      await fetch(`${config.apiBaseUrl}/order/${orderId}`, {
        method: "DELETE",
      });
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    emptyCart: (state) => {
      state.items = [];
    },
    updateQuantity: (state, action) => {
      const quantity = action.payload.quantity;
      if (quantity === 0) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
    },
  },
});

export const { addToCart, updateQuantity, emptyCart } = CartSlice.actions;
export default CartSlice.reducer;
