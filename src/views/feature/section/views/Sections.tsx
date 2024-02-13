import { Box, Button, Card, Divider, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SectionAPI from "../api/sectionApi";
import { AddOutlined, DeleteOutline } from "@mui/icons-material";
import { debounce } from "../../../../utils/util";
import TaskAPI from "../../task/api/taskApi";
interface ISection {
    _id: string,
    title: string,
}
const Sections = (props: any) => {
    const _sectionApi = new SectionAPI();
    const _taskApi = new TaskAPI();
    const boardId = props.boardId
    const [data, setData] = useState<ISection[]>([]);
    useEffect(() => {
        setData(props.data)
    }, [props.data]);
    const addSection = async () => {
        try {
            let res = await _sectionApi.createSection({ boardId })
            setData([...data, res?.data?.data]);
        } catch (error) {
            console.log(error)
        }
    }
    const updateSectionTitle = (e: any, sectionId: string) => {
        let newValue = e.target.value;
        let newData = [...data];
        let index = newData.findIndex((e: any) => e._id == sectionId)
        newData[index].title = newValue;
        setData(newData);
        let debouncedFunction = debounce(async () => {
            try {
                await _sectionApi.updateSection({ sectionId, data: { title: newValue } });
            } catch (error) {
                console.log(error)
            }
        }, 1000);
        debouncedFunction();
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
    const createTask = async (sectionId: string) => {
        try {
            const task = await _taskApi.createTask({ sectionId })
            
        } catch (error) {
            console.log(error);
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
                                                    onChange={(e) => updateSectionTitle(e, section._id)}
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
                                                    onClick={() => createTask(section._id)}
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
                                            {
                                                section?.tasks?.map((task: any, index: number) => (
                                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <Card
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                sx={{
                                                                    padding: '10px',
                                                                    marginBottom: '10px',
                                                                    cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                                                                }}
                                                            >
                                                                <Typography>
                                                                    {task.title == '' ? 'Untitled' : task.title}
                                                                </Typography>
                                                            </Card>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}
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