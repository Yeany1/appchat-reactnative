import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/users/usersSlice";
import postsReducer from "./features/posts/postsSlice"
import chatReducer from "./features/chat/tinNhanSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    chat: chatReducer,
    posts: postsReducer
  },
});
