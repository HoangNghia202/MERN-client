import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: {},
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode === "light" ? (state.mode = "dark") : (state.mode = "light");
    },
  },

  setLogin: (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
  },

  setLogout: (state, action) => {
    state.user = null;
    state.token = null;
  },

  setFriends: (state, action) => {
    if (state.user) {
      if (action.payload.friends) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("No friends found");
      }
    }
  },

  setPosts: (state, action) => {
    state.posts = action.payload.posts;
  },

  setPost: (state, action) => {
    const updatePost = state.posts.map((post) => {
      if (post._id === action.payload.post._id) {
        return action.payload.post;
      } else {
        return post;
      }
    });
    state.posts = updatePost;
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
