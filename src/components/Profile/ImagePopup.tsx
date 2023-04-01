import GeneralContext from "../../context/GeneralContext"
import { useContext, useState } from "react"

const ImagePopup = () => {
    const { handleClose, handleComment } = useContext(GeneralContext)
    const [currMessage, setCurrMessage] = useState<string>("")
    
    return (
        <div data-visible="false" className="popup popup--image">
            <div className="popup__container popup__container--image">
                <div className="popup--image__container">
                    <img src="" alt="" className="popup__image" />
                    <div className="textarea">
                        <p className="popup__caption"></p>
                        <form onSubmit={(e) => handleComment(e, currMessage)}>
                            <input 
                                value={currMessage} 
                                onChange={(e) => setCurrMessage(e.target.value)} 
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

export default ImagePopup
