import { createContext,PropsWithChildren, useContext, useState } from "react";
import ServerError from "../features/errors/ServerError";

export interface IServerError {
    statusCode: string,
    message: string,
    details: string,
    setStatusCode: (title:string) => void,
    setMessage: (message:string) => void,
    setDetails: (details: string) => void 

}

export const ErrorContext = createContext<IServerError | undefined>(undefined);

export const ServerErrorProvider = ({children}: PropsWithChildren<{}>) => {
    const [statusCode,setStatusCode] = useState("");
    const [message,setMessage]  = useState("");
    const [details,setDetails] = useState("");

    var value : IServerError = {
        statusCode,
        message,
        details, 
        setStatusCode,
        setMessage,
        setDetails
    };
    return (
        <ErrorContext.Provider value={value}>
            {children}
        </ErrorContext.Provider>
    )
}

export const useErrorContext = () => {
    const context = useContext(ErrorContext);
   
    if (!context) {
      throw new Error('useThemeContext must be used inside the ThemeProvider');
    }
   
    return context;
  };