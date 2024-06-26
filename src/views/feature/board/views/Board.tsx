import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardAPI from "../api/boardApi";
import { dispatch, useSelector } from "../../../../store";
import { IBoard } from "../types";
import { Box, IconButton, TextField } from "@mui/material";
import {
  DeleteOutlined,
  Menu,
  StarBorderOutlined,
  StarOutlined,
} from "@mui/icons-material";
import EmojiPicker from "../../../../components/common/EmojiPicker";
import { setBoards } from "../../../../store/reducer/boardSlice";
import { debounce } from "../../../../utils/util";
import { setFavourites } from "../../../../store/reducer/favouriteSlice";
import Sections from "../../section/views/Sections";
import { DataStatus } from "../../../../utils/types";
import Loading from "../../../../components/common/Loading";
import { updateDrawer } from "../../../../store/reducer/drawer";

const Board = () => {
  const { boardId } = useParams();
  const [loading, setLoading] = useState(DataStatus.loading);
  const boardApi = new BoardAPI();
  const [board, setBoard] = useState<IBoard>({
    title: "",
    description: "",
    sections: [],
    favourite: false,
    icon: "",
  });

  const boards = useSelector((state) => state.board);
  const favourites = useSelector((state) => state.favourites);
  const open = useSelector((state) => state.drawer.open);

  useEffect(() => {
    const getBoard = async () => {
      try {
        setLoading(DataStatus.loading);
        let response = await boardApi.getBoard({ boardId });
        setBoard(response?.data?.data);
        setLoading(DataStatus.loaded);
      } catch (error) {
        console.log(error);
        setLoading(DataStatus.error);
      }
    };
    getBoard();
  }, [boardId]);
  const selectIcon = async (icon: any) => {
    let temp = [...boards];
    const index = temp.findIndex((e) => e.id == boardId);
    temp[index] = { ...temp[index], icon: icon };
    dispatch(setBoards(temp));
    if (board.favourite) {
      let favouriteTemp = [...favourites];
      favouriteTemp[index] = { ...favouriteTemp[index], icon: icon };
      dispatch(setFavourites(favouriteTemp));
    }
    setBoard({ ...board, icon: icon });
    try {
      await boardApi.updateBoard({ boardId, data: { icon: icon } });
    } catch (error) {
      console.log(error);
    }
  };
  const updateTitle = async (e: any) => {
    let newTitle = e.target.value;
    setBoard({ ...board, title: newTitle });
    let temp = [...boards];
    const index = temp.findIndex((e) => e.id == boardId);
    temp[index] = { ...temp[index], title: newTitle };
    dispatch(setBoards(temp));
    if (board.favourite) {
      let favouriteTemp = [...favourites];
      favouriteTemp[index] = { ...favouriteTemp[index], title: newTitle };
      dispatch(setFavourites(favouriteTemp));
    }
    const debounceFunction = debounce(async () => {
      try {
        await boardApi.updateBoard({ boardId, data: { title: newTitle } });
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    debounceFunction();
  };
  const updateDescription = async (e: any) => {
    let newDescription = e.target.value;
    setBoard({ ...board, description: newDescription });
    const debounceFunction = debounce(async () => {
      try {
        await boardApi.updateBoard({
          boardId,
          data: { description: newDescription },
        });
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    debounceFunction();
  };
  const addFavourite = async () => {
    setBoard({ ...board, favourite: !board.favourite });
    let temp = [...favourites];
    if (!board.favourite) {
      let index = boards.findIndex((b: any) => b._id == boardId);
      dispatch(setFavourites([...temp, boards[index]]));
    } else {
      let newFavorites = favourites.filter((b: any) => b._id != boardId);
      dispatch(setFavourites([...newFavorites]));
    }
    const debounceFunction = debounce(async () => {
      try {
        await boardApi.updateBoard({
          boardId,
          data: { favourite: !board.favourite },
        });
      } catch (error) {
        console.log(error);
      }
    }, 500);
    debounceFunction();
  };
  const deleteBoard = async () => {
    let newBoards = boards.filter((board) => board._id != boardId);
    let newFavorites = favourites.filter((board) => board._id != boardId);
    dispatch(setBoards(newBoards));
    dispatch(setFavourites(newFavorites));
    await boardApi.deleteBoard({ boardId });
  };
  if (loading == DataStatus.loading) {
    return <Loading fullHeight />;
  }
  if (loading == DataStatus.loaded) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={() => dispatch(updateDrawer({ open: !open }))}>
            <Menu fontSize="small" />
          </IconButton>
          <IconButton onClick={addFavourite}>
            {board.favourite ? (
              <StarOutlined color="warning" />
            ) : (
              <StarBorderOutlined />
            )}
          </IconButton>
          <IconButton onClick={deleteBoard}>
            <DeleteOutlined />
          </IconButton>
        </Box>
        <Box
          sx={{
            padding: { xs: "10px 0px", md: "10px 50px" },
          }}
        >
          <EmojiPicker icon={board.icon} onChange={selectIcon} />
          <TextField
            value={board.title}
            placeholder="Untitled"
            variant="outlined"
            fullWidth
            onChange={updateTitle}
            sx={{
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
              "& .MuiOutlinedInput-root": {
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: "700",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "unset",
              },
            }}
          />
          <TextField
            value={board.description}
            placeholder="Add description here"
            multiline
            variant="outlined"
            onChange={updateDescription}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
              "& .MuiOutlinedInput-root": {
                fontSize: { xs: "0.7rem", md: "1rem" },
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
          <Sections data={board.sections} boardId={boardId} />
        </Box>
      </>
    );
  }
};

export default Board;
