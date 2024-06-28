import { useDispatch } from "../store";
import { openDialog } from "../store/reducer/alertDialog";
import {
  AlertDialogProps,
  AlertDialogType,
} from "../store/types/alertDiologType";

const dispatch = useDispatch();

class Dialog {
  showInfoDialog({
    message,
    cancelBtnText,
    okBtnText,
    onCancel,
    onOk,
  }: AlertDialogProps) {
    dispatch(
      openDialog({
        open: true,
        message: message ?? "Info Message Dialog.",
        type: AlertDialogType.info,
        duration: 3000,
        cancelBtnText: cancelBtnText ?? "No",
        okBtnText: okBtnText ?? "Yes",
        onCancel: onCancel,
        onOk: onOk,
      })
    );
  }
}

export default new Dialog();
