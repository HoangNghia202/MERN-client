import React from "react";
import { setMode } from "../../state";
import { useDispatch } from "react-redux";
import { Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import Form from "./Form";
const LoginPage = () => {
  const dispatch = useDispatch();
  dispatch(setMode());
  const theme = useTheme();
  const isNoneMobileScreens = useMediaQuery("(min-width: 768px)");
  return (
    <Box height={"100vh"} display={"flex"} flexDirection={"column"}>
      <Box display={"flex"} justifyContent="center" p={"1rem 6%"}>
        <Typography fontWeight={"bold"} fontSize={"32px"} color={"primary"}>
          Sociopedia
        </Typography>
      </Box>

      <Box
        width={isNoneMobileScreens ? "50%" : "93%"}
        p={"2rem"}
        m={"2rem auto"}
        borderRadius={"20px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent="center"
        boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.2)"}
      >
        <Typography
          fontWeight={"500"}
          fontSize={"32px"}
          variant={"h5"}
          mb={"1.5rem"}
          textAlign={"center"}
        >
          WellCome to Sociopedia, the Social Media for Sociopaths
        </Typography>
        <Form isNoneMobileScreens={isNoneMobileScreens} />
      </Box>
    </Box>
  );
};

export default LoginPage;
