import React from "react";
import { setMode } from "../../state";
import { useDispatch } from "react-redux";
const LoginPage = () => {
  const dispatch = useDispatch();
  dispatch(setMode());
  return <div className="text-center">Login page </div>;
};

export default LoginPage;
