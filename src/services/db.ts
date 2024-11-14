
import { addDoc, collection, getDocs } from "firebase/firestore"
import {db} from "../../firebase/firebaseConfig"
import { Item } from "../models/Item"


const userRef = collection(db, "User")
const listRef = collection(db, "List")
const itemRef = collection(db, "Item")

export const addListToDb = async (listName: string, listId: number, listItems: Item[]) => {
    try{
        await addDoc(listRef, {
            id: listId,
            name: listName,
            isDone: false,
            items: listItems    
        })
    } catch (error) {
        console.error("Error adding list:", error)
    }
}

export const getListFromDb = async () => {
    try {
        const querySnapshot = await getDocs(listRef);
        const allLists = querySnapshot.docs.map(doc => doc.data());
        return allLists
    } catch(error) {
        console.error("Error getting lists:", error)
    }
}