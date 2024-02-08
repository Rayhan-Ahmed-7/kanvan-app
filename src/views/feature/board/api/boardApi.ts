import AxiosService from "../../../../services/axios_service";

class BoardAPI {
    private board: string = 'create-board';
    private boards: string = 'get-boards';

    createBoard = async ({ userId }: { userId: string }) => {
        return AxiosService.post(this.board, { userId: userId });
    }
    getBoards = async () => {
        return AxiosService.get(this.boards);
    }
}

export default BoardAPI;