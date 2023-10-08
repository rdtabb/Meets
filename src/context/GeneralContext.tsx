import { createContext, useState } from "react";
import { cookies } from "../App";
import { ChildrenType } from "../types/Types";

export type GeneralContextType = {
  isAuth: any;
  setIsAuth: React.Dispatch<any>;
};

const initialState: GeneralContextType = {
  setIsAuth: () => {},
  isAuth: false,
};

const GeneralContext = createContext<GeneralContextType>(initialState);

export const GeneralProvider = ({ children }: ChildrenType) => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  return (
    <GeneralContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
