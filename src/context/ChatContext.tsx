import { createContext, ReactElement, useState, useCallback, useEffect } from "react";
import { db } from "../firebase-config";
import { getDoc, doc, updateDoc, FieldValue, addDoc, setDoc } from "firebase/firestore";
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
            const messagedoc: DocumentReference<DocumentData> = doc(db, "messages", "kMbtyrwvoMN1IKsxqpNX")
            const dataSnap: DocumentSnapshot<DocumentData> = await getDoc(messagedoc)
            const dataset: DocumentData | undefined = dataSnap.data()
            return dataset
        } catch (err) {
            console.log(`error in the ChatContext: ${err}`)
        }
    }, [])

    useEffect(() => {
        getMessages().then(setMessages)
    }, [getMessages])

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
            const docref: any = doc(db, "messages", "kMbtyrwvoMN1IKsxqpNX")
            const newMessage = {
                creator,
                image,
                message,
                timestamp,
                userpair
            }
            await setDoc(docref, {
                newmessage: newMessage
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