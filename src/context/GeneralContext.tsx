import { createContext, ReactElement } from "react";

const GeneralContext = createContext({})

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
            caption.innerHTML = city
    }

    return (
        <GeneralContext.Provider value={{ openImagePopup }}>
            {children}
        </GeneralContext.Provider>
    )
}

export default GeneralContext