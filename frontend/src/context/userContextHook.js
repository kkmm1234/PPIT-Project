import { UserContext } from "./userContext";
import { useContext } from "react";

export const useUserContext = () => {
 const context = useContext(UserContext);

 return context;
}