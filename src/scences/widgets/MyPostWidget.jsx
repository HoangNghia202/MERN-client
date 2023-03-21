import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  fabClasses,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import DropZoneImage from "../loginPage/DropZoneImage";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import axios, { Axios } from "axios";
import { createPost } from "../../services/userServices";
import {
  AttachFileOutlined,
  ImageOutlined,
  MicNoneOutlined,
  Microwave,
  VideoCameraFrontOutlined,
  VoiceChatOutlined,
} from "@mui/icons-material";

const MyPostWidget = (props) => {
  console.log("props my widget>>", props);
  const { picturePath, alertMessage } = props;
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  console.log("image>>", image);

  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const res = await createPost(token, formData);
    if (!res.error) {
      dispatch(setPosts(res.data));
      setImage(null);
      setPost("");
      setIsImage(false);
      alertMessage("Post created successfully", "success");
    } else {
      alertMessage("Post created successfully", "error");
    }
  };

  const setFieldValue = (value) => {
    setImage(value);
  };

  return (
    <WidgetWrapper>
      <Box display={"flex"} gap={"1.5rem"}>
        <UserImage img={picturePath} />
        <Box width="80%">
          <InputBase
            placeholder="What's on your mind?"
            multiline
            value={post}
            onChange={(e) => setPost(e.target.value)}
            fullWidth
            sx={{
              padding: "1rem 2rem",
              backgroundColor: palette.neutral.light,
              borderRadius: "1.5rem",
            }}
          />
        </Box>
      </Box>
      <Box my={"1.5rem"}>
        {isImage && (
          <DropZoneImage
            sizeFiles={1}
            setFieldValue={setFieldValue}
            action={"post"}
          />
        )}
      </Box>
      <Divider sx={{ my: "1rem" }} />
      <FlexBetween>
        <Box display={"flex"} alignItems="center">
          <IconButton
            onClick={() => {
              console.log("click");
              setIsImage(!isImage);
            }}
          >
            <ImageOutlined></ImageOutlined>
          </IconButton>
          <Typography color={mediumMain}>Images</Typography>
        </Box>

        <Box display={"flex"} alignItems="center">
          <IconButton>
            <VideoCameraFrontOutlined />
          </IconButton>
          <Typography color={mediumMain}>Live Video</Typography>
        </Box>
        <Box display={"flex"} alignItems="center">
          <IconButton>
            <AttachFileOutlined />
          </IconButton>
          <Typography color={mediumMain}>File</Typography>
        </Box>
        <Box display={"flex"} alignItems="center">
          <IconButton>
            <MicNoneOutlined />
          </IconButton>
          <Typography color={mediumMain}>Audio</Typography>
        </Box>

        <Button variant="contained" disabled={!post} onClick={handlePost}>
          Post
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
