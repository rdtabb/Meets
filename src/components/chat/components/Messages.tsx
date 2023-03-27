import ErrorBoundary from "../../error/ErrorBoundary"
import { useContext } from "react"
import { ChatContext } from "../../../context/ChatContext"

const Messages = () => {
  const { messages, handleDelete }: any = useContext(ChatContext)

  return (
    <ErrorBoundary>
      <ul className="chat__meslist">
        {messages.length ? (
          messages.map((mes: any) => (
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
              <button className="item__delete" onClick={() => handleDelete(mes.id)}></button>
            </li>
          ))
        ) : (
          <p className="chat__empty">You have no messages with that user!</p>
        )}
        
      </ul>
    </ErrorBoundary>
  )
}

export default Messages
