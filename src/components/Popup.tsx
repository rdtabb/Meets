import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

type popupProps = {
  username: string;
  setUsername: any;
  setStatus: any;
  status: string;
};

const Popup = ({ setUsername, setStatus }: popupProps) => {
  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleSubmit = async () => {
    const popup = document.querySelector(".popup");
    popup?.classList.remove("popup_opened");
    popup?.setAttribute("data-visible", "false");
    if (newName == "" && newStatus == "") {
      return;
    }
    setStatus(newStatus);
    setUsername(newName);
    localStorage.setItem("username", `${newName}`)
    localStorage.setItem("status", `${newStatus}`)
    setNewName("");
    setNewStatus("");

    const newstatusdb = {
      newStatus: newStatus
    }
    const userdoc = doc(db, "users", "xZGOnuUFGdDETxFc68uu")
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
              required
              value={newName}
              type="text"
              className="popup__input popup__input--name"
            ></input>
            <input
              onChange={(e) => setNewStatus(e.target.value)}
              placeholder="Edit status"
              required
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
