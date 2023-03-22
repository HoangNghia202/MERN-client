import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Friend from "../../components/Friend";
import { Box, useTheme } from "@mui/material";
import { getFriends } from "../../services/userServices";
import { setFriends } from "../../state";
import WidgetWrapper from "../../components/WidgetWrapper";

const FriendListWidget = (props) => {
  const { friends, _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const neutralLight = palette.neutral.light;
  const medium = palette.neutral.medium;
  const getFriendsList = async () => {
    const res = await getFriends(token, _id);
    if (!res.error) {
      dispatch(setFriends({ friends: res.data }));
    }
  };

  useEffect(() => {
    getFriendsList();
  }, []);

  console.log("friends>>", friends);

  return (
    <WidgetWrapper>
      <Box>
        {friends.map((friend, index) => {
          return (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={friend.firstName + " " + friend.lastName}
              subtitle={friend.lodcation}
              userPicturePath={friend.picturePath}
            ></Friend>
          );
        })}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
