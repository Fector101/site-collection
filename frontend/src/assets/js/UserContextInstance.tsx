import { createContext } from "react";

export interface AppContextType{
    timer: NodeJS.Timeout | undefined;
    setTimer: React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>;

}
export const UserContext = createContext<AppContextType | null>(null);