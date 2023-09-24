import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { handleUserDataset } from "../../methods/methods";
import { User } from "../../types/Types";

const useUserData = (): UseQueryResult<User, unknown> => {
  return useQuery<User>({
    queryFn: handleUserDataset,
    queryKey: ["userdataset"],
  });
};

export type UseUserData = ReturnType<typeof useUserData>;

export default useUserData;
