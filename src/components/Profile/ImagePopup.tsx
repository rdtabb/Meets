import GeneralContext from "../../context/GeneralContext"
import { useContext } from "react"

const ImagePopup = () => {
    const { handleClose }: any = useContext(GeneralContext)
    
    return (
        <div data-visible="false" className="popup popup--image">
            <div className="popup__container popup__container--image">
                <div className="popup--image__container">
                    <img src="" alt="" className="popup__image" />
                    <p className="popup__caption"></p>
                </div>
                <button onClick={handleClose} type="button" className="popup__close popup__close--image"></button>
            </div>
        </div>
    )
}

export default ImagePopup
