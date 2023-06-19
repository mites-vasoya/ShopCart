import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersReducer";

const initialState = {
  users: [],
  ordersUserwise: [],
  orderMonthwise: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFetched: false,
  message: "",
};

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (usersList, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await usersService.fetchUsers(token);
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

export const fetchOrderUserwise = createAsyncThunk(
  "user/orders/fetch",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await usersService.fetchOrderUserwise(userId, token);
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

export const fetchMonthlyOrders = createAsyncThunk(
  "user/monthlyOrders/fetch",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await usersService.fetchMonthlyOrders(userId, token);
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

export const deleteUser = createAsyncThunk(
  "admin/user/delete",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await usersService.deleteUser(userId, token);
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

export const blockUnblockUser = createAsyncThunk(
  "admin/user/blockUnblock",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await usersService.blockUnblockUser(userData, token);
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

const usersSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isUserFetching = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isUsersFetched = true;
        state.isUserFetching = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isError = true;
        state.isUserFetching = false;
        state.message = action.payload;
      })
      .addCase(fetchOrderUserwise.pending, (state) => {
        state.isOrderFetching = true;
      })
      .addCase(fetchOrderUserwise.fulfilled, (state, action) => {
        state.isOrdersFetched = true;
        state.isOrderFetching = false;
        state.ordersUserwise = action.payload;
      })
      .addCase(fetchOrderUserwise.rejected, (state, action) => {
        state.isError = true;
        state.isOrderFetching = false;
        state.message = action.payload;
      })
      .addCase(fetchMonthlyOrders.pending, (state) => {
        state.isMonthlyOrdersFetching = true;
      })
      .addCase(fetchMonthlyOrders.fulfilled, (state, action) => {
        state.isMonthlyOrdersFetched = true;
        state.isMonthlyOrdersFetching = false;
        state.orderMonthwise = action.payload;
      })
      .addCase(fetchMonthlyOrders.rejected, (state, action) => {
        state.isError = true;
        state.isMonthlyOrdersFetching = false;
        state.message = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isUserDeleted = true;
        state.users.map((user) => {
          if (action.payload.userId === user._id) {
            user.isDeleted = action.payload.isDeleted;
          }
        });
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isUserDeleted = false;
        state.message = action.payload;
      })
      .addCase(blockUnblockUser.fulfilled, (state, action) => {
        state.isUserBlockUnBlocked = true;
        state.users.map((user) => {
          if (action.payload.userId === user._id) {
            user.isBlocked = action.payload.isBlocked;
          }
        });
      })
      .addCase(blockUnblockUser.rejected, (state, action) => {
        state.isUserBlockUnBlocked = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
