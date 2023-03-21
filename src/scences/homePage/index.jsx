import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import NewFeedWidget from "../widgets/NewFeedWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import AdvertWidget from "../widgets/AdvertWidget";
const HomePage = () => {
  const userId = useSelector((state) => state.user._id);
  const picturePath = useSelector((state) => state.user.picturePath);
  console.log("picturePath in Home>>", picturePath);

  return (
    <>
      <div className="w-full h-[5rem]">
        <Navbar />
      </div>

      <div className=" md:px-[6%] grid grid-cols-4 md:gap-4 ">
        <div className="">
          <UserWidget userId={userId} picturePath={picturePath} />
        </div>
        <div className="col-span-2">
          <MyPostWidget picturePath={picturePath} />
          <NewFeedWidget></NewFeedWidget>
        </div>
        <div className="col-span-1">
          <AdvertWidget />
          <FriendListWidget />
        </div>
      </div>
    </>
  );
};

export default HomePage;
