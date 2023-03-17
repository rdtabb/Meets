import { createContext, ReactElement, useState, useCallback, useEffect } from "react";
import { db } from "../firebase-config";
import { addDoc, collection, getDocs, onSnapshot, query, where, getDoc } from "firebase/firestore";

export const ChatContext = createContext({})

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const ChatProvider = ({children}: ChildrenType) => {
    const [messages, setMessages] = useState<any>([])
    const [newMessage, setNewMessage] = useState("")
    const [userpair, setUserpair] = useState<string | null>(localStorage.getItem("userpair") || "")
    const [reversed, setReversed] = useState<string | null>(localStorage.getItem("reversed") || "")

    const getMessages = useCallback(async () => {
            try {
                const messagedoc: any = collection(db, "messages")
                const querymessages: any = query(messagedoc, where("userpair", "in", [`${userpair}`, `${reversed}`]))
                const snaps: any = await getDocs(querymessages)
                let messagesarr: any = []
                snaps.forEach((snap: any) => {
                    messagesarr.push(snap.data())
                })
                return messagesarr
            } catch (err) {
                console.error(`Error in ChatContext in getMessages(): ${err}`)
            }
    }, [])

    useEffect(() => {
        getMessages().then(setMessages)
    }, [getMessages])

    const randomId: number = Math.floor((Math.random() * 100000000) + (Math.random() * 1000) + (Math.random() * 1000))

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
            setNewMessage("")
            getMessages().then(setMessages)
        } catch(err) {
            console.log(`Error in ChatContext in handleSubmit: ${err}`)
        }
    }

    return (
        <ChatContext.Provider value={{messages, handleSubmit, newMessage, setNewMessage, setReversed, setUserpair, reversed, userpair}}>
            {children}
        </ChatContext.Provider>
    )
}