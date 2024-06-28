import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import { CheckCircle, Info, Warning, Error } from "@mui/icons-material";

const AlertDialog = ({
  open,
  handleClose,
  severity,
  title,
  message,
  handleYes,
}: any) => {
  const getIcon = (severity: any) => {
    switch (severity) {
      case "success":
        return <CheckCircle style={{ fontSize: 80, color: "#4caf50" }} />;
      case "info":
        return <Info style={{ fontSize: 80, color: "#2196f3" }} />;
      case "warning":
        return <Warning style={{ fontSize: 80, color: "#ff9800" }} />;
      case "error":
        return <Error style={{ fontSize: 80, color: "#f44336" }} />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          {getIcon(severity)}
          <Typography variant="h6" component="div" style={{ marginTop: 16 }}>
            {title}
          </Typography>
          <Typography variant="body1" style={{ marginTop: 8 }}>
            {message}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYes} color="primary">
          Yes
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const App = () => {
  const [open, setOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    severity: "info",
    title: "Info",
    message: "This is an info alert dialog.",
  });

  const handleClickOpen = (severity: any, title: any, message: any) => {
    setAlertInfo({ severity, title, message });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    console.log("Yes clicked");
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() =>
          handleClickOpen(
            "success",
            "Success",
            "This is a success alert dialog."
          )
        }
      >
        Open Success Alert Dialog
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          handleClickOpen("info", "Info", "This is an info alert dialog.")
        }
      >
        Open Info Alert Dialog
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          handleClickOpen(
            "warning",
            "Warning",
            "This is a warning alert dialog."
          )
        }
      >
        Open Warning Alert Dialog
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          handleClickOpen("error", "Error", "This is an error alert dialog.")
        }
      >
        Open Error Alert Dialog
      </Button>
      <AlertDialog
        open={open}
        handleClose={handleClose}
        severity={alertInfo.severity}
        title={alertInfo.title}
        message={alertInfo.message}
        handleYes={handleYes}
      />
    </div>
  );
};

export default App;
