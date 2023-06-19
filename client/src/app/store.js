import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import userReducer from "../features/user/userSlice";
import usersReducer from "../features/users/usersSlice";
import adminReducers from "../features/admin/adminSlice";
import chatReducers from "../features/chat/chatSlice";
import productsReducers from "../features/products/productsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    user: userReducer,
    users: usersReducer,
    admin: adminReducers,
    chat: chatReducers,
    products : productsReducers
  },
});
