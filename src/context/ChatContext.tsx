import { createContext, useState, useCallback, useEffect } from "react";
import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  deleteDoc,
  FieldValue,
} from "firebase/firestore";
import { format } from "date-fns";
import type { SnapType, ChildrenType } from "../types/Types";

type ChatContextType = {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    creator: string,
    image: string | null | undefined,
    message: string,
    timestamp: any,
    userpair: string,
  ) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  messages: SnapType[];
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  userpair: string | null;
  setUserpair: React.Dispatch<React.SetStateAction<string | null>>;
  reversed: string | null;
  setReversed: React.Dispatch<React.SetStateAction<string | null>>;
};

const initstate = {
  handleSubmit: async () => {},
  handleDelete: async () => {},
  messages: [],
  newMessage: "",
  setNewMessage: () => {},
  userpair: "",
  setUserpair: () => {},
  reversed: "",
  setReversed: () => {},
};

export const ChatContext = createContext<ChatContextType>(initstate);

export const ChatProvider = ({ children }: ChildrenType) => {
  const [messages, setMessages] = useState<Array<SnapType>>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userpair, setUserpair] = useState<string | null>(
    localStorage.getItem("userpair") || "",
  );
  const [reversed, setReversed] = useState<string | null>(
    localStorage.getItem("reversed") || "",
  );

  const getMessages = useCallback(async (): Promise<SnapType[]> => {
    try {
      const messagedoc = collection(db, "messages");
      const querymessages = query(
        messagedoc,
        where("userpair", "in", [`${userpair}`, `${reversed}`]),
        orderBy("timestamp"),
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
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    creator: string,
    image: string | null | undefined,
    message: string,
    timestamp: FieldValue,
    userpair: string,
  ) => {
    e.preventDefault();
    try {
      const docref = collection(db, "messages");
      const displayDate: string = `${format(new Date(), "MMMM dd, yyyy pp")}`;
      await addDoc(docref, {
        creator,
        image,
        message,
        timestamp,
        userpair,
        displayDate,
        id: "",
      });
      setNewMessage("");
      getMessages().then(setMessages);
    } catch (err) {
      console.log(`Error in ChatContext in handleSubmit: ${err}`);
    }
  };

  const handleDelete = useCallback(async (id: string) => {
    try {
      const docref = doc(db, "messages", id);
      await deleteDoc(docref);
    } catch (err) {
      console.log(`Error in ChatContext in handleDelete(): ${err}`);
    }
  }, []);

  useEffect(() => {
    getMessages().then(setMessages);
  }, [getMessages]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        handleSubmit,
        newMessage,
        setNewMessage,
        setReversed,
        setUserpair,
        reversed,
        userpair,
        handleDelete,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
