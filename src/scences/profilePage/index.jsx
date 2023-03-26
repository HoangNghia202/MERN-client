import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/userServices";
import FriendListWidget from "../widgets/FriendListWidget";
import NewFeedWidget from "../widgets/NewFeedWidget";
import UserWidget from "../widgets/UserWidget";
import Navbar from "../navbar";
const ProfilePage = () => {
  const { id } = useParams();

  return (
    <>
      <div className="w-full h-[5rem]">
        <Navbar />
      </div>
      <div className="grid grid-cols-3 gap-[2rem] px-[10%] ">
        <div className="col-span-1">
          <div className="">
            <div className="mb-[2rem]">
              <UserWidget otherUserId={id} isOtherUserProfile={true} />
            </div>
            <div className="sticky top-[2rem]">
              <FriendListWidget otherUserId={id} isOtherUserProfile={true} />
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div>
            <NewFeedWidget userId={id} isProfile={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
