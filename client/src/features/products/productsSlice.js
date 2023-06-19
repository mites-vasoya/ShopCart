/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import products from "./productsReducer";
import { newArrivals, priceLowToHigh } from "../../app/Functions/SortFunc";

const initialState = {
  products: [],
  newArrivals: [],
  trendingProd: [],
  topSelling: [],
  product: [],
  wishlist: [],
  wishlistProducts: [],
  searchedProducts: [],
  cart: [],
  queryResponse: [],
  isError: false,
  isFetching: false,
  isFetched: false,
  productMessage: "",
};

export const searchQuery = createAsyncThunk(
  "products/search/query",
  async (query, thunkAPI) => {
    try {
      const response = await products.searchQuery(query);
      return response;
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
  "products/fetch/products",
  async (productReqData, thunkAPI) => {
    try {
      const response = await products.fetchProducts(productReqData);
      return response;
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

export const fetchOneProduct = createAsyncThunk(
  "products/fetch/one",
  async (productId, thunkAPI) => {
    try {
      const response = await products.fetchOneProduct(productId);
      return response;
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

export const searchProduct = createAsyncThunk(
  "products/fetch/search-products",
  async (productReqData, thunkAPI) => {
    try {
      const response = await products.searchProduct(productReqData);
      return response;
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

export const fetchNewArrivals = createAsyncThunk(
  "products/fetch/new-arrivals",
  async (prodReqData, thunkAPI) => {
    try {
      const response = await products.fetchNewArrivals(prodReqData);
      return response;
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

export const fetchNewArrivalComp = createAsyncThunk(
  "products/fetch/new-arrivals-component",
  async (thunkAPI) => {
    try {
      const response = await products.fetchNewArrivalComp();
      return response;
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

export const fetchTrendingProducts = createAsyncThunk(
  "products/fetch/trending-products",
  async (productReqData, thunkAPI) => {
    try {
      const response = await products.fetchTrendingProducts(productReqData);
      return response;
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

export const fetchTrendingProductComp = createAsyncThunk(
  "products/fetch/trending-products-component",
  async (thunkAPI) => {
    try {
      const response = await products.fetchTrendingProductComp();
      return response;
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

export const fetchTopSellingComponent = createAsyncThunk(
  "products/fetch/top-selling-component",
  async (thunkAPI) => {
    try {
      const response = await products.fetchTopSellingComponent();
      return response;
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

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isError = false;
        state.isFetching = true;
        state.isFetched = false;
        state.productMessage = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isFetching = false;
        state.isFetched = true;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isError = true;
        state.isFetching = false;
        state.isFetched = false;
        state.productMessage = action.payload;
      })
      .addCase(searchProduct.pending, (state) => {
        state.isError = false;
        state.isFetching = true;
        state.isFetched = false;
        state.productMessage = "";
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isFetching = false;
        state.isFetched = true;
        state.products = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.isError = true;
        state.isFetching = false;
        state.isFetched = false;
        state.productMessage = action.payload;
      })
      .addCase(searchQuery.pending, (state) => {})
      .addCase(searchQuery.fulfilled, (state, action) => {
        state.queryResponse = action.payload;
      })
      .addCase(searchQuery.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(fetchOneProduct.pending, (state) => {
        state.isError = false;
        state.isFetching = true;
        state.isFetched = false;
        state.productMessage = "";
      })
      .addCase(fetchOneProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isFetching = false;
        state.isFetched = true;
        state.product = action.payload;
      })
      .addCase(fetchOneProduct.rejected, (state, action) => {
        state.isError = true;
        state.isFetching = false;
        state.isFetched = false;
        state.productMessage = action.payload;
      })
      .addCase(fetchNewArrivals.pending, (state) => {
        state.productMessage = "";
        state.isFetching = true;
      })
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isFetching = false;
      })
      .addCase(fetchNewArrivals.rejected, (state, action) => {
        state.productMessage = action.payload;
        state.isFetching = false;
      })
      .addCase(fetchTrendingProducts.pending, (state) => {
        state.productMessage = "";
        state.isFetching = true;
      })
      .addCase(fetchTrendingProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isFetching = false;
      })
      .addCase(fetchTrendingProducts.rejected, (state, action) => {
        state.productMessage = action.payload;
        state.isFetching = false;
      })
      .addCase(fetchNewArrivalComp.pending, (state) => {
        state.productMessage = "";
      })
      .addCase(fetchNewArrivalComp.fulfilled, (state, action) => {
        state.newArrivals = action.payload;
      })
      .addCase(fetchNewArrivalComp.rejected, (state, action) => {
        state.productMessage = action.payload;
      })
      .addCase(fetchTrendingProductComp.pending, (state) => {
        state.productMessage = "";
      })
      .addCase(fetchTrendingProductComp.fulfilled, (state, action) => {
        state.trendingProd = action.payload;
      })
      .addCase(fetchTrendingProductComp.rejected, (state, action) => {
        state.productMessage = action.payload;
      })
      .addCase(fetchTopSellingComponent.pending, (state) => {
        state.productMessage = "";
      })
      .addCase(fetchTopSellingComponent.fulfilled, (state, action) => {
        state.topSelling = action.payload;
      })
      .addCase(fetchTopSellingComponent.rejected, (state, action) => {
        state.productMessage = action.payload;
      });
  },
});

export const { reset } = productsSlice.actions;
export default productsSlice.reducer;
