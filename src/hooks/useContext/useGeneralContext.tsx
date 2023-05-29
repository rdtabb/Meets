import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";

const useGeneralContext = () => {
    return useContext(GeneralContext)
}

export default useGeneralContext

