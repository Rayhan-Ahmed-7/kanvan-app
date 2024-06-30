import { useEffect, useState } from "react";
import { DataStatus } from "../../../../utils/types";
import { setBoards } from "../../../../store/reducer/boardSlice";
import { dispatch, useSelector } from "../../../../store";
import BoardAPI from "../api/boardApi";
import { useNavigate, useParams } from "react-router-dom";
import { IBoard } from "../types";

const useBoard = () => {
  const boardApi = new BoardAPI();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(DataStatus.idle);
  const boards = useSelector((state) => state.board);
  useEffect(() => {
    getBoards();
  }, []);
  useEffect(() => {
    const activeItem = boards.findIndex((e) => e.id === boardId);
    setActiveIndex(activeItem);
  }, [boardId]);
  useEffect(() => {
    if (boards.length > 0) {
      navigate(`/boards/${boards?.[0]?.id}`);
    }
    if (boards.length == 0) {
      navigate("/boards");
    }
  }, [boards.length]);

  const createBoard = async ({ userId }: { userId: string }) => {
    try {
      setLoading(DataStatus.loading);
      let response = await boardApi.createBoard({ userId });
      let newList = [response?.data?.data, ...boards];
      dispatch(setBoards(newList));
      navigate(`/boards/${response?.data?.data?.id}`);
      setLoading(DataStatus.loaded);
    } catch (error) {
      console.log(error);
      setLoading(DataStatus.error);
    }
  };

  const getBoards = async () => {
    try {
      setLoading(DataStatus.loading);
      let response = await boardApi.getBoards();
      dispatch(setBoards(response.data?.data));
      setLoading(DataStatus.loaded);
    } catch (error) {
      setLoading(DataStatus.error);
    }
  };

  const updateActive = (boards: IBoard[]) => {
    const activeIndex = boards.findIndex((e) => e.id == boardId);
    setActiveIndex(activeIndex);
  };

  const onDragEnd = async ({ source, destination }: any) => {
    const newList = [...boards];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);
    const activeIndex = newList.findIndex((e) => e.id == boardId);
    setActiveIndex(activeIndex);
    dispatch(setBoards(newList));
    try {
      await boardApi.updateBoards({ boards: newList });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    createBoard,
    getBoards,
    loading,
    activeIndex,
    setActiveIndex,
    updateActive,
    onDragEnd,
  };
};

export default useBoard;
