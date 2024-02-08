import { useState } from "react";
import { DataStatus } from "../../../../utils/types";
import BoardAPI from "../api/boardApi";
import { setBoards } from "../../../../store/reducer/boardSlice";
import { dispatch } from "../../../../store";

const useBoard = () => {
    const boardApi = new BoardAPI();
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
    const getBoards = async ({ userId }: { userId: string }) => {
        try {
            setLoading(DataStatus.loading)
            let response = await boardApi.createBoard({ userId });
            dispatch(setBoards(response.data?.data))
            setLoading(DataStatus.loaded)
        } catch (error) {
            console.log(error);
            setLoading(DataStatus.error)
        }
    }
    return { createBoard, getBoards, loading }
};

export default useBoard;