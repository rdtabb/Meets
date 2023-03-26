import GeneralContext from "../../context/GeneralContext";
import { useContext } from "react";

type addpostprops = {
  setNewPostTitle: React.Dispatch<React.SetStateAction<string>>;
  setNewPostImage: React.Dispatch<React.SetStateAction<string>>;
  newPostImage: any;
  newPostTitle: any;
  handleNewPost: any;
};

const AddPost = ({
  setNewPostImage,
  setNewPostTitle,
  newPostImage,
  newPostTitle,
  handleNewPost
}: addpostprops) => {
  const { handleClose }: any = useContext(GeneralContext)

  return (
    <div data-visible="false" className="popup popup-add-post">
      <div className="popup__container">
        <form
          onSubmit={(e) => e.preventDefault()}
          name="popupForm"
          className="popup__form"
        >
          <h2 className="popup__header">Add new post</h2>
          <div className="popup__inputs">
            <input
              placeholder="Enter picture url"
              type="text"
              className="popup__input"
              value={newPostImage}
              onChange={(e) => setNewPostImage(e.target.value)}
            ></input>
            <input
              placeholder="Add post title"
              type="text"
              className="popup__input"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            ></input>
          </div>
          <button onClick={handleNewPost} type="submit" className="popup__submit">
            Save
          </button>
        </form>
        <button onClick={handleClose} type="button" className="popup__close"></button>
      </div>
    </div>
  );
};

export default AddPost;
