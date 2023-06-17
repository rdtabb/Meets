const Signout = () => {
  const openConfirm = () => {
    document.querySelector('.popup--confirm')?.classList.add('popup_opened')
    document.querySelector('.popup--confirm')?.setAttribute('data-visible', 'true')
  }  

  return (
    <button onClick={openConfirm} className="signout">
      Sign Out
    </button>
  );
};

export default Signout;
