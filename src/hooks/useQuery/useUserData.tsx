import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const useUserData = () => {
  const uid = localStorage.getItem("uid")!;
  const handleUserDataset = async () => {
    const userdoc = doc(db, "users", uid);
    const dataSnap = await getDoc(userdoc);
    const dataset = dataSnap.data();
    return dataset;
  };

  return useQuery({
    queryFn: handleUserDataset,
    queryKey: ["userdataset"],
  });
};

export default useUserData;
