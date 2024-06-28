import { dispatch } from "../store";
import { openDialog } from "../store/reducer/alertDialog";
import { AlertDialogType } from "../store/types/alertDiologType";

class Dialog {
  showInfoDialog({
    duration,
    message,
    cancelBtnText,
    okBtnText,
    onCancel,
    onOk,
  }: {
    message: string;
    duration?: number;
    cancelBtnText?: string;
    okBtnText?: string;
    onCancel?: () => void;
    onOk?: () => void;
  }) {
    dispatch(
      openDialog({
        open: true,
        message: message ?? "Info Message Dialog.",
        type: AlertDialogType.info,
        duration: duration ?? 3000,
        cancelBtnText: cancelBtnText ?? "Cancel",
        okBtnText: okBtnText ?? "Ok",
        onCancel: onCancel,
        onOk: onOk,
      })
    );
  }
  showWarningDialog({
    duration,
    message,
    cancelBtnText,
    okBtnText,
    onCancel,
    onOk,
  }: {
    message: string;
    duration?: number;
    cancelBtnText?: string;
    okBtnText?: string;
    onCancel?: () => void;
    onOk?: () => void;
  }) {
    dispatch(
      openDialog({
        open: true,
        message: message ?? "Info Message Dialog.",
        type: AlertDialogType.warning,
        duration: duration ?? 3000,
        cancelBtnText: cancelBtnText ?? "Cancel",
        okBtnText: okBtnText ?? "Ok",
        onCancel: onCancel,
        onOk: onOk,
      })
    );
  }
}

export default new Dialog();
