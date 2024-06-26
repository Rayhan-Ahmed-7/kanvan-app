import AxiosService from "../../../../services/axios_service";
interface ISectionRequest {
    sectionId: string,
    data: any,
}
class SectionAPI {
    private section: string = 'section/create/';
    private sectionUpdate: string = 'section/update/';
    private sectionDelete: string = 'section/delete/';

    createSection = async ({ boardId }: { boardId: string, }) => {
        return AxiosService.post(this.section + boardId, {});
    }
    updateSection = async ({ sectionId, data }: ISectionRequest) => {
        return AxiosService.put(this.sectionUpdate + sectionId, data);
    }
    deleteSection = async ({ sectionId }: { sectionId: string }) => {
        return AxiosService.delete(this.sectionDelete + sectionId);
    }
}

export default SectionAPI;