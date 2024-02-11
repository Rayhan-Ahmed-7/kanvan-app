import { Box, ListItem, ListItemButton, Typography } from "@mui/material";
import { dispatch, useSelector } from "../../store";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BoardAPI from "../../views/feature/board/api/boardApi";
import { setFavourites } from "../../store/reducer/favouriteSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const FavouriteList = () => {
    const _boardApi = new BoardAPI();
    const favorites = useSelector(state => state.favourites);
    const [activeIndex, setActiveIndex] = useState(0);
    const { boardId } = useParams();
    useEffect(() => {
        const getFavourites = async () => {
            try {
                const res = await _boardApi.getFavouriteBoards();
                dispatch(setFavourites(res?.data?.data));
            } catch (error) {
                console.log(error)
            }
        }
        getFavourites();
    }, []);
    useEffect(() => {
        const activeItem = favorites.findIndex(e => e.id === boardId)

        setActiveIndex(activeItem)
    }, [favorites,boardId])
    const onDragEnd = () => {

    }
    return (
        <>
            <ListItem>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant="body2" fontWeight={700} color='white'>
                        Favorites
                    </Typography>
                </Box>
            </ListItem>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {
                                favorites?.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id!} index={index}>
                                        {(provided, snapshot) => (
                                            <ListItemButton
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                selected={index == activeIndex}
                                                component={Link}
                                                to={`boards/${item.id}`}
                                                sx={{
                                                    pl: '20px',
                                                    cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    fontWeight='700'
                                                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                >
                                                    {item.icon} {item.title}
                                                </Typography>
                                            </ListItemButton>
                                        )}
                                    </Draggable>
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default FavouriteList;