import { DocumentReference, DocumentData, setDoc } from 'firebase/firestore'

interface CreateUserConfig {
    name: string | null
    imgurl: string | null
    document: DocumentReference<DocumentData>
    userId: string
}

export const createUser = async ({
    name,
    imgurl,
    document,
    userId
}: CreateUserConfig): Promise<void> => {
    await setDoc(document, {
        name,
        imgurl,
        id: userId,
        newPosts: [],
        liked: [],
        newStatus: 'no status yet :('
    })
}
