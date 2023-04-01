import { createContext, ReactElement, useState } from "react";
import { cookies } from "../App";
import { doc } from "firebase/firestore";
import { db } from "../firebase-config";

export type GeneralContextType = {
    openImagePopup: (imgsrc: string, city: string) => void,
    handleClose: () => void,
    handleAddPostButton: () => void,
    isAuth: any,
    setIsAuth: React.Dispatch<any>,
    handlePopup: () => void
}

const initstate = {
    openImagePopup: () => {},
    handleClose: () => {},
    handleAddPostButton: () => {},
    setIsAuth: () => {},
    handlePopup: () => {},
    isAuth: false
}

export type newPostsType = {
    city: string,
    id: number,
    imgsrc: string,
    liked: boolean,
    comments: CommentType[]
}

export type CommentType = {
    creator: string,
    message: string,
    createdAt: string,
    id: number,
    img: string
}

const GeneralContext = createContext<GeneralContextType>(initstate)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const uid = localStorage.getItem("uid")!;

export const GeneralProvider = ({ children }: ChildrenType): ReactElement => {
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [comments, setComments] = useState<CommentType[]>([])

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

    const handlePopup = () => {
        const popup = document.querySelector(".popup");
        const visibility = popup?.getAttribute("data-visible");
        if (visibility == "false") {
            popup?.classList.add("popup_opened");
            popup?.setAttribute("data-visible", "true");
        } else {
            popup?.classList.remove("popup_opened");
            popup?.setAttribute("data-visible", "false");
        }
    };

    const handleComment = (creator: string, createdAt: string, message: string, img: string) => {
        const userdoc = doc(db, "users", uid)

        const id: number = 5
        const newComment: CommentType = {
            creator,
            message,
            createdAt,
            id,
            img
        }
    }

    return (
        <GeneralContext.Provider value={{ openImagePopup, handleAddPostButton, handleClose, isAuth, setIsAuth, handlePopup }}>
            {children}
        </GeneralContext.Provider>
    )
}

export default GeneralContext    