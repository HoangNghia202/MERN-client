import UserImage from "./UserImage";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import FlexBetween from "./FlexBetween";
import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { addRemoveFriend } from "../services/userServices";
import { setFriends } from "../state";
import ConfirmDialog from "./ConfirmDialog";

const Friend = (props) => {
  console.log("props in friend>>", props);
  const { friendId, name, subtitle, userPicturePath, type } = props;
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
  const light = palette.neutral.light;
  const medium = palette.neutral.medium;
  const [isConfirmed, setIsConfirm] = useState(false);
  const isFriend = friends.find((friend) => friend._id === friendId);
  const isUser = _id === friendId;
  const [conFirmDeletePost, setConfirmDeletePost] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmInfo, setConfirmInfo] = useState({
    title: "",
    content: "",
  });
  console.log("isFriend>>", isFriend);
  console.log("isUser>>", isUser);

  const handleAddRemoveFriend = async () => {
    const res = await addRemoveFriend(token, _id, friendId);

    if (!res.error) {
      dispatch(setFriends({ friends: res.data }));
    }
  };

  const handleDeletePost = async (popupState) => {
    setConfirmInfo({
      title: "Alert",
      content: "You sure to delete this post?",
    });
    setOpenConfirmDialog(true);
    popupState.close();
  };

  useEffect(() => {
    if (conFirmDeletePost) {
      console.log("do action delete");
      setOpenConfirmDialog(false);
      setConfirmDeletePost(false);
      setConfirmInfo({ title: "", content: "" });
    }
  }, [conFirmDeletePost]);

  const handleEditPost = (popupState) => {
    console.log("edit post");
    popupState.close();
  };
  return (
    <>
      <ConfirmDialog
        open={openConfirmDialog}
        title={confirmInfo.title}
        content={confirmInfo.content}
        actionConfirm={() => setConfirmDeletePost(true)}
        closeDialog={() => setOpenConfirmDialog(false)}
      />
      <FlexBetween
        mb="1rem"
        padding={"0.5rem"}
        sx={{
          "&:hover": { backgroundColor: type === "post" ? null : light },
          borderRadius: "0.5rem",
        }}
      >
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

        {isUser ? (
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <IconButton {...bindTrigger(popupState)}>
                  <MoreVertOutlined />
                </IconButton>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={() => {
                      handleDeletePost(popupState);
                      // popupState.close();
                    }}
                  >
                    Delete post
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleEditPost(popupState);
                    }}
                  >
                    Edit post
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        ) : isFriend ? (
          <Tooltip title="Unfriend ">
            <IconButton>
              <PersonRemoveOutlined
                onClick={() => {
                  handleAddRemoveFriend();
                }}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Send request friend">
            <IconButton>
              <PersonAddOutlined
                onClick={() => {
                  handleAddRemoveFriend();
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </FlexBetween>
    </>
  );
};

export default Friend;
