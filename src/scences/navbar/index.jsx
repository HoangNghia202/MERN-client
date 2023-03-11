import React from "react";
import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  Logout,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router";
import FlexBetween from "../../components/FlexBetween";
import { fontSize } from "@mui/system";
const Navbar = () => {
  const [isMobileMenuToggle, setIsMobileMenuToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNoneMobileScreen = useMediaQuery("(min-width: 768px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.primary.alt;
  const fullName = user?.firstName + " " + user?.lastName;
  console.log("toggle", isMobileMenuToggle);
  return (
    <FlexBetween padding={"1rem 6%"} backgroundColor={alt}>
      <FlexBetween gap={"1.75rem"}>
        <Typography
          fontWeight={"bold"}
          fontSize={"clamp(1rem 2rem 2.25rem)"}
          color="primary"
          onClick={() => navigate("/home")}
          sx={{ "&:hover": { cursor: "pointer", color: primaryLight } }}
        >
          Sociopedia
        </Typography>
        {isNoneMobileScreen && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding={"0"}
          >
            <InputBase
              placeholder="Search..."
              sx={{ paddingX: "1rem" }}
            ></InputBase>
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      <FlexBetween>
        {isNoneMobileScreen ? (
          <FlexBetween gap={"1.75rem"}>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <Message />
            <Notifications />
            <Help />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  padding: "0.5rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase placeholder="nghia" />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography>
                    <Logout /> Log Out
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}
          >
            {isMobileMenuToggle ? <Close /> : <Menu />}
          </IconButton>
        )}

        {isMobileMenuToggle && !isNoneMobileScreen && (
          <Box
            position={"fixed"}
            top="100px"
            right="1rem"
            zIndex={"10"}
            backgroundColor={background}
            border={"1px solid #e0e0e0"}
            borderRadius={"0.25rem"}
          >
            <FlexBetween
              gap={"1.75rem"}
              flexDirection="column"
              justifyContent={"center"}
            >
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ fontSize: "25px" }} />
                )}
              </IconButton>

              <Message />

              <Notifications />
              <Help />
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    padding: "0.5rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase placeholder="nghia" />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography>
                      <Logout /> Log Out
                    </Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
