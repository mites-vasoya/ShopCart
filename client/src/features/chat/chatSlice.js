import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatReducer";

const initialState = {
  messages: [],
  conversations: [],
  activeSocketIds: [],
  isSaved: false,
  message: "",
};

export const fetchChatAdmin = createAsyncThunk(
  "admin/fetchChat",
  async (chatFetchdata, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // //console.log("CHAT IN SLICE  : ", thunkAPI.getState());
      return await chatService.fetchChatAdmin(chatFetchdata, token);
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

export const fetchChatClient = createAsyncThunk(
  "client/fetchChat",
  async (chatFetchdata, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // //console.log("THUNK API :", token);
      return await chatService.fetchChatClient(chatFetchdata, token);
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

export const fetchAllConversation = createAsyncThunk(
  "admin/fetchAllConversations",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // //console.log("CHAT IN SLICE  : ");
      return await chatService.fetchAllConversation(token);
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

export const saveChat = createAsyncThunk(
  "chat/saveChat",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await chatService.saveChat(data, token);
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

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatClient.pending, (state) => {})
      .addCase(fetchChatClient.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(fetchChatClient.rejected, (state, action) => {})
      .addCase(fetchChatAdmin.pending, (state) => {})
      .addCase(fetchChatAdmin.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(fetchChatAdmin.rejected, (state, action) => {})
      .addCase(saveChat.pending, (state) => {})
      .addCase(saveChat.fulfilled, (state, action) => {
        // state.messages = action.payload;
        state.isSaved = true;
      })
      .addCase(saveChat.rejected, (state, action) => {})
      .addCase(fetchAllConversation.pending, (state) => {})
      .addCase(fetchAllConversation.fulfilled, (state, action) => {
        state.conversations = action.payload;
        state.isSaved = true;
      })
      .addCase(fetchAllConversation.rejected, (state, action) => {});
  },
});

export const { reset } = chatSlice.actions;
export default chatSlice.reducer;
