export interface ILinks {
    url: string;
    icon?: React.ReactNode;
    name?: string
};
export interface IWatchList {
    _id: string;
    title: string;
    desc: string;
    length: number;
    status: string[];
}
export interface IAddToListModalData {
    state: boolean;
    item_id?: number; // | string is because of movie page interface movie_id == 'string'
    item_name: string;
}