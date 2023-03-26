import React from "react";
import { patchLike } from "../../services/userServices";
import { setPost } from "../../state";
import WidgetWrapper from "../../components/WidgetWrapper";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import FlexBetween from "../../components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
const PostWidget = (props) => {
  const {
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  } = props;
  console.log("Likes>>>", likes);

  const urlApi = import.meta.env.VITE_API_URL;
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const [isComment, setIsComment] = useState(false);
  const currentUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  console.log("tokennn>>>", token);

  const isLiked = currentUserId in likes;
  console.log("isLike", isLiked);

  const likeUnLikePost = async () => {
    const res = await patchLike(token, postId, currentUserId);
    if (!res.error) {
      dispatch(setPost({ post: res.data }));
    }
  };
  return (
    <WidgetWrapper mb={"2rem"}>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        type={"post"}
      ></Friend>
      <Typography variant="body1" color={main} mt="1rem">
        {description}
      </Typography>
      <Box borderRadius={"20px"} my="1rem">
        {picturePath && (
          <img
            src={`${urlApi}/assets/${picturePath}`}
            className="rounded-md max-h-[500px] w-full object-cover"
            alt="postUserImg"
          />
        )}
      </Box>
      <Divider sx={{ margin: "1rem 0" }} />
      <FlexBetween>
        <FlexBetween>
          <IconButton onClick={likeUnLikePost} color={isLiked ? "error" : ""}>
            <FavoriteOutlined />
          </IconButton>
          <Typography ml={".5rem"} color={main}>
            {Object.keys(likes).length}{" "}
            {Object.keys(likes).length > 1 ? "likes" : "like"}
          </Typography>
        </FlexBetween>

        <FlexBetween gap={"0.5rem"}>
          <IconButton>
            <ChatBubbleOutlineOutlined />
          </IconButton>
          <Typography color={main}>
            {comments.length} {likes.length > 1 ? "comment" : "comments"}
          </Typography>
        </FlexBetween>

        <FlexBetween gap={"0.5rem"}>
          <IconButton>
            <ShareOutlined />
          </IconButton>
          <Typography color={main}>Share</Typography>
        </FlexBetween>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default PostWidget;
