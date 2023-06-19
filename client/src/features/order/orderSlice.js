// /* eslint-disable no-unused-vars */
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import orderService from "./orderReducer";

// const initialState = {
//   orders: [],
//   orderId: "",
//   isError: false,
//   isPlaced: false,
//   isPlacing: false,
//   isRated : false,
//   message: "",
// };

// export const placeOrder = createAsyncThunk(
//   "client/order/place",
//   async (checkoutData, thunkAPI) => {
//     try {
//       //'token' may be not use because only user can add the goal...
//       const token = thunkAPI.getState().auth.user.token;
//       //console.log("CHECK OUT DATA IN SLICE  : ", checkoutData);
//       // return await orderService.placeOrder(checkoutData, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const fetchAllOrders = createAsyncThunk(
//   "client/order/fetchallorders",
//   async (userId, thunkAPI) => {
//     try {
//       //'token' may be not use because only user can add the goal...
//       const token = thunkAPI.getState().auth.user.token;
//       // //console.log("Token : ", token);

//       return await orderService.fetchAllOrders(userId, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const giveRating = createAsyncThunk(
//   "client/order/giveRating",
//   async (ratingData, thunkAPI) => {
//     try {
//       //'token' may be not use because only user can add the goal...
//       const token = thunkAPI.getState().auth.user.token;
//       // //console.log("ratingData : ", ratingData);

//       return await orderService.giveRating(ratingData, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// const orderSlice = createSlice({
//   name: "order",
//   initialState,
//   reducers: {
//     reset: (state) => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(placeOrder.pending, (state) => {
//         state.isPlaced = false;
//         state.isPlacing = false;
//         state.isError = false;
//       })
//       .addCase(placeOrder.fulfilled, (state, action) => {
//         state.isPlaced = true;
//         state.isPlacing = false;
//         state.isError = false;
//         state.message = action.payload.message;
//         // state.orderId = action.payload;
//         //   //console.log("New State : ", state.orderId);
//       })
//       .addCase(placeOrder.rejected, (state, action) => {
//         state.isError = true;
//         state.isPlaced = false;
//         state.isPlacing = false;
// //         state.message = action.payload;
// //       })
//       .addCase(fetchAllOrders.pending, (state) => {
//         state.isFetched = false;
//         state.isFetching = false;
//         state.isPlaced = false;
//         state.isPlacing = false;
//         state.isError = false;
//       })
//       .addCase(fetchAllOrders.fulfilled, (state, action) => {
//         state.isFetched = true;
//         state.isFetching = false;
//         state.isPlaced = false;
//         state.isPlacing = false;
//         state.isError = false;
//         state.orders = action.payload;
//         // //console.log("New State : ", action.payload);
//       })
//       .addCase(fetchAllOrders.rejected, (state, action) => {
//         state.isError = true;
//         state.isFetched = false;
//         state.isPlaced = false;
//         state.isPlacing = false;
//         state.isFetching = false;
//         state.message = action.payload;
//       })
//       .addCase(giveRating.pending, (state) => {})
//       .addCase(giveRating.fulfilled, (state, action) => {
//         state.isRated = true
//         //console.log("Rating Done : ", state.isRated)
//       })
//       .addCase(giveRating.rejected, (state, action) => {
//         state.message = action.payload;
//       });
//   },
// });

// export const { reset } = orderSlice.actions;
// export default orderSlice.reducer;
