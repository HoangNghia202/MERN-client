import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useTheme } from "@emotion/react";
import { Alert } from "@mui/material";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function DirectionSnackbar(props) {
  const { palette } = useTheme();
  const main = palette.primary.main;
  const { isOpen, content, handleOpenCloseSnackbar, type } = props;
  console.log("props in DirectionSnackbar>>", props);

  // const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);

  const handleOpen = () => {
    setTransition(() => TransitionUp);
    // setOpen(true);
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  React.useEffect(() => {
    if (isOpen) {
      handleOpen();
    }
  }, [isOpen]);

  const handleClose = () => {
    handleOpenCloseSnackbar();
  };

  return (
    <div>
      {/* <Button onClick={handleClick(TransitionLeft)}>Right</Button>
      <Button onClick={handleClick(TransitionUp)}>Up</Button>
      <Button onClick={handleClick(TransitionRight)}>Left</Button>
      <Button onClick={handleClick(TransitionDown)}>Down</Button> */}
      <Snackbar
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={transition}
        key={transition ? transition.name : ""}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity={type} sx={{ minWidth: "300px" }}>
          {content}
        </Alert>
      </Snackbar>
    </div>
  );
}
