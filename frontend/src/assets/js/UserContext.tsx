import { useState } from "react";


interface UserProviderProps {
    children: React.ReactNode;
}

import { IAddToListModalData } from "./myTypes";
import { UserContext } from "./UserContextInstance";

export const UserProvider = ({ children }: UserProviderProps) => {
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [add_to_list_modal_data, setAddToListState] = useState<IAddToListModalData>({state:false, itemId: undefined, item_name: ''});

    return (
        <UserContext.Provider
            value={{
                timer,
                add_to_list_modal_data,
                setTimer,
                setAddToListState
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
