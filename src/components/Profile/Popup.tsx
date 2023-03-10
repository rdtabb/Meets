import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

const Popup = () => {
  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleSubmit = async () => {
    const popup = document.querySelector(".popup");
    popup?.classList.remove("popup_opened");
    popup?.setAttribute("data-visible", "false");
    if (newName == "" && newStatus == "") {
      return;
    }
    setNewName("");
    setNewStatus("");

    const uid: any = localStorage.getItem("uid")
    const newstatusdb = {
      name: newName,
      newStatus: newStatus
    }
    const userdoc = doc(db, "users", uid)
    await updateDoc(userdoc, newstatusdb)
  };

  return (
    <div data-visible="false" className="popup">
      <div className="popup__container">
        <form
          onSubmit={(e) => e.preventDefault()}
          name="popupForm"
          className="popup__form"
        >
          <h2 className="popup__header">Edit your profile</h2>
          <div className="popup__inputs">
            <input
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter name"
              name="name-input"
              value={newName}
              type="text"
              className="popup__input popup__input--name"
            ></input>
            <input
              onChange={(e) => setNewStatus(e.target.value)}
              placeholder="Edit status"
              name="status-input"
              value={newStatus}
              type="text"
              className="popup__input popup__input--description"
            ></input>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="popup__submit"
          >
            Save
          </button>
        </form>
        <button type="button" className="popup__close"></button>
      </div>
    </div>
  );
};

export default Popup;
