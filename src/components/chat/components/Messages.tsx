import { collection, where, orderBy, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";
import useChatContext from "../../../hooks/useContextHooks/useChatContext";
import { useQuery } from "@tanstack/react-query";
import type { SnapType } from "../../../types/Types";
import LoadingMessages from "../../LoadingStates/LoadingMessages";
import Message from "./Message/Message";

const Messages = () => {
  const { userpair, reversed } = useChatContext();
  const messagedoc = collection(db, "messages");

  async function getMessages(): Promise<SnapType[]> {
    const querymessages = query(
      messagedoc,
      where("userpair", "in", [userpair, reversed]),
      orderBy("timestamp"),
    );
    const snaps = await getDocs(querymessages);
    const messagesarr: SnapType[] = [];
    snaps.forEach((snap: any) => {
      messagesarr.push(snap.data());
    });
    return messagesarr;
  }

  const messagesQuery = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });

  return (
    <ul className="chat__meslist">
      {messagesQuery.isLoading ? (
        <LoadingMessages />
      ) : (
        <Message messages={messagesQuery.data} />
      )}
    </ul>
  );
};

export default Messages;
