// material-ui
import { SnackbarOrigin } from '@mui/material';

// ==============================|| TYPES - SNACKBAR  ||============================== //

export type SnackbarActionProps = {
    payload?: SnackbarProps;
};

export interface SnackbarProps {
    action: boolean;
    open: boolean;
    message: string;
    duration: number;
    anchorOrigin: SnackbarOrigin;
    transition: string;
    close: boolean;
    actionButton: boolean;
    dense: boolean;
    maxStack: number;
    iconVariant: string;
}
