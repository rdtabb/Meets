import { createContext, ReactElement, useState } from "react";
import { cookies } from "../App";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import format from "date-fns/format";
import { HandleNewPostData } from "../App";

export type GeneralContextType = {
    openImagePopup: (imgsrc: string, city: string, id: number, comments: CommentType[]) => void,
    handleClose: () => void,
    handleAddPostButton: () => void,
    isAuth: any,
    setIsAuth: React.Dispatch<any>,
    handlePopup: () => void,
    handleIconPopup: (e: any) => void,
    postId: number,
    handleComment: (e: any, message: string, uid: any, setCurrMessage: React.Dispatch<React.SetStateAction<string>>) => Promise<void>,
    comments: CommentType[],
    cuid: any,
    handleProfileIcon: (variables: HandleProfileIconType) => Promise<void>,
    handleNewPost: (variables: HandleNewPostData) => Promise<void>
}

const initstate = {
    openImagePopup: () => {},
    handleClose: () => {},
    handleAddPostButton: () => {},
    setIsAuth: () => {},
    handlePopup: () => {},
    isAuth: false,
    postId: 0,
    handleComment: async () => {},
    comments: [],
    cuid: "",
    handleProfileIcon: async () => {},
    handleNewPost: async () => {},
    handleIconPopup: () => {}
}

export type newPostsType = {
    city: string,
    id: number,
    imgsrc: string,
    liked: boolean,
    comments: CommentType[]
}

export type UserLikedType = {
    city: string,
    creator: string,
    id: number, 
    imgsrc: string
}

export type CommentType = {
    creator: string,
    message: string,
    createdAt: string,
    id: number,
    img: string
}

export type UserDocType = {
    id: string,
    imgurl: string,
    liked: UserLikedType[],
    name: string,
    newPosts: newPostsType[],
    newStatus: string
}

const GeneralContext = createContext<GeneralContextType>(initstate)

type HandleProfileIconType = {
    url: string
}

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const GeneralProvider = ({ children }: ChildrenType): ReactElement => {
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [postId, setPostId] = useState<number>(0)
    const [comments, setComments] = useState<CommentType[]>([])
    const cuid: any = localStorage.getItem("uid");

    const getUserDataset = async (id: string) => {
        const userdoc = doc(db, "users", id)
        const dataSnap = await getDoc(userdoc)
        const dataset: any = dataSnap.data()
        const name = await dataset.name
        return name
    }

    const handleProfileIcon = async (variables: HandleProfileIconType) => {
        const userdoc = doc(db, "users", cuid);
        const updatedImage = {
            imgurl: variables.url
        }
        await updateDoc(userdoc, updatedImage)
    }

    const handleComment = async (e: any, message: string, uid: any, setCurrMessage: React.Dispatch<React.SetStateAction<string>>) => {
        e.preventDefault()
        const userdoc = doc(db, "users", uid);
        const dataSnap = await getDoc(userdoc);
        const dataset: any = dataSnap.data();
        const posts: newPostsType[] = await dataset.newPosts
        const creator: any = await getUserDataset(cuid)

        const img: any = auth.currentUser?.photoURL
        const createdAt: string = `${format(new Date(), 'MMMM dd, yyyy pp')}`

        const post = posts.find(postf => 
            postf.id == postId
        )!
        const comments: CommentType[] = post?.comments

        const id: number = comments.length ? comments[comments.length - 1].id + 1 : 1
        const newcomment: CommentType = {
            creator,
            message, 
            createdAt, 
            id,
            img
        }
        const newComments = [...comments, newcomment]
        setComments(newComments)
        setCurrMessage("")

        const updatedPosts = posts.map((post) => (
            post.id == postId ? {...post, comments: newComments} : post
        ))
        const newpostsdb = {
            newPosts: updatedPosts
        }
        await updateDoc(userdoc, newpostsdb);
    }

    const openImagePopup = (imgsrc: string, city: string, id: number, comments: CommentType[]) => {
        const popupImageCont = document.querySelector('.popup--image')
            popupImageCont?.setAttribute('data-visible', 'true')
            popupImageCont?.classList.add('popup_opened')
        const popupImage = document.querySelector('.popup__image')
            popupImage?.setAttribute('src', `${imgsrc}`)
            popupImage?.setAttribute('alt', `${city}`)
        const caption: Element = document.querySelector('.popup__caption')!
            caption.innerHTML = `${city}`
        setPostId(id)
        setComments(comments)
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

    const handleIconPopup = (e: any) => {
        const popup = document.querySelector(".popup--icon");
        const visibility = popup?.getAttribute("data-visible");
        if (visibility == "false") {
            popup?.classList.add("popup_opened");
            popup?.setAttribute("data-visible", "true");
        } else {
            popup?.classList.remove("popup_opened");
            popup?.setAttribute("data-visible", "false");
        }
    }

    
    const handleNewPost = async (variables: HandleNewPostData) => {
        const uid = localStorage.getItem("uid")!
        const usedoc = doc(db, "users", uid);
        const dataSnap = await getDoc(usedoc);
        const dataset = dataSnap.data();
        const nposts = await dataset?.newPosts;
    
        const id = nposts.length ? nposts[0].id + 1 : 1;
        const newPost = {
          city: variables.place,
          id,
          imgsrc: variables.url,
          liked: false,
          comments: []
        };
        const newPosts = [newPost, ...nposts];
    
        const addPostPopup = document.querySelector(".popup-add-post");
        addPostPopup?.setAttribute("data-visible", "false");
        addPostPopup?.classList.remove("popup_opened");
    
        const newpostsdb = {
          newPosts: newPosts,
        };
        const userdoc = doc(db, "users", uid);
        await updateDoc(userdoc, newpostsdb);
      };

    return (
        <GeneralContext.Provider value={{ 
            handleProfileIcon, 
            cuid, 
            handleComment, 
            openImagePopup, 
            handleAddPostButton, 
            handleClose, 
            isAuth, 
            setIsAuth, 
            handlePopup, 
            postId, 
            comments,
            handleIconPopup,
            handleNewPost,
        }}>
            {children}
        </GeneralContext.Provider>
    )
}

export default GeneralContext    