import { useState } from "react";
import { DataStatus } from "../../../../utils/types";
import { setBoards } from "../../../../store/reducer/boardSlice";
import { dispatch } from "../../../../store";
import BoardAPI from "../api/boardApi";
import { useNavigate, useParams } from "react-router-dom";
import { IBoard } from "../types";

const useBoard = () => {
    const boardApi = new BoardAPI();
    const navigate = useNavigate();
    const { boardId } = useParams();

    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(DataStatus.idle);

    const createBoard = async ({ userId }: { userId: string }) => {
        try {
            setLoading(DataStatus.loading)
            let response = await boardApi.createBoard({ userId });
            setLoading(DataStatus.loaded)
        } catch (error) {
            console.log(error);
            setLoading(DataStatus.error)
        }
    }
    const getBoards = async () => {
        try {
            setLoading(DataStatus.loading)
            let response = await boardApi.getBoards();
            if (response?.data?.data?.length > 0 && boardId != 'undefined') {
                navigate(`/boards/${response?.data?.data?.[0].id}`)
            }
            dispatch(setBoards(response.data?.data))
            setLoading(DataStatus.loaded)
        } catch (error) {
            console.log(error);
            setLoading(DataStatus.error)
        }
    }
    const updateActive = (boards: IBoard[]) => {
        const activeIndex = boards.findIndex(e => e.id == boardId);
        setActiveIndex(activeIndex);
    }
    return { createBoard, getBoards, loading, activeIndex, updateActive }
};

export default useBoard;