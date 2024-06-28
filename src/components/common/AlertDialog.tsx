import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import { CheckCircle, Info, Warning, Error } from "@mui/icons-material";
import { useDispatch, useSelector } from "../../store";
import { closeDialog } from "../../store/reducer/alertDialog";
import { ThemeMode } from "../../theme/types/themeMode";
import useThemeConfig from "../../hooks/useThemeConfig";

const AlertDialog = () => {
  const dispatch = useDispatch();
  const alertDialog = useSelector((state) => state.alertDialog);
  const { mode } = useThemeConfig();

  const getIcon = (type: any) => {
    switch (type) {
      case "success":
        return <CheckCircle style={{ fontSize: 70, color: "#4caf50" }} />;
      case "info":
        return <Info style={{ fontSize: 70, color: "#2196f3" }} />;
      case "warning":
        return <Warning style={{ fontSize: 70, color: "#ff9800" }} />;
      case "error":
        return <Error style={{ fontSize: 70, color: "#f44336" }} />;
      default:
        return null;
    }
  };

  const handleClose = () => {
    dispatch(closeDialog());
  };

  const handleYes = () => {
    if (alertDialog.onOk) alertDialog.onOk();
    handleClose();
  };

  const handleNo = () => {
    if (alertDialog.onCancel) alertDialog.onCancel();
    handleClose();
  };

  return (
    <Dialog
      open={alertDialog.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"xs"}
      fullWidth
    >
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          {getIcon(alertDialog.type)}
          <Typography variant="h6" component="div" style={{ marginTop: 2 }}>
            {alertDialog.type.toUpperCase()}
          </Typography>
          <Typography variant="body2" style={{ marginTop: 16 }}>
            {alertDialog.message}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            backgroundColor: mode == ThemeMode.DARK ? "grey" : "lightblue",
            "&:hover": {
              backgroundColor: mode == ThemeMode.DARK ? "grey" : "lightblue",
            },
            color: mode == ThemeMode.DARK ? "white" : "black",
          }}
          onClick={handleYes}
          color="primary"
        >
          {alertDialog.okBtnText}
        </Button>
        <Button
          sx={{
            backgroundColor: mode == ThemeMode.DARK ? "grey" : "lightblue",
            "&:hover": {
              backgroundColor: mode == ThemeMode.DARK ? "grey" : "lightblue",
            },
            color: mode == ThemeMode.DARK ? "white" : "black",
          }}
          onClick={handleNo}
          color="primary"
          autoFocus
        >
          {alertDialog.cancelBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
