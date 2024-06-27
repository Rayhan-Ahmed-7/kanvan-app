import {
  Grow,
  IconButton,
  Snackbar as MuiSnackbar,
  Slide,
  SlideProps,
} from "@mui/material";
import { closeSnackbar } from "../store/reducer/snackbar";
import { Add, CheckCircle, Info, Warning, Error } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useDispatch, useSelector } from "../store";

// animation function
function TransitionSlideLeft(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps) {
  return <Grow {...props} />;
}

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

const animation: KeyedObject = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
};

const Snackbar = () => {
  const dispatch = useDispatch();
  const { anchorOrigin, message, transition, open, type } = useSelector(
    (state) => state.snackbar
  );
  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle fontSize="inherit" />;
      case "info":
        return <Info fontSize="inherit" />;
      case "warning":
        return <Warning fontSize="inherit" />;
      case "error":
        return <Error fontSize="inherit" />;
      default:
        return null;
    }
  };

  return (
    <MuiSnackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={animation[transition]}
      action={
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Add style={{ transform: "rotate(45deg)" }} />
          </IconButton>
        </>
      }
    >
      <Alert
        onClose={handleClose}
        severity={type}
        icon={getIcon(type)}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <AlertTitle>{type.charAt(0).toUpperCase() + type.slice(1)}</AlertTitle>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
