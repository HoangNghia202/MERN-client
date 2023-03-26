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
    setMode: (state) => {
      state.mode === "light" ? (state.mode = "dark") : (state.mode = "light");
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    setLogout: (state) => {
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

    setFriendRequests: (state, action) => {
      if (state.user) {
        if (action.payload.friendRequests) {
          state.user.friendRequests = action.payload.friendRequests;
        } else {
          console.log("No friend requests found");
        }
      }
    },

    setPosts: (state, action) => {
      state.posts = action.payload;
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
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setFriendRequests,
} = authSlice.actions;
export default authSlice.reducer;
