import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userReducer";

const initialState = {
  product: [],
  wishlist: [],
  wishlistProducts: [],
  searchedProducts: [],
  cart: [],
  orders: [],
  coupon: {},
  orderId: "",
  isFetched: false,
  isFetching: false,
  isPlaced: false,
  isPlacing: false,
  isAddedCart: false,
  isRated: false,
  isError: false,
  isAddrRemoved: false,
  userSliceMessage: "",
};

export const placeOrder = createAsyncThunk(
  "user/order/place",
  async (checkoutData, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;
      //console.log("CHECK OUT DATA IN SLICE  : ", checkoutData);
      return await userService.placeOrder(checkoutData, token);
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

export const placeCartOrder = createAsyncThunk(
  "user/order/place-cart-order",
  async (checkoutData, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;
      //console.log("CHECK OUT DATA IN SLICE  : ", checkoutData);
      return await userService.placeCartOrder(checkoutData, token);
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
  "user/order/fetch",
  async (userId, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;
      // //console.log("Token : ", token);

      return await userService.fetchAllOrders(userId, token);
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

export const giveRating = createAsyncThunk(
  "user/order/giveRating",
  async (ratingData, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;
      // //console.log("ratingData : ", ratingData);

      return await userService.giveRating(ratingData, token);
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

export const addToCart = createAsyncThunk(
  "user/cart/add",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const message = await userService.addToCart(userId, token);
      return message;
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

export const updateCartQuantity = createAsyncThunk(
  "user/cart/update",
  async (newData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const message = await userService.updateCart(newData, token);
      // //console.log("TOTKEOKE : ", message);
      return message;
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

export const removeFromCart = createAsyncThunk(
  "user/cart/remove",
  async (productId, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;

      return await userService.removeFromCart(productId, token);
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

export const addToWishList = createAsyncThunk(
  "user/wishlist/add",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const message = await userService.addToWishList(data, token);
      return message;
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

export const removeFromWishlist = createAsyncThunk(
  "user/wishlist/remove",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const message = await userService.removeFromWishlist(data, token);
      // //console.log("TOTKEOKE : ", message);
      return message;
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

export const fetchWishList = createAsyncThunk(
  "user/wishlist/fetch",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const message = await userService.fetchWishList(data, token);
      return message;
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

export const fetchWishListProducts = createAsyncThunk(
  "user/wishlist/fetch/products",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const message = await userService.fetchWishListProducts(data, token);
      return message;
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

export const fetchCart = createAsyncThunk(
  "user/cart/fetch",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const message = await userService.fetchCart(data, token);
      return message;
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

export const applyCoupon = createAsyncThunk(
  "products/applyCoupon",
  async (couponCode, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const coupon = await userService.applyCoupon(couponCode, token);

      return coupon;
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetIs(state) {
      state.isAddedCart = initialState.isAddedCart;
      state.isError = initialState.isError;
      state.isFetching = initialState.isFetching;
      state.isFetched = initialState.isFetched;
      state.isPlaced = initialState.isPlaced;
      state.isPlacing = initialState.isPlacing;
      state.isRated = initialState.isRated;
      state.userSliceMessage = initialState.userSliceMessage;
    },
    resetCoupon(state) {
      state.coupon = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isError = false;
        state.isAddingCart = true;
        state.isAddedCart = false;
        state.userSliceMessage = "";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isAddingCart = false;
        state.isAddedCart = true;
        state.userSliceMessage = action.payload.message;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isError = true;
        state.isAddingCart = false;
        state.isAddedCart = false;
        state.userSliceMessage = action.payload.message;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isError = false;
        state.isAddingCart = true;
        state.isAddedCart = false;
        state.isUpdateCart = false;
        state.userSliceMessage = "";
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isError = false;
        state.isAddingCart = false;
        state.isAddedCart = true;
        state.isUpdateCart = true;
        state.cart = action.payload;
        state.userSliceMessage = "Added to Cart";
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isError = true;
        state.isAddingCart = false;
        state.isAddedCart = false;
        state.isUpdateCart = false;
        state.userSliceMessage = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.userSliceMessage = "";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isRemoved = true;
        state.cart = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isError = true;
        state.userSliceMessage = action.payload;
      })
      .addCase(fetchWishList.pending, (state) => {
        state.isError = false;
        state.isFetchingWishList = true;
        state.isFetchedWishList = false;
        state.userSliceMessage = "";
      })
      .addCase(fetchWishList.fulfilled, (state, action) => {
        state.isError = false;
        state.isFetchingWishList = false;
        state.isFetchedWishList = true;
        state.isAddedCart = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishList.rejected, (state, action) => {
        state.isError = true;
        state.isFetchingWishList = false;
        state.isFetchedWishList = false;
        state.userSliceMessage = action.payload;
      })
      .addCase(fetchWishListProducts.pending, (state) => {
        state.userSliceMessage = "";
      })
      .addCase(fetchWishListProducts.fulfilled, (state, action) => {
        state.wishlistProducts = action.payload;
      })
      .addCase(fetchWishListProducts.rejected, (state, action) => {
        state.userSliceMessage = action.payload;
      })
      .addCase(fetchCart.pending, (state) => {
        state.isError = false;
        state.isFetchingWishList = true;
        state.isFetchedWishList = false;
        state.userSliceMessage = "";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isFetchingWishList = false;
        state.isFetchedWishList = true;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isError = true;
        state.isFetchingWishList = false;
        state.isFetchedWishList = false;
        state.userSliceMessage = action.payload;
      })
      .addCase(addToWishList.pending, (state) => {
        state.isError = false;
        state.isAddingToWishList = true;
        state.isAddedToWishList = false;
        state.userSliceMessage = "";
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isError = false;
        state.isAddingToWishList = false;
        state.isAddedToWishList = true;
        state.wishlist = action.payload;
        // //console.log("Slice : ", action.payload);
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.isError = true;
        state.isAddingToWishList = false;
        state.isAddedToWishList = false;
        state.userSliceMessage = action.payload;
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.isError = false;
        state.isAddingToWishList = true;
        state.isAddedToWishList = false;
        state.userSliceMessage = "";
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isError = false;
        state.isAddingToWishList = false;
        state.isAddedToWishList = true;
        state.wishlistProducts = state.wishlistProducts.filter(
          (product) => product._id !== action.payload.productId
        );
        state.wishlist = state.wishlist.filter(
          (product) => product._id !== action.payload.productId
        );
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isRemovingFromWishList = false;
        state.isRemoveFromWishList = false;
        state.userSliceMessage = action.payload;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.isFetched = false;
        state.isFetching = false;
        state.isPlaced = false;
        state.isPlacing = false;
        state.isError = false;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isFetched = true;
        state.isFetching = false;
        state.isPlaced = false;
        state.isPlacing = false;
        state.isError = false;
        state.orders = action.payload;
        // //console.log("New State : ", action.payload);
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isError = true;
        state.isFetched = false;
        state.isPlaced = false;
        state.isPlacing = false;
        state.isFetching = false;
        state.userSliceMessage = action.payload;
      })
      .addCase(applyCoupon.pending, (state) => {})
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.coupon = action.payload;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.isError = true;
        //console.log("COUPON ERROR : ", action.payload);
        state.userSliceMessage = action.payload;
      })
      .addCase(placeOrder.pending, (state) => {
        state.isPlacing = true;
        state.isPlaced = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isPlaced = true;
        // state.userSliceMessage = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isError = true;
        // //console.log("Message : ", action.payload);
        // state.userSliceMessage = action.payload;
      })
      .addCase(placeCartOrder.pending, (state) => {
        state.isPlacing = true;
        state.isPlaced = false;
      })
      .addCase(placeCartOrder.fulfilled, (state, action) => {
        state.isPlaced = true;
        state.userSliceMessage = action.payload;
      })
      .addCase(placeCartOrder.rejected, (state, action) => {
        state.isError = true;
        state.userSliceMessage = action.payload;
      });
  },
});

export const { reset, resetIs, resetCoupon } = userSlice.actions;
export default userSlice.reducer;
