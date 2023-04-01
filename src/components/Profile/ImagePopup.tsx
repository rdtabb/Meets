import GeneralContext from "../../context/GeneralContext"
import { useContext } from "react"

const ImagePopup = () => {
    const { handleClose } = useContext(GeneralContext)
    
    return (
        <div data-visible="false" className="popup popup--image">
            <div className="popup__container popup__container--image">
                <div className="popup--image__container">
                    <img src="" alt="" className="popup__image" />
                    <div className="textarea">
                        <p className="popup__caption"></p>
                        <input placeholder="Leave your comment..." type="text" className="popup__comment" />
                    </div>
                </div>
                <button onClick={handleClose} type="button" className="popup__close popup__close--image"></button>
            </div>
        </div>
    )
}

export default ImagePopup
