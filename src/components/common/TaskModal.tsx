import { DeleteOutline } from "@mui/icons-material";
import { Backdrop, Box, Divider, Fade, IconButton, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
    const boardId = props.boardId;
    const [task, setTask] = useState(props?.task);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        setTask(props.task);
        setTitle(props.task !== undefined ? props.task?.title : '')
        setContent(props.content !== undefined ? props.task?.content : '')
    }, [props.task])
    const updateTaskTitle = (e: any) => {

    }
    // console.log(props.task)
    const handleClose = () => {
        props.onUpdate(task);
        props.onClose()
        console.log(task)
    }
    return (
        <Modal
            open={task == null ? false : true}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade
                in={task !== null}
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
                        <IconButton>
                            <DeleteOutline />
                        </IconButton>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        padding: '2rem 5rem 5rem'
                    }}>
                        <TextField
                            value={title}
                            onChange={updateTaskTitle}
                            placeholder="Untitled"
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
                            sx={{
                                height: "80%",
                                overFlowX: 'hidden',
                                overFlowY: 'auto'
                            }}>
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}
                            />
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default TaskModal;