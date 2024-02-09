import AxiosService from "../../../../services/axios_service";

class BoardAPI {
    private board: string = 'board/create-board';
    private boards: string = 'board/get-boards';
    private update: string = 'board/update-boards';

    createBoard = async ({ userId }: { userId: string }) => {
        return AxiosService.post(this.board, { userId: userId });
    }
    getBoards = async () => {
        return AxiosService.get(this.boards);
    }
    updateBoards = async (data:any) => {
        return AxiosService.put(this.update,data);
    }
}

export default BoardAPI;