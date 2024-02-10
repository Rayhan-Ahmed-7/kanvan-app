import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardAPI from "../api/boardApi";
import { useSelector } from "../../../../store";
import { IBoard } from "../types";
import { Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material";
import { DeleteOutlined, StarBorderOutlined, StarOutlined } from "@mui/icons-material";

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
    }, [boardId])
    return (
        <>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: '100%'
            }}>
                <IconButton>
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

                    <TextField
                        value={board.title}
                        placeholder="Untitled"
                        variant="outlined"
                        fullWidth
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
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-input': { padding: 0 },
                            '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
                            '& .MuiOutlinedInput-root': { fontSize: '0.8rem', },
                            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 'unset'
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
                        <Typography>
                            {
                                board.sections?.length
                            }
                            Sections
                        </Typography>
                    </Box>
                    <Divider sx={{ margin: '10px 0' }} />
                </Box>
            </Box>

        </>
    );
};

export default Board;