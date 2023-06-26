import { collection, where, orderBy, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";
import useChatContext from "../../../hooks/useContextHooks/useChatContext";
import { useQuery } from "@tanstack/react-query";
import type { SnapType } from "../../../types/Types";
import LoadingMessages from "../../LoadingStates/LoadingMessages";
import Message from "./Message/Message";

const Messages = () => {
  const { userpair, reversed } = useChatContext();

  const getMessages = async (): Promise<SnapType[]> => {
    try {
      const messagedoc = collection(db, "messages");
      const querymessages = query(
        messagedoc,
        where("userpair", "in", [`${userpair}`, `${reversed}`]),
        orderBy("timestamp")
      );
      const snaps = await getDocs(querymessages);
      let messagesarr: SnapType[] = [];
      let idarr: string[] = [];
      snaps.forEach((snap: any) => {
        messagesarr.push(snap.data());
        idarr.push(snap.id);
      });
      for (let i = 0; i < messagesarr.length; i++) {
        messagesarr[i].id = idarr[i];
      }
      return messagesarr;
    } catch (err) {
      throw `${err} in the ChatContext in getMessages()`;
    }
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
