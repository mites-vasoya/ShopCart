import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminReducer";

const initialState = {
  addedProduct: [],
  allOrders: [],
  isOrderFetching: false,
  isOrdersFetched: false,
  isAccepted: false,
  isRejected: false,
  isError: false,
  isUpdated: false,
};

export const acceptOrder = createAsyncThunk(
  "admin/order/accept",
  async (orderId, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;
      // //console.log("ORDER ID SLICE  : ", orderId);
      return await adminService.acceptOrder(orderId, token);
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

export const cancelOrder = createAsyncThunk(
  "admin/order/cancel",
  async (orderId, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;
      // //console.log("ORDER ID SLICE  : ", orderId);
      return await adminService.cancelOrder(orderId, token);
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

export const fetchAllOrders = createAsyncThunk(
  "admin/order/fetchAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.fetchAllOrders(token);
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

export const uploadProduct = createAsyncThunk(
  "prouduct/upload",
  async (formData, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;
      // //console.log("Form Data : ", formData);
      return await adminService.uploadProduct(formData, token);
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

      return await adminService.fetchProducts(productId, token);
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

      return await adminService.removeProduct(productData, token);
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
      return await adminService.updateProduct(productData, token);
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

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(acceptOrder.pending, (state) => {
        state.isAccepted = false;
        state.isRejected = false;
      })
      .addCase(acceptOrder.fulfilled, (state, action) => {
        state.isAccepted = true;
        state.isRejected = false;
        //   //console.log("ACTION PAYLOAD : ", action.payload)
        state.allOrders = action.payload;
      })
      .addCase(acceptOrder.rejected, (state, action) => {
        state.isAccepted = false;
        state.isRejected = false;
        state.isError = true;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.isAccepted = false;
        state.isRejected = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isAccepted = false;
        state.isRejected = true;
        state.allOrders = action.payload;
        // //console.log("New State : ", action.payload);
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.isOrderFetching = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isOrdersFetched = true;
        state.isOrderFetching = false;
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isError = true;
        state.isOrderFetching = false;
        state.message = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isAccepted = false;
        state.isRejected = false;
        state.isError = true;
      })
      .addCase(uploadProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProduct.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.addedProduct.push(action.payload);
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
        state.isError = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
