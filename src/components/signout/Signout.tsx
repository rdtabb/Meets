import { useDispatch } from "react-redux";
import { setOpenPopupType } from "../../features/modal/modalSlice";

const Signout = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(setOpenPopupType("confirm"))}
      className="signout"
    >
      Sign Out
    </button>
  );
};

export default Signout;
