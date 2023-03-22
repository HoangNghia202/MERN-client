// import material-ui icon
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Twitter,
  LinkedIn,
} from "@mui/icons-material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser } from "../../services/userServices";

const UserWidget = (props) => {
  console.log("props>>", props);
  const { userId, picturePath } = props;
  const [user, setUser] = useState({});
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const getCurrentUser = async () => {
    const res = await getUser(token, userId);
    if (!res.error) {
      setUser(res.user);
    }
  };

  useEffect(() => {
    getCurrentUser();
    console.log("get user");
  }, []);

  if (!user) {
    return null;
  }
  console.log("user>>", user);

  return (
    <WidgetWrapper>
      <FlexBetween
        gap={"1.4rem"}
        pb={"1.1rem"}
        onClick={() => navigate(`/user/${userId}`)}
      >
        <UserImage img={user.picturePath}></UserImage>
        <Box>
          <Typography
            variant="h6"
            color={dark}
            fontWeight="500"
            sx={{
              "&hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {user?.firstName + " " + user?.lastName}
          </Typography>
          <Typography color={medium}>
            {user?.friends?.length} friends
          </Typography>
        </Box>
        <Box>
          <IconButton>
            <ManageAccountsOutlined />
          </IconButton>
        </Box>
      </FlexBetween>
      <Divider />
      <Box my={"1rem"}>
        <Box display={"flex"} alignItems={"center"}>
          <IconButton>
            {" "}
            <LocationOnOutlined></LocationOnOutlined>{" "}
          </IconButton>
          <Typography color={medium}>Lives in {user?.location}</Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <IconButton>
            <WorkOutlineOutlined />
          </IconButton>
          <Typography color={medium}>{user?.occupation}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box my={"1rem"}>
        <FlexBetween>
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main}>{user?.viewedProfile}</Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impression of your post</Typography>
          <Typography color={main}>{user?.impression}</Typography>
        </FlexBetween>
      </Box>

      <Divider title="Social" />
      <Box py={"1rem"}>
        <Typography variant="h5" color={main}>
          Social Profiles
        </Typography>
        <FlexBetween py=".2rem">
          <Box display={"flex"} alignItems="center">
            <IconButton>
              <Twitter />
            </IconButton>
            <Box>
              <Typography color={main}>Twitter</Typography>
              <Typography color={medium}>Social network</Typography>
            </Box>
          </Box>
          <IconButton>
            <EditOutlined />
          </IconButton>
        </FlexBetween>
        <FlexBetween py=".2rem">
          <Box display={"flex"} alignItems="center">
            <IconButton>
              <LinkedIn />
            </IconButton>
            <Box>
              <Typography color={main}>Link-in</Typography>
              <Typography color={medium}>Social Platform</Typography>
            </Box>
          </Box>
          <IconButton>
            <EditOutlined />
          </IconButton>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
