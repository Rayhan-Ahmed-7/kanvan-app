import AxiosService from "../../../../services/axios_service";

class BoardAPI {
    private addBoard: string = 'board/create-board';
    private boards: string = 'board/get-boards';
    private favourite: string = 'board/get-favourite-boards';
    private favouritePosition: string = 'board/update-favourite-boards';
    private singleBoard: string = 'board/get-board/';
    private updateSingleBoard: string = 'board/update-board/';
    private update: string = 'board/update-boards';

    createBoard = async ({ userId }: { userId: string }) => {
        return AxiosService.post(this.addBoard, { userId: userId });
    }
    getBoards = async () => {
        return AxiosService.get(this.boards);
    }
    getFavouriteBoards = async () => {
        return AxiosService.get(this.favourite);
    }
    getBoard = async ({ boardId }: { boardId?: string }) => {
        return AxiosService.get(this.singleBoard + boardId);
    }
    updateBoard = async ({ boardId, data }: { boardId?: string, data: Object }) => {
        return AxiosService.put(this.updateSingleBoard + boardId, data);
    }
    updateBoards = async (data: any) => {
        return AxiosService.put(this.update, data);
    }
    updateFavourites = async (data: any) => {
        return AxiosService.put(this.favouritePosition, data);
    }
}

export default BoardAPI;