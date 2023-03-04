import { useRef, useEffect, useState } from "react";

type popupProps = {
  username: string;
  setUsername: any;
  setStatus: any;
  status: string;
};

const Popup = ({ setUsername, username, setStatus, status }: popupProps) => {
  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleSubmit = () => {
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
