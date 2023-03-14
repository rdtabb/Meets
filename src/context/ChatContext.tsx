import { createContext, ReactElement, useState, useCallback, useEffect } from "react";
import { db } from "../firebase-config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { DocumentReference, DocumentData, DocumentSnapshot } from "firebase/firestore";

export const ChatContext = createContext({})

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const ChatProvider = ({children}: ChildrenType) => {
    const [messages, setMessages] = useState<any>([])

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
        creator: string,
        image: string,
        message: string,
        timestamp: string,
        userpair: string,
    }

    const handleSubmit = async ({creator, image, message, timestamp, userpair}: SubmitProps) => {
        const docref = doc(db, "messages", "kMbtyrwvoMN1IKsxqpNX")
        const newMessage = {
            creator,
            image,
            message,
            timestamp,
            userpair
        }
        await updateDoc(docref, {
            message: newMessage
        })
    }

    return (
        <ChatContext.Provider value={{messages, handleSubmit}}>
            {children}
        </ChatContext.Provider>
    )
}