// material-ui
import { SnackbarOrigin } from '@mui/material';

// ==============================|| TYPES - SNACKBAR  ||============================== //

export type SnackbarActionProps = {
    payload?: SnackbarProps;
};

type ErrorMsgTypes = 'default' | 'info' | 'success' | 'error' | 'warning';

export enum SnackbarType {
    default = 'default',
    success = 'success',
    info = 'info',
    error = 'error',
    warning = 'warning'
}

export interface SnackbarProps {
    action: boolean;
    open: boolean;
    message: string;
    type: ErrorMsgTypes,
    duration: number;
    anchorOrigin: SnackbarOrigin;
    transition: string;
    close: boolean;
    actionButton: boolean;
    dense: boolean;
    maxStack: number;
    iconVariant: string;
}
