import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { handleUserDataset } from "../../methods/methods";

const useUserData = () => {
  return useQuery({
    queryFn: handleUserDataset,
    queryKey: ["userdataset"],
  });
};

export default useUserData;
