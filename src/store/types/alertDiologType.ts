// ==============================|| TYPES - ALERTDIALOG  ||============================== //

export type AlertDialogActionProps = {
  payload?: AlertDialogProps;
};

type AlertTypes = "info" | "success" | "error" | "warning";

export enum AlertDialogType {
  success = "success",
  info = "info",
  error = "error",
  warning = "warning",
}

export interface AlertDialogProps {
  open?: boolean;
  message: string;
  type: AlertTypes;
  duration?: number;
  cancelBtnText?: string;
  okBtnText?: string;
  onCancel?: () => void;
  onOk?: () => void;
}
