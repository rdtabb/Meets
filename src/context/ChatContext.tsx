import { createContext, ReactElement, useState, useCallback, useEffect } from "react";
import { db } from "../firebase-config";
import { getDoc, doc, updateDoc, FieldValue, addDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { DocumentReference, DocumentData, DocumentSnapshot } from "firebase/firestore";

export const ChatContext = createContext({})

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const ChatProvider = ({children}: ChildrenType) => {
    const [messages, setMessages] = useState<any>([])
    const [newMessage, setNewMessage] = useState("")

    const getMessages = useCallback(async () => {
        try {
            const messagedoc: any = collection(db, "messages")
            const dataSnap: any = await getDocs(messagedoc)
            const dataset = dataSnap.docs.map((doc: any) => ({ ...doc.data() }))
            return dataset.reverse()
        } catch (err) {
            console.log(`error in the ChatContext: ${err}`)
        }
    }, [])

    useEffect(() => {
        getMessages().then(setMessages)
    }, [getMessages])

    const randomId: number = Math.floor((Math.random() * 100000000) + 1)

    type SubmitProps = {
        e: SubmitEvent
        creator: string,
        image: string | null | undefined,
        message: string,
        timestamp: FieldValue,
        userpair: string,
    }

    const handleSubmit = async (e: any, creator: any, image: any, message: any, timestamp: any, userpair: any) => {
        e.preventDefault()
        try {
            const docref: any = collection(db, "messages")
            await addDoc(docref, {
                creator,
                image,
                message,
                timestamp,
                userpair,
                randomId
            })
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <ChatContext.Provider value={{messages, handleSubmit, newMessage, setNewMessage}}>
            {children}
        </ChatContext.Provider>
    )
}