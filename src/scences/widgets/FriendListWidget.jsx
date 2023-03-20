import React from "react";
import { useSelector } from "react-redux";
import Friend from "../../components/Friend";
import { Box } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";

const FriendListWidget = (props) => {
  const { friends } = useSelector((state) => state.user);

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
