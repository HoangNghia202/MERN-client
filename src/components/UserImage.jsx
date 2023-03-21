import { Box } from "@mui/material";

const UserImage = ({ img, size }) => {
  return (
    <Box width="50px" height={"50px"}>
      <img
        src={`http://localhost:5000/assets/${img}`}
        alt="user"
        className={`rounded-full h-[50px] w-[50px] object-cover`}
      />
    </Box>
  );
};

export default UserImage;
