import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../utils/authUtils";
import Loading from "../components/common/Loading";
import { Box, styled } from "@mui/material";
import Sidebar from "../components/common/Sidebar";
import { dispatch, useSelector } from "../store";
import { addUser } from "../store/reducer/userSlice";
import useBoard from "../views/feature/board/hooks/useBoard";
import { DataStatus } from "../utils/types";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  overflowX: "hidden",
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${250}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));

const AppLayout = () => {
  const {
    loading: boardsLoading,
    activeIndex,
    onDragEnd,
    createBoard,
  } = useBoard();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const open = useSelector((state) => state.drawer.open);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
        setLoading(false);
      } else {
        dispatch(addUser(user?.data?.data));
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);
  return loading || boardsLoading == DataStatus.loading ? (
    <Loading fullHeight />
  ) : (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Sidebar
        activeIndex={activeIndex}
        onDragEnd={onDragEnd}
        createBoard={createBoard}
      />
      <Main open={open}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default AppLayout;
