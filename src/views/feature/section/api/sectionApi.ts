import AxiosService from "../../../../services/axios_service";
interface ISectionRequest {
    sectionId: string,
    data: any,
}
class SectionAPI {
    private section: string = 'section/create/';
    private sectionUpdate: string = 'section/update/';
    private sectionDelete: string = 'section/delete/';

    createBoard = async ({ boardId, data }: { boardId: string, data: any }) => {
        return AxiosService.post(this.section + boardId, data);
    }
    updateBoard = async ({ sectionId, data }: ISectionRequest) => {
        return AxiosService.put(this.sectionUpdate + sectionId, data);
    }
    deleteSection = async ({ sectionId }: { sectionId: string }) => {
        return AxiosService.delete(this.sectionDelete + sectionId);
    }
}

export default SectionAPI;