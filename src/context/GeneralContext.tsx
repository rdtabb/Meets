import { createContext, ReactElement } from "react";

export type GeneralContextType = {
    openImagePopup: (imgsrc: string, city: string) => void,
    handleClose: () => void,
    handleAddPostButton: () => void
}

const GeneralContext = createContext<GeneralContextType>({
    openImagePopup: () => {},
    handleClose: () => {},
    handleAddPostButton: () => {}
})

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const GeneralProvider = ({ children }: ChildrenType): ReactElement => {
    const openImagePopup = (imgsrc: string, city: string) => {
        const popupImageCont = document.querySelector('.popup--image')
            popupImageCont?.setAttribute('data-visible', 'true')
            popupImageCont?.classList.add('popup_opened')
        const popupImage = document.querySelector('.popup__image')
            popupImage?.setAttribute('src', `${imgsrc}`)
            popupImage?.setAttribute('alt', `${city}`)
        const caption: Element = document.querySelector('.popup__caption')!
            caption.innerHTML = `${city}`
    }

    const handleClose = () => {
        const popups = document.querySelectorAll(".popup");
        popups.forEach((popup) => {
            popup?.setAttribute("data-visible", "false");
            setTimeout(() => {
            popup?.classList.remove("popup_opened");
            }, 200)
        });
    }

    const handleAddPostButton = () => {
        const addPost = document.querySelector(".popup-add-post");
        addPost?.classList.add("popup_opened");
        addPost?.setAttribute("data-visible", "true");
    }

    return (
        <GeneralContext.Provider value={{ openImagePopup, handleAddPostButton, handleClose }}>
            {children}
        </GeneralContext.Provider>
    )
}

export default GeneralContext    