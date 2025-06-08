import { useState } from "react";


interface UserProviderProps {
    children: React.ReactNode;
}

import { UserContext } from "./UserContextInstance";

export const UserProvider = ({ children }: UserProviderProps) => {
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    return (
        <UserContext.Provider
            value={{
                timer,
                setTimer,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
