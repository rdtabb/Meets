const ImagePopup = () => {
    return (
        <div data-visible="false" className="popup popup--image">
            <div className="popup__container popup__container--image">
                <img src="" alt="" className="popup__image" />
                <p className="popup__caption"></p>
                <button type="button" className="popup__close"></button>
            </div>
        </div>
    )
}

export default ImagePopup
