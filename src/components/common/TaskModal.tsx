import { Close, DeleteOutline } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Divider,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TaskAPI from "../../views/feature/task/api/taskApi";
import { debounce } from "../../utils/util";
import useThemeConfig from "../../hooks/useThemeConfig";
import { ThemeMode } from "../../theme/types/themeMode";
import { format } from "date-fns";
import dialog from "../../utils/dialog";

const TaskModal = (props: any) => {
  const { mode } = useThemeConfig();

  const taskApi = new TaskAPI();
  // const boardId = props.boardId;
  const [task, setTask] = useState(props?.task);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const boxRef = useRef<HTMLElement>();
  useEffect(() => {
    setTask(props.task || "");
    setTitle(props.task?.title || "");
    setContent(props.task?.content || "");
    if (props.task != "") {
      // updateEditorHeight();
    }
  }, [props.task]);
  const updateEditorHeight = () => {
    setTimeout(() => {
      if (boxRef.current) {
        const box = boxRef.current;
        const editableInline = box.querySelector(
          ".ck-editor__editable_inline"
        ) as HTMLElement;
        if (editableInline) {
          editableInline.style.height = box.offsetHeight - 50 + "px";
        }
      }
    }, 200);
  };
  const handleClose = () => {
    props.onUpdate(task);
    props.onClose();
  };
  const deleteTask = async () => {
    dialog.showWarningDialog({
      message: "Are you sure you want to delete this task?",
      okBtnText: "Yes",
      onOk: async () => {
        try {
          await taskApi.deleteTask({ taskId: task._id });
          setTask("");
          props.onDelete(task);
        } catch (error) {}
      },
    });
  };
  const updateTaskTitle = (e: any) => {
    const newTitle = e.target.value;
    setTask((prevTask: any) => ({ ...prevTask, title: newTitle }));
    setTitle(newTitle);
    props.onUpdate(task);
    const debouncedFunction = debounce(async () => {
      try {
        await taskApi.updateTask({
          taskId: task?._id,
          data: { title: newTitle },
        });
      } catch (error) {}
    }, 1000);
    debouncedFunction();
  };
  const updateTaskContent = (_e: any, editor: any) => {
    if (props.task != "") {
      const data = editor.getData();
      setTask((prevTask: any) => ({ ...prevTask, content: data }));
      setContent(data);
      props.onUpdate(task);
      const debouncedFunction = debounce(async () => {
        try {
          await taskApi.updateTask({
            taskId: task?._id,
            data: { content: data },
          });
        } catch (error) {
          console.log(error);
        }
      }, 1000);
      debouncedFunction();
    }
  };
  return (
    <Modal
      className={mode == ThemeMode.LIGHT ? "light" : "dark"}
      open={task != ""}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={task != ""}>
        <Box
          sx={{
            outline: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: { xs: "90%", md: "50%" },
            bgcolor: "background.paper",
            border: "0px solid #000",
            boxShadow: 24,
            p: 1,
            height: "80%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <IconButton color="error" onClick={deleteTask}>
              <DeleteOutline />
            </IconButton>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              padding: { sm: "2rem 5rem 5rem", md: "1rem 2rem 2rem" },
            }}
          >
            <TextField
              value={title}
              onChange={updateTaskTitle}
              // placeholder="Untitled"
              variant="outlined"
              fullWidth
              sx={{
                flexGrow: 1,
                "& .MuiOutlinedInput-input": { padding: 0 },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiOutlinedInput-root": {
                  fontSize: { xs: "1.5rem", md: "2.5rem" },
                  fontWeight: "600",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: "none",
                  },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: "none",
                  },
                marginBottom: "10px",
              }}
            />
            <Typography variant="body2" fontWeight="700">
              {task !== undefined && task.createdAt
                ? format(task?.createdAt, "dd-mm-yyyy hh:mm a")
                : ""}
            </Typography>
            <Divider sx={{ margin: { xs: "1.5rem 0", md: "1.5rem 0" } }} />
            <Box
              ref={boxRef}
              sx={{
                position: "relative",
                height: "80%",
                overflowX: "hidden",
                overflowY: "auto",
              }}
            >
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={updateTaskContent}
                onFocus={updateEditorHeight}
                onBlur={updateEditorHeight}
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TaskModal;
