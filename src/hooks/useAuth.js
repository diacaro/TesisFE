import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const useAuth = () => {
    return useContext(AppContext )


}
export default useAuth;