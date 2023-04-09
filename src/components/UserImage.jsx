import { Box } from "@mui/material";
const apiUrl = import.meta.env.VITE_API_URL;
const UserImage = ({ img, size }) => {
  return (
    <Box width="50px" height={"50px"}>
      <img
        src={`${apiUrl}/assets/${img}`}
        alt="user"
        className={`rounded-full h-[50px] w-[50px] object-cover`}
      />
    </Box>
  );
};

export default UserImage;
