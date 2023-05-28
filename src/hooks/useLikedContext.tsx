import { useContext } from "react";
import LikedContext from "../context/LikedContext";

const useLikedContext = () => {
  return useContext(LikedContext);
};

export default useLikedContext;
