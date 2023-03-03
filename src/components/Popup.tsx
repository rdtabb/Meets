import { useRef } from "react";

type popupProps = {
    username: any;
    setUsername: any;
    setStatus: any
    status: string
};

const Popup = ({setUsername, username, setStatus, status}: popupProps) => {
  return (
    <div data-visible="false" className="popup">
        <div className="popup__container">
            <form name="popupForm" className="popup__form">
                <h2 className="popup__header">Edit your profile</h2>
                <div className="popup__inputs">
                    <input placeholder="Enter name" required name="name" value={username} type="text" className="popup__input popup__input_type_name"></input>
                    <input placeholder="Edit status" required name="status" value={status} type="text" className="popup__input popup__input_type_description"></input>
                </div>
                <button type="submit" className="popup__submit">Save</button>
            </form>
            <button type="button" className="popup__close"></button>
        </div>
    </div>
  )
}

export default Popup
