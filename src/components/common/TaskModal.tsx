import { DeleteOutline } from "@mui/icons-material";
import { Backdrop, Box, Divider, Fade, IconButton, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TaskAPI from "../../views/feature/task/api/taskApi";
import { debounce } from "../../utils/util";
const modalStyle = {
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 1,
    height: '80%'
}

const TaskModal = (props: any) => {
    const taskApi = new TaskAPI();
    // const boardId = props.boardId;
    const [task, setTask] = useState(props?.task);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const boxRef = useRef<HTMLElement>();
    useEffect(() => {
        setTask(props.task || '');
        setTitle(props.task?.title || '')
        setContent(props.task?.content || '')
        if (props.task != '') {
            updateEditorHeight()
        }
    }, [props.task])
    const updateEditorHeight = () => {
        setTimeout(() => {
            if (boxRef.current) {
                const box = boxRef.current
                console.log(box,"box")
                const editableInline = box.querySelector('.ck-editor__editable_inline') as HTMLElement;
                if (editableInline) {
                    console.log(box.offsetHeight,'inline')
                    editableInline.style.height = (box.offsetHeight - 50) + 'px';
                }
            }
        }, 200)
    }
    const handleClose = () => {
        console.log(task, "before")
        props.onUpdate(task);
        props.onClose()
        console.log(task, "after")
    }
    const deleteTask = async () => {
        try {
            await taskApi.deleteTask({ taskId: task._id });
            setTask('');
            props.onDelete(task)
        } catch (error) {

        }
    }
    const updateTaskTitle = (e: any) => {
        const newTitle = e.target.value;
        setTask((prevTask: any) => ({ ...prevTask, title: newTitle }));
        setTitle(newTitle);
        props.onUpdate(task)
        const debouncedFunction = debounce(async () => {
            try {
                await taskApi.updateTask({ taskId: task?._id, data: { title: newTitle } })
            } catch (error) {

            }
        }, 1000);
        debouncedFunction();
    }
    const updateTaskContent = (e: any, editor: any) => {
        if (props.task != '') {
            const data = editor.getData();
            setTask((prevTask: any) => ({ ...prevTask, content: data }));
            setContent(data);
            props.onUpdate(task)
            const debouncedFunction = debounce(async () => {
                try {
                    await taskApi.updateTask({ taskId: task?._id, data: { content: data } })
                } catch (error) {
                    console.log(error)
                }
            }, 1000);
            debouncedFunction();
        }
    }
    return (
        <Modal
            open={task != ''}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade
                in={task != ''}
            >
                <Box
                    sx={modalStyle}
                >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}>
                        <IconButton color="error" onClick={deleteTask}>
                            <DeleteOutline />
                        </IconButton>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'column',
                        padding: '2rem 5rem 5rem'
                    }}>
                        <TextField
                            value={title}
                            onChange={updateTaskTitle}
                            // placeholder="Untitled"
                            variant="outlined"
                            fullWidth
                            sx={{
                                flexGrow: 1,
                                '& .MuiOutlinedInput-input': { padding: 0 },
                                '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
                                '& .MuiOutlinedInput-root': { fontSize: '2.5rem', fontWeight: '600' },
                                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                },
                                marginBottom: '10px'
                            }}
                        />
                        <Typography variant="body2" fontWeight='700'>
                            {
                                task !== undefined ? task?.createdAt : ''
                            }
                        </Typography>
                        <Divider sx={{ margin: '1.5rem 0' }} />
                        <Box
                            ref={boxRef}
                            sx={{
                                position: 'relative',
                                height: "80%",
                                overflowX: 'hidden',
                                overflowY: 'auto'
                            }}>
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