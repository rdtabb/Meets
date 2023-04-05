import GeneralContext from "../../context/GeneralContext"
import { useContext } from "react"

const IconPopup = () => {
    const { handleClose, handleProfileIcon, icon, setIcon } = useContext(GeneralContext)

    return (
        <div data-visible="false" className="popup popup--icon">
            <div className="popup__container">
                <form
                onSubmit={(e) => e.preventDefault()}
                name="popupForm"
                className="popup__form"
                >
                <h2 className="popup__header">Edit your profile icon</h2>
                <div className="popup__inputs">
                    <input
                        placeholder="Enter icon url"
                        type="text"
                        className="popup__input"
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                    ></input>
                </div>
                <button onClick={handleProfileIcon} type="submit" className="popup__submit">
                    Save
                </button>
                </form>
                <button onClick={handleClose} type="button" className="popup__close"></button>
            </div>
        </div>
    )
}

export default IconPopup
