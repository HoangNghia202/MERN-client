import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const loginUser = async (user) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, user);
    if (res.status == 200) {
      return {
        error: false,
        user: res.data._doc,
        token: res.data.token,
        message: "Login successful",
      };
    }
  } catch (error) {
    console.error("error>>>", error.response.data.message);
    return {
      error: true,
      message: error.response.data.message,
    };
  }
};

export const registerUser = async (user) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/register`, user);
    if (res.status == 201) {
      return {
        error: false,
        user: res.data._doc,
        message: res.data.message,
      };
    }
    console.log("res register>>>", res.data);
  } catch (error) {
    console.error("error>>>", error.response.data.message);
    return {
      error: true,
      message: error.response.data.message,
    };
  }
};

export const getUser = async (token, userId) => {
  try {
    const res = await axios.get(`${apiUrl}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      console.log("res get user", res.data);

      return {
        error: false,
        user: res.data,
        message: "User found",
      };
    }
  } catch (error) {
    console.log("error", error.response.data.message);
    return {
      error: true,
      message: error.response.data.message,
    };
  }
};

export const createPost = async (token, formData) => {
  try {
    const res = await axios.post(`${apiUrl}/posts`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 201) {
      console.log("res crate post", res.data);
      return {
        error: false,
        data: res.data,
        message: "Post created",
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      error: true,
      message: error.response.data.message,
    };
  }
};

export const getPosts = async (token) => {
  try {
    const res = await axios.get(`${apiUrl}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      console.log("res get post", res.data);
      return {
        error: false,
        data: res.data,
        message: "Post found",
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      error: true,
      message: error.response.data.message,
    };
  }
};

export const getUserPosts = async (token, userId) => {
  try {
    const res = await axios.get(`${apiUrl}/posts/${userId}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      console.log("res get post user", res.data);
      return {
        error: false,
        data: res.data,
        message: "Post found",
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      error: true,
      message: error.response.data.message,
    };
  }
};

export const getFriends = async (token, userId) => {
  // router.get("/:id/friends", verifyToken, getUserFriend);
  try {
    const res = await axios.get(`${apiUrl}/user/${userId}/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return {
        error: false,
        data: res.data,
        message: "Friends found",
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      error: true,
      message: error.response.data.message,
    };
  }
};

export const addRemoveFriend = async (token, userId, friendId) => {
  try {
    const res = await axios.patch(
      `${apiUrl}/user/${userId}/${friendId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      return {
        error: false,
        data: res.data,
        message: "Action add/remove friend success",
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      error: true,
      message: error.response.data.message,
    };
  }
};

export const patchLike = async (token, postId, userId) => {
  try {
    const res = await axios.patch(
      `${apiUrl}/posts/${postId}/like`,
      { userId: userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      return {
        error: false,
        data: res.data,
        message: "Action like success",
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      error: true,
      message: error.response.data.message,
    };
  }
};
