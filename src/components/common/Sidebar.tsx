import { Box, Drawer, IconButton, List, ListItem, Typography } from "@mui/material";
import { useSelector } from "../../store";
import { AddBoxOutlined, LogoutOutlined } from "@mui/icons-material";
import LocalStorageService from "../../services/ localStorageService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    useEffect(()=>{

    },[])
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
                            <LogoutOutlined  fontSize="small"/>
                        </IconButton>
                    </Box>
                </ListItem>
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
                            Favorites
                        </Typography>
                    </Box>
                </ListItem>
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
                        <IconButton>
                            <AddBoxOutlined fontSize="small"/>
                        </IconButton>
                    </Box>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;