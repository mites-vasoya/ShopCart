/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productReducer";

const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFetched: false,
  message: "",
};

export const uploadProduct = createAsyncThunk(
  "prouduct/upload",
  async (formData, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;
      // //console.log("Form Data : ", formData);
      return await productService.uploadProduct(formData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "product/fetch",
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await productService.fetchProducts(productId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeProduct = createAsyncThunk(
  "product/remove",
  async (productData, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;

      return await productService.removeProduct(productData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/edit",
  async (productData, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;
      return await productService.updateProduct(productData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProduct.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.products.push(action.payload);
        // //console.log("New State : ", initialState.products);
      })
      .addCase(uploadProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isFetching = true;
        state.isFetched = false;
        state.message = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isFetched = true;
        state.isFetching = false;
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isFetching = false;
        state.message = action.payload;
      })
      .addCase(removeProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.isProductRemoved = true;
        state.isLoading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isUpdated = true;
        state.isLoading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
