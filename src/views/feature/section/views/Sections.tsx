import { Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import SectionAPI from "../api/sectionApi";
import { AddOutlined, DeleteOutline } from "@mui/icons-material";

const Sections = (props: any) => {
    const _sectionApi = new SectionAPI();
    const boardId = props.boardId;
    const [title, setTitle] = useState('');
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(props.data)
    }, [props.data]);
    const addSection = async () => {
        try {
            let res = await _sectionApi.createBoard({ boardId })
            setData([...data, res?.data?.data] as any);
        } catch (error) {
            console.log(error)
        }
    }
    const updateSectionTitle = async (e: any) => {
        try {
            let newValue = e.target.value;
            let res = await _sectionApi.createBoard({ boardId })
            setData([...data, res?.data?.data] as any);
        } catch (error) {
            console.log(error)
        }
    }
    const deleteSection = async (id: string) => {
        try {
            await _sectionApi.deleteSection({ sectionId: id })
            const newData = [...data].filter((e: any) => e._id !== id);
            setData(newData);
        } catch (error) {
            console.log(error)
        }
    }
    const onDragEnd = () => {

    }
    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Button
                    onClick={addSection}
                >
                    Add section
                </Button>
                <Typography variant="body2" fontWeight='700'>
                    {
                        data.length
                    } Sections
                </Typography>
            </Box>
            <Divider sx={{ margin: '10px 0' }} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    width: 'calc(100vw - 400px)',
                    overflowX: 'auto'
                }}>
                    {
                        data.map((section: any) => (
                            <div key={section.id} style={{ width: '300px' }}>
                                <Droppable key={section.id} droppableId={section.id}>
                                    {(provided) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            sx={{
                                                width: '300px', padding: '10px', marginRight: '10px'
                                            }}
                                        >
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginBottom: '10px'
                                            }}>
                                                <TextField
                                                    value={section.title}
                                                    placeholder="Untitled"
                                                    variant="outlined"
                                                    sx={{
                                                        flexGrow: 1,
                                                        '& .MuiOutlinedInput-input': { padding: 0 },
                                                        '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
                                                        '& .MuiOutlinedInput-root': { fontSize: '1rem', fontWeight: '600' },
                                                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            border: 'none'
                                                        }
                                                    }}
                                                />

                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        color: 'gray',
                                                        '&:hover': { color: 'green' }
                                                    }}
                                                >
                                                    <AddOutlined />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => deleteSection(section._id)}
                                                    size="small"
                                                    sx={{
                                                        color: 'gray',
                                                        '&:hover': { color: 'red' }
                                                    }}
                                                >
                                                    <DeleteOutline />
                                                </IconButton>
                                            </Box>
                                            {/* tasks */}
                                        </Box>
                                    )}
                                </Droppable>
                            </div>
                        ))
                    }
                </Box>
            </DragDropContext>
        </>
    );
};

export default Sections;