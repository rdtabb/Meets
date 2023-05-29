import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const useAuserData = (id: string) => {
  const userQueryFn = async (id: string) => {
    const userdoc = doc(db, "users", id);
    const data = await getDoc(userdoc);
    const docSnap = data.data();
    return docSnap;
  };

  return useQuery({
    queryKey: ["auserdata", id],
    queryFn: () => userQueryFn(id)
  });
};

export default useAuserData;
