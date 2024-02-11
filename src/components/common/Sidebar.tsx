import { Box, Drawer, IconButton, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { useSelector } from "../../store";
import { AddBoxOutlined, LogoutOutlined } from "@mui/icons-material";
import LocalStorageService from "../../services/ localStorageService";
import { Link, useNavigate } from "react-router-dom";
import useBoard from "../../views/feature/board/hooks/useBoard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import FavouriteList from "./FavouriteList";

const Sidebar = () => {
    const navigate = useNavigate();
    const { activeIndex, onDragEnd, createBoard } = useBoard();
    const boards = useSelector(state => state.board);
    const user = useSelector(state => state.user);
    
    const logOut = () => {
        LocalStorageService.removeAccessToken();
        navigate('/login');
    }

    return (
        <Drawer
            container={window.document.body}
            open={true}
            variant="permanent"
            sx={{
                width: 250,
                height: "100vh"
            }}
        >
            <List
                disablePadding
                sx={{
                    width: 250,
                    height: "100vh",
                    backgroundColor: "black"
                }}
            >
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
                            {user?.username}
                        </Typography>
                        <IconButton onClick={logOut}>
                            <LogoutOutlined fontSize="small" />
                        </IconButton>
                    </Box>
                </ListItem>
                <Box paddingTop='10px' />
                <FavouriteList/>
                
                <Box paddingTop='10px' />
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
                            private
                        </Typography>
                        <IconButton onClick={() => createBoard({ userId: '' })}>
                            <AddBoxOutlined fontSize="small" />
                        </IconButton>
                    </Box>
                </ListItem>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {
                                    boards?.map((item, index) => (
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
            </List>
        </Drawer>
    );
};

export default Sidebar;