import { APIAgentType } from "libwhatsthis";
import { createContext, useContext } from "react";

type ConnectionContextType = {
	connectionState: boolean;
};

export const ConnectionContext = createContext<ConnectionContextType>({
	connectionState: false,
});

interface APIContextType {
	apiAgent: APIAgentType;
}

export const APIContext = createContext<APIContextType | undefined>(undefined);
export function useAPIContext() {
	const context = useContext(APIContext);
	if (context === undefined) {
		throw new Error('useAPIContext must be used within an APIContextProvider');
	}
	return context;
}