import { Box } from "@mui/material";

const UserImage = ({ img, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        src={`http://localhost:5000/assets/${img}`}
        alt="user"
        className={`rounded-full h-[${size}] w-[${size}] object-cover`}
      />
    </Box>
  );
};

export default UserImage;
