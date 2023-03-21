import UserImage from "./UserImage";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { addRemoveFriend } from "../services/userServices";
import { setFriends } from "../state";
const Friend = (props) => {
  console.log("props in friend>>", props);
  const { friendId, name, subtitle, userPicturePath } = props;
  console.log(
    "friendId, name, subtitle, userPicturePath>>",
    friendId,
    name,
    subtitle,
    userPicturePath
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, friends } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const primaryDark = palette.primary.dark;
  const primaryLight = palette.primary.light;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const isUser = _id === friendId;
  console.log("isFriend>>", isFriend);
  console.log("isUser>>", isUser);

  const handleAddRemoveFriend = async () => {
    const res = await addRemoveFriend(token, _id, friendId);
    if (!res.error) {
      dispatch(setFriends({ friends: res.data }));
    }
  };
  return (
    <FlexBetween mb="1rem">
      <Box
        display={"flex"}
        alignItems="center"
        onClick={() => navigate(`/user/${friendId}`)}
        sx={{ cursor: "pointer" }}
      >
        <UserImage img={userPicturePath} size={"50px"}></UserImage>
        <Box ml={"1rem"}>
          <Typography
            color={main}
            sx={{ "&hover": { color: primaryLight, cursor: "pointer" } }}
            variant="h5"
            fontWeight="500"
          >
            {name}
          </Typography>
          <Typography color={medium}>{subtitle}</Typography>
        </Box>
      </Box>
      {}
      <IconButton
        onClick={() => {
          handleAddRemoveFriend();
        }}
      >
        {isUser ? null : isFriend ? (
          <PersonRemoveOutlined />
        ) : (
          <PersonAddOutlined />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
