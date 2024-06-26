import { useEffect, useState } from "react";
import { debounce } from "../../../../utils/util";
import TaskAPI from "../api/taskApi";
import { Box } from "@mui/material";
interface ISection {
    _id: string,
    title: string,
}
const Task = (props: any) => {
    const _taskApi = new TaskAPI();
    const sectionId = props.sectionId
    const [data, setData] = useState<ISection[]>([]);
    useEffect(() => {
        setData(props.data)
    }, [props.data]);

    const updateSectionTitle = (e: any, taskId: string) => {
        let newValue = e.target.value;
        let newData = [...data];
        let index = newData.findIndex((e: any) => e._id == taskId)
        newData[index].title = newValue;
        setData(newData);
        let debouncedFunction = debounce(async () => {
            try {
                await _taskApi.updateTask({ taskId, data: { title: newValue } });
            } catch (error) {
                console.log(error)
            }
        }, 1000);
        debouncedFunction();
    }
    const deleteSection = async (id: string) => {
        try {
            await _taskApi.deleteTask({ taskId: id })
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

            </Box>
        </>
    );
};

export default Task;