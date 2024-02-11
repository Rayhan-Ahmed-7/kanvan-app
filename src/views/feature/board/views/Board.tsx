import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardAPI from "../api/boardApi";
import { dispatch, useSelector } from "../../../../store";
import { IBoard } from "../types";
import { Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material";
import { DeleteOutlined, StarBorderOutlined, StarOutlined } from "@mui/icons-material";
import EmojiPicker from "../../../../components/common/EmojiPicker";
import { setBoards } from "../../../../store/reducer/boardSlice";
import { debounce } from "../../../../utils/util";

const Board = () => {
    const { boardId } = useParams();
    const boardApi = new BoardAPI();
    const [board, setBoard] = useState<IBoard>({
        title: '',
        description: '',
        sections: [],
        favourite: false,
        icon: ''
    })

    const boards = useSelector((state) => state.board)
    // const favouriteList = useSelector((state) => state.favourites)

    useEffect(() => {
        const getBoard = async () => {
            try {
                // setLoading(DataStatus.loading)
                let response = await boardApi.getBoard({ boardId });
                setBoard(response?.data?.data)
                // setLoading(DataStatus.loaded)
            } catch (error) {
                console.log(error);
                // setLoading(DataStatus.error)
            }
        }
        getBoard()
    }, [boardId]);
    const selectIcon = async (icon: any) => {
        let temp = [...boards];
        const index = temp.findIndex(e => e.id == boardId);
        temp[index] = { ...temp[index], icon: icon };
        dispatch(setBoards(temp))
        setBoard({ ...board, icon: icon });
        try {
            await boardApi.updateBoard({ boardId, data: { icon: icon } })
        } catch (error) {
            console.log(error);
        }
    }
    const updateTitle = async (e: any) => {
        let newTitle = e.target.value;
        setBoard({ ...board, title: newTitle })
        let temp = [...boards];
        const index = temp.findIndex(e => e.id == boardId);
        temp[index] = { ...temp[index], title: newTitle };
        dispatch(setBoards(temp))
        const debounceFunction = debounce(async () => {
            try {
                await boardApi.updateBoard({ boardId, data: { title: newTitle } })
            } catch (error) {
                console.log(error);
            }
        }, 1000);
        debounceFunction();
    }
    const updateDescription = async (e: any) => {
        let newDescription = e.target.value;
        setBoard({ ...board, description: newDescription });
        const debounceFunction = debounce(async () => {
            try {
                await boardApi.updateBoard({ boardId, data: { description: newDescription } })
            } catch (error) {
                console.log(error);
            }
        }, 1000);
        debounceFunction();
    }
    const addFavourite = async () => {
        setBoard({ ...board, favourite: !board.favourite });
        const debounceFunction = debounce(async () => {
            try {
                await boardApi.updateBoard({ boardId, data: { favourite: !board.favourite } })
            } catch (error) {
                console.log(error);
            }
        }, 500);
        debounceFunction();
    }
    return (
        <>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: '100%'
            }}>
                <IconButton onClick={addFavourite}>
                    {
                        board.favourite ? (
                            <StarOutlined color="warning" />
                        )
                            :
                            (
                                <StarBorderOutlined />
                            )
                    }
                </IconButton>
                <IconButton>
                    <DeleteOutlined />
                </IconButton>
            </Box>
            <Box sx={{ padding: '10px 50px' }}>
                <Box>
                    <EmojiPicker icon={board.icon} onChange={selectIcon} />
                    <TextField
                        value={board.title}
                        placeholder="Untitled"
                        variant="outlined"
                        fullWidth
                        onChange={updateTitle}
                        sx={{
                            '& .MuiOutlinedInput-input': { padding: 0 },
                            '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
                            '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' },
                            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 'unset'
                            }
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
                            '& .MuiOutlinedInput-input': { padding: 0 },
                            '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
                            '& .MuiOutlinedInput-root': { fontSize: '0.8rem', },
                            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                            }
                        }}
                    />
                </Box>
                <Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Button>
                            Add section
                        </Button>
                        <Typography variant="body2" fontWeight='700'>
                            {
                                board.sections?.length
                            } Sections
                        </Typography>
                    </Box>
                    <Divider sx={{ margin: '10px 0' }} />
                </Box>
            </Box>

        </>
    );
};

export default Board;