import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";

const Home = () => {
    return (
        <Box
        sx={{
            height:'100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }}
        >
            <LoadingButton
            variant="outlined"
            >
                click here to create your first board
            </LoadingButton>
        </Box>
    );
};

export default Home;