import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../../components/WidgetWrapper";
import { getUserPosts, getPosts } from "../../services/userServices";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
const NewFeedWidget = ({ userId, isProfile }) => {
  console.log("props in NewFeedWidget>>", userId, isProfile, "<<");

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const getListPosts = async () => {
    if (isProfile) {
      const res = await getUserPosts(token, userId);
      if (!res.error) {
        dispatch(setPosts(res.data));
      }
    } else {
      const res = await getPosts(token);
      if (!res.error) {
        dispatch(setPosts(res.data));
      }
    }
  };

  useEffect(() => {
    getListPosts();
  }, []);
  console.log("posts>>", posts);

  return (
    <div>
      {posts?.map((item, index) => {
        return (
          <PostWidget
            key={index}
            postId={item._id}
            postUserId={item.userId}
            name={item.firstName + " " + item.lastName}
            description={item.description}
            location={item.location}
            picturePath={item.picturePath}
            userPicturePath={item.userPicturePath}
            likes={item.likes}
            comments={item.Comment}
          />
        );
      })}
    </div>
  );
};

export default NewFeedWidget;
