import type { SnapType } from "../../../../types/Types";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type MessageProps = {
  messages: SnapType[] | undefined;
};

const Message = ({ messages }: MessageProps) => {
  const queryClient = useQueryClient();
  const handleDelete = async (id: string) => {
    const docref = doc(db, "messages", id);
    await deleteDoc(docref);
  };

  const deleteMessage = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  return (
    <>
      {messages?.length ? (
        messages.map((mes) => (
          <li key={mes.id} className="item">
            <div className="item__wrapper">
              <img src={mes.image} alt="" className="item__icon" />
              <article className="item__info-wrapper">
                <div className="item__row-one">
                  <p className="item__creator">{mes.creator}</p>
                  <p className="item__time">{mes.displayDate}</p>
                </div>
                <p className="item__message">{mes.message}</p>
              </article>
            </div>
            <button
              onClick={() => deleteMessage.mutate(mes.id)}
              className="item__delete"
            ></button>
          </li>
        ))
      ) : (
        <p className="chat__empty">You have no messages with that user!</p>
      )}
    </>
  );
};

export default Message;
