import GeneralContext from "../../context/GeneralContext";
import { useContext, useState } from "react"
import { Params } from "react-router-dom";

type PropsType = {
    id: string | undefined
}

const Auserpopup = ({id}: PropsType) => {
    const { handleClose, handleComment, comments, cuid } = useContext(GeneralContext)
    const [currAMessage, setCurrAMessage] = useState<string>("")
    
    return (
        <div data-visible="false" className="popup popup--image">
            <div className="popup__container popup__container--image">
                <div className="popup--image__container">
                    <img src="" alt="" className="popup__image" />
                    <div className="textarea">
                        <p className="popup__caption"></p>
                        <ul className="comments">
                            {comments.map((comment) => (
                                <li key={comment.id} className="comment">
                                    <img className="comment__icon" src={comment.img} alt="" />
                                    <article>
                                        <div className="comment__info">
                                            <p className="comment__creator">{comment.creator}</p>
                                            <p className="comment__date">{comment.createdAt}</p>
                                        </div>
                                        <p className="comment__message">{comment.message}</p>
                                    </article>
                                </li>
                            ))}
                        </ul>
                        <form onSubmit={(e) => handleComment(e, currAMessage, id, setCurrAMessage)}>
                            <input 
                                value={currAMessage} 
                                onChange={(e) => setCurrAMessage(e.target.value)} 
                                placeholder="Leave your comment..." 
                                type="text" 
                                className="popup__comment" 
                            />
                        </form>
                    </div>
                </div>
                <button onClick={handleClose} type="button" className="popup__close popup__close--image"></button>
            </div>
        </div>
    )
}

export default Auserpopup