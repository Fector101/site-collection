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
    itemId?: number;
    item_name: string;
}