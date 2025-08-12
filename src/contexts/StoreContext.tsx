/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext } from "react";
import Store from "../store";

const StoreContext = createContext(Store);

export const useStore = () => useContext(StoreContext);

export default function StoreContextProvider({ children }: PropsWithChildren) {
  return (
    <StoreContext.Provider value={Store}>{children}</StoreContext.Provider>
  );
}
