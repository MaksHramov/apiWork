import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IProduct {
  [x: string]: any;
  code: string;
  product_name: string;
  generic_name?: string;
  image_front_thumb_url: string;
  isLiked?: boolean;
}

interface ProductsState {
  items: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get("https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1");
  const products = res.data.products.filter(
    (p: IProduct) => p.generic_name && p.image_front_thumb_url && p.product_name
  );
  return products;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const index = state.items.findIndex(p => p.code === (action.payload));
      if (index !== -1) state.items[index].isLiked = !state.items[index].isLiked;
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.code !== (action.payload));
    },
    addProduct: (state, action) => {
      state.items.push(action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при загрузке";
      });
  },
});

export const { toggleLike, deleteProduct, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
