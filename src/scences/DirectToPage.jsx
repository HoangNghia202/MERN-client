import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const DirectToPage = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const checkUser = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  return null;
};

export default DirectToPage;
