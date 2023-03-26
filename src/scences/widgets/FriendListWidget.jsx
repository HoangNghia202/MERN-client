import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Friend from "../../components/Friend";
import { Box, Typography, useTheme } from "@mui/material";
import { getFriends } from "../../services/userServices";
import { setFriends } from "../../state";
import WidgetWrapper from "../../components/WidgetWrapper";

const FriendListWidget = (props) => {
  console.log("props in FriendListWidget>>", props, "<<");
  const { otherUserId, isOtherUserProfile } = props;
  const [otherUserFriends, setOtherUserFriends] = useState([]);
  const { friends, _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const neutralLight = palette.neutral.light;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const getFriendsList = async () => {
    if (isOtherUserProfile) {
      const res = await getFriends(token, otherUserId);
      if (!res.error) {
        setOtherUserFriends(res.data);
      }
    } else {
      const res = await getFriends(token, _id);
      if (!res.error) {
        dispatch(setFriends({ friends: res.data }));
      }
    }
  };

  useEffect(() => {
    getFriendsList();
  }, []);

  console.log("friends>>", friends);
  return (
    <WidgetWrapper>
      <Box>
        {isOtherUserProfile ? (
          otherUserFriends && !otherUserFriends.length ? (
            <Typography variant="h5" color={main}>
              No friends
            </Typography>
          ) : (
            otherUserFriends.map((friend, index) => {
              return (
                <Friend
                  key={friend._id}
                  friendId={friend._id}
                  name={friend.firstName + " " + friend.lastName}
                  subtitle={friend.location}
                  userPicturePath={friend.picturePath}
                ></Friend>
              );
            })
          )
        ) : (
          friends.map((friend, index) => {
            return (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={friend.firstName + " " + friend.lastName}
                subtitle={friend.location}
                userPicturePath={friend.picturePath}
              ></Friend>
            );
          })
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
