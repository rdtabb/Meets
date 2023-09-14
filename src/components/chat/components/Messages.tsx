import { useCallback, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import LoadingMessages from "../../LoadingStates/LoadingMessages";
import Message from "./Message/Message";
import { SnapType } from "../../../types/Types";
import { db } from "../../../firebase-config";

const Messages = () => {
  const [userpair] = useState<string | null>(
    localStorage.getItem("userpair") || ""
  );
  const [reversed] = useState<string | null>(
    localStorage.getItem("reversed") || ""
  );

  const getMessages = useCallback(async (): Promise<SnapType[]> => {
    try {
      const messagedoc = collection(db, "messages");
      const querymessages = query(
        messagedoc,
        where("userpair", "in", [`${userpair}`, `${reversed}`]),
        orderBy("timestamp")
      );
      const snaps = await getDocs(querymessages);
      const messages: SnapType[] = [];
      snaps.forEach((snap: any) => {
        messages.push(snap.data());
      });
      return messages;
    } catch (err) {
      throw `${err} in the ChatContext in getMessages()`;
    }
  }, []);

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
