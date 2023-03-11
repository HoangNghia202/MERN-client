import React from "react";
import { setMode } from "../../state";
import { useDispatch } from "react-redux";
const LoginPage = () => {
  const dispatch = useDispatch();
  dispatch(setMode());
  return (
    <div className="text-center font-semibold text-red-600">
      <h1>Login page</h1>
    </div>
  );
};

export default LoginPage;
