import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import React from "react";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
const apiUrl = import.meta.env.VITE_API_URL;
const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper mb="1rem">
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight={"500"}>
          Sponsored
        </Typography>
      </FlexBetween>
      <img
        src={`${apiUrl}/assets/info4.jpeg`}
        alt="advert"
        width={"100%"}
        height="auto"
        className="rounded-md object-cover"
      />
      <FlexBetween>
        <Typography color={main}>MikaComMertics</Typography>
        <Typography color={medium}>mikacomertics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta deleniti
        provident, expedita repellat vitae natus quasi, sit officiis possimus
        minima, voluptates sunt eum cum pariatur impedit inventore neque
        delectus aliquid.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
