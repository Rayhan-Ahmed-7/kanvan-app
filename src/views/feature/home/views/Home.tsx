import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { dispatch, useSelector } from "../../../../store";
import BoardAPI from "../../board/api/boardApi";
import { useNavigate } from "react-router-dom";
import { setBoards } from "../../../../store/reducer/boardSlice";

const Home = () => {
    const boardApi = new BoardAPI();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const boards = useSelector(state => state.board);
    const createBoard = async ({ userId }: { userId: string }) => {
        try {
            let response = await boardApi.createBoard({ userId });
            let newList = [response?.data?.data, ...boards];
            dispatch(setBoards(newList));
            navigate(`/boards/${response?.data?.data?.id}`)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <LoadingButton
                onClick={() => createBoard({ userId: user.id })}
                variant="outlined"
            >
                click here to create your first board
            </LoadingButton>
        </Box>
    );
};

export default Home;