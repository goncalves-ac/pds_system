import {db} from '../firebase-config'
import {
    collection,
    getDocs,
    getDoc,
    doc,
} from 'firebase/firestore'

export async function getCollectionData(collection_id: string) {
    const collectionReference = collection(db, collection_id)
    const docSnap = await getDocs(collectionReference)
    const data = docSnap.docs.map(
        (doc) => (
            { ...doc.data(), id: doc.id }
        )
    )
    return data
}

export async function getDocumentData(collection_id:string, document_id: string) {
    const docReference = doc(db, collection_id, document_id)
    const docSnap = await getDoc(docReference)

    if (docSnap.exists()) {
        return docSnap.data
    } else {
        console.log('No such document!')
    }
}
