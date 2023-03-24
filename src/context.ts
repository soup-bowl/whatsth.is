import { createContext } from "react";

type ConnectionContextType = {
	connectionState: boolean;
};

export const ConnectionContext = createContext<ConnectionContextType>({
	connectionState: false,
});
