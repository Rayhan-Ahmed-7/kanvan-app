import { Grow, IconButton, Snackbar as MuiSnackbar, Slide, SlideProps } from '@mui/material';
import { dispatch, useSelector } from '../store';
import { closeSnackbar } from '../store/reducer/snackbar';
import { Add } from '@mui/icons-material'
// animation function
function TransitionSlideLeft(props: SlideProps) {
    return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
    return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps) {
    return <Grow {...props} />;
}
export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};
const animation: KeyedObject = {
    SlideLeft: TransitionSlideLeft,
    SlideUp: TransitionSlideUp,
    SlideRight: TransitionSlideRight,
    SlideDown: TransitionSlideDown,
    Grow: GrowTransition,
};
const Snackbar = () => {
    const { anchorOrigin, message, transition, open } = useSelector(state => state.snackbar);
    const handleClose = () => {
        dispatch(closeSnackbar());
    }

    return (
        <MuiSnackbar
            anchorOrigin={anchorOrigin}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            TransitionComponent={animation[transition]}
            action={
                <>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <Add style={{ transform: 'rotate(45deg)' }} />
                    </IconButton>
                </>
            }
        />
    );
};

export default Snackbar;