import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SectionAPI from "../api/sectionApi";
import { AddOutlined, DeleteOutline } from "@mui/icons-material";
import { debounce } from "../../../../utils/util";
import TaskAPI from "../../task/api/taskApi";
import TaskModal from "../../../../components/common/TaskModal";
interface ISection {
  _id: string;
  title: string;
  tasks: object[];
}
const Sections = (props: any) => {
  const _sectionApi = new SectionAPI();
  const _taskApi = new TaskAPI();
  const boardId = props.boardId;
  const [data, setData] = useState<ISection[]>([]);
  const [selectedTask, setSelectedTask] = useState("");
  useEffect(() => {
    setData(props.data);
  }, [props.data]);
  const addSection = async () => {
    try {
      let res = await _sectionApi.createSection({ boardId });
      setData([...data, res?.data?.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const updateSectionTitle = (e: any, sectionId: string) => {
    let newValue = e.target.value;
    let newData = [...data];
    let index = newData.findIndex((e: any) => e._id == sectionId);
    newData[index].title = newValue;
    setData(newData);
    let debouncedFunction = debounce(async () => {
      try {
        await _sectionApi.updateSection({
          sectionId,
          data: { title: newValue },
        });
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    debouncedFunction();
  };
  const deleteSection = async (id: string) => {
    try {
      await _sectionApi.deleteSection({ sectionId: id });
      const newData = [...data].filter((e: any) => e._id !== id);
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };
  const createTask = async (sectionId: string) => {
    try {
      const task = await _taskApi.createTask({ sectionId });
      const newData = [...data];
      const index = newData.findIndex((e: any) => e._id == sectionId);
      newData[index].tasks.unshift(task?.data?.data);
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };
  const onDragEnd = async ({ source, destination }: any) => {
    if (!destination) return;
    const sourceColIndex = data.findIndex((e) => e._id == source.droppableId);
    const destinationColIndex = data.findIndex(
      (e) => e._id == destination.droppableId
    );
    const sourceCol = data[sourceColIndex];
    const destinationCol = data[destinationColIndex];

    const sourceSectionId = sourceCol._id;
    const destinationSectionId = destinationCol._id;

    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      data[sourceColIndex].tasks = sourceTasks;
      data[destinationColIndex].tasks = destinationTasks;
    }
    try {
      await _taskApi.updateTaskPosition({
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceSectionId: sourceSectionId,
        destinationSectionId: destinationSectionId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onUpdateTask = (task: any) => {
    const newData = [...data];
    const sectionIndex = newData.findIndex((e) => e._id == task?.section?._id);
    const taskIndex = newData[sectionIndex]?.tasks.findIndex(
      (e: any) => e._id == task?._id
    );
    newData[sectionIndex].tasks[taskIndex] = task;
    // console.log(task,"===========")
    setData(newData);
  };
  const onDeleteTask = (task: any) => {
    const newData = [...data];
    const sectionIndex = newData.findIndex((e) => e._id == task?.section?._id);
    const taskIndex = newData[sectionIndex]?.tasks.findIndex(
      (e: any) => e._id == task?._id
    );
    newData[sectionIndex].tasks.splice(taskIndex, 1);
    setData(newData);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={addSection}>Add section</Button>
        <Typography variant="body2" fontWeight="700">
          {`${data.length} Sections`}
        </Typography>
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            width: "100%",
            overflow: "auto",
          }}
        >
          {data.map((section: any) => (
            <div key={section._id} style={{ width: "300px" }}>
              <Droppable key={section._id} droppableId={section._id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: "300px",
                      padding: "10px",
                      marginRight: "10px",
                      minHeight: "400px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <TextField
                        onChange={(e) => updateSectionTitle(e, section._id)}
                        value={section.title}
                        placeholder="Untitled"
                        variant="outlined"
                        sx={{
                          flexGrow: 1,
                          "& .MuiOutlinedInput-input": { padding: 0 },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset",
                          },
                          "& .MuiOutlinedInput-root": {
                            fontSize: "1rem",
                            fontWeight: "600",
                          },
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        }}
                      />

                      <IconButton
                        onClick={() => createTask(section._id)}
                        size="small"
                        sx={{
                          color: "gray",
                          "&:hover": { color: "green" },
                        }}
                      >
                        <AddOutlined />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteSection(section._id)}
                        size="small"
                        sx={{
                          color: "gray",
                          "&:hover": { color: "red" },
                        }}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Box>
                    {section?.tasks?.map((task: any, index: number) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              padding: "10px",
                              marginBottom: "10px",
                              cursor: snapshot.isDragging
                                ? "grab"
                                : "pointer!important",
                            }}
                            onClick={() => setSelectedTask(task)}
                          >
                            <Typography>
                              {task.title == "" ? "Untitled" : task.title}
                            </Typography>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </div>
          ))}
        </Box>
      </DragDropContext>
      <TaskModal
        task={selectedTask}
        boardId={boardId}
        onClose={() => setSelectedTask("")}
        onUpdate={onUpdateTask}
        onDelete={onDeleteTask}
      />
    </>
  );
};

export default Sections;
