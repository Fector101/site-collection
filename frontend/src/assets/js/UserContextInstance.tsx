import { createContext } from "react";

interface AppContextType{
    timer: NodeJS.Timeout | undefined;
    setTimer: React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>;
}
export const UserContext = createContext<AppContextType | null>(null);