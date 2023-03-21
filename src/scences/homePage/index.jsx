import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import NewFeedWidget from "../widgets/NewFeedWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import DirectionSnackbar from "../../components/SnackBarUp";
import { Button } from "@mui/material";
const HomePage = () => {
  const userId = useSelector((state) => state.user._id);
  const picturePath = useSelector((state) => state.user.picturePath);
  console.log("picturePath in Home>>", picturePath);
  const [snackbar, setSnackbar] = React.useState({
    isOpen: false,
    content: "",
    type: "info",
  });
  const handleOpenCloseSnackbar = (content, type) => {
    setSnackbar({
      isOpen: !snackbar.isOpen,
      content: content ? content : "",
      type: type ? type : "info",
    });
  };
  return (
    <>
      <div className="w-full h-[5rem]">
        <Navbar />
      </div>
      {/* <Button
        onClick={() => {
          handleOpenCloseSnackbar("hellooo");
        }}
      >
        {" "}
        assss
      </Button> */}
      <div className=" md:px-[6%] grid grid-cols-4 md:gap-4 ">
        <div className="">
          <UserWidget
            userId={userId}
            picturePath={picturePath}
            alertMessage={handleOpenCloseSnackbar}
          />
        </div>
        <div className="col-span-2">
          <MyPostWidget
            picturePath={picturePath}
            alertMessage={handleOpenCloseSnackbar}
          />
          <NewFeedWidget></NewFeedWidget>
        </div>
        <div className="col-span-1">
          <AdvertWidget />
          <FriendListWidget />
        </div>
      </div>
      <DirectionSnackbar
        isOpen={snackbar.isOpen}
        content={snackbar.content}
        handleOpenCloseSnackbar={handleOpenCloseSnackbar}
        type={snackbar.type}
      />
    </>
  );
};

export default HomePage;
