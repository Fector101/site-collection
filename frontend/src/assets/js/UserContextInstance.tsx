import { createContext } from "react";
import { IAddToListModalData } from "./myTypes";

export interface AppContextType{
    timer: NodeJS.Timeout | undefined;
    setTimer: React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>;
    add_to_list_modal_data: IAddToListModalData;
    setAddToListState: React.Dispatch<React.SetStateAction<IAddToListModalData>>;

}
export const UserContext = createContext<AppContextType | null>(null);