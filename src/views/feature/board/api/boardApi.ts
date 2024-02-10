import AxiosService from "../../../../services/axios_service";

class BoardAPI {
    private addBoard: string = 'board/create-board';
    private boards: string = 'board/get-boards';
    private singleBoard: string = 'board/get-board/';
    private update: string = 'board/update-boards';

    createBoard = async ({ userId }: { userId: string }) => {
        return AxiosService.post(this.addBoard, { userId: userId });
    }
    getBoards = async () => {
        return AxiosService.get(this.boards);
    }
    getBoard = async ({ boardId }: { boardId?: string }) => {
        return AxiosService.get(this.singleBoard + boardId);
    }
    updateBoards = async (data: any) => {
        return AxiosService.put(this.update, data);
    }
}

export default BoardAPI;