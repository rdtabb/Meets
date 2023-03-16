import { createContext, ReactElement, useState, useCallback, useEffect } from "react";
import { db } from "../firebase-config";
import { FieldValue, addDoc, collection, getDocs, onSnapshot, query, where, getDoc } from "firebase/firestore";

export const ChatContext = createContext({})

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const ChatProvider = ({children}: ChildrenType) => {
    const [messages, setMessages] = useState<any>([])
    const [newMessage, setNewMessage] = useState("")
    const [userpair, setUserpair] = useState<string>("")
    const [reversed, setReversed] = useState<string>("")

    // const getMessages = useCallback(async () => {
    //     try {
    //         const messagedoc: any = collection(db, "messages")
    //         const dataSnap: any = await getDocs(messagedoc)
    //         const dataset = dataSnap.docs.map((doc: any) => ({ ...doc.data() }))
    //         return dataset
    //     } catch (err) {
    //         console.log(`error in the ChatContext in getMessages(): ${err}`)
    //     }
    // }, [])

    const getMessages = useCallback(async () => {
            try {
                const messagedoc: any = collection(db, "messages")
                const querymessages: any = query(messagedoc, where("userpair", "in", [`Green Tea-Rinat Tabaev`, `Rinat Tabaev-Green Tea`]))
                const snaps: any = await getDocs(querymessages)
                let messagesarr: any = []
                snaps.forEach((snap: any) => {
                    messagesarr.push(snap.data())
                })
                return messagesarr
            } catch (err) {
                console.error(err)
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