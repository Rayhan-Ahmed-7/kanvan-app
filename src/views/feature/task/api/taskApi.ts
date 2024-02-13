import AxiosService from "../../../../services/axios_service";
interface ITaskRequest {
    taskId: string,
    data: any,
}
class TaskAPI {
    private task: string = 'task/create/';
    private taskUpdate: string = 'task/update/';
    private taskPositionUpdate: string = 'task/update-position/';
    private taskDelete: string = 'task/delete/';

    createTask = async ({ sectionId }: { sectionId: string, }) => {
        return AxiosService.post(this.task + sectionId, {});
    }
    updateTask = async ({ taskId, data }: ITaskRequest) => {
        return AxiosService.put(this.taskUpdate + taskId, data);
    }
    updateTaskPosition = async ({ taskId, data }: ITaskRequest) => {
        return AxiosService.put(this.taskPositionUpdate + taskId, data);
    }
    deleteTask = async ({ taskId }: { taskId: string }) => {
        return AxiosService.delete(this.taskDelete + taskId);
    }
}

export default TaskAPI;