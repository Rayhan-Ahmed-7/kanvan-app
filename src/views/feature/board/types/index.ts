export interface IBoard {
    _id?: string;
    user?: string;
    icon?: string;
    title?: string;
    description?: string;
    position?: number;
    favourite?: boolean;
    sections?:[];
    favouritePosition?: number;
    id?: string;
}
