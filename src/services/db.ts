
import { addDoc, collection, getDoc, getDocs, doc, setDoc, updateDoc } from "firebase/firestore"
import {db} from "../../firebase/firebaseConfig"
import { Item } from "../models/Item"
import { User } from "../models/User"

const listRef = collection(db, "List")

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
        throw error;
    }
}

export const getListFromDb = async () => {
    try {
        const querySnapshot = await getDocs(listRef);
        const allLists = querySnapshot.docs.map(doc => doc.data());
        return allLists
    } catch(error) {
        console.error("Error getting lists:", error)
        throw error;
    }
}

export const addUserToDb = async (userName: string, name: string, userId: string, createdAt: Date) => {
    try {
        const usersRef = doc(db, "User", userId)
        await setDoc(usersRef, {
            id: userId,
            email: userName,
            birth: new Date(),
            blCompleted: 0,
            blCreated: 0,
            itemsCompleted: 0,
            name: name,
            regDate: createdAt
        })
    } catch(error) {
        console.error("Error adding list: ", error)
        throw error;
    }
}

export const getUserFromDb = async (uId: string) => {
    const userRef = doc(db, "User", uId);

    try {
        const docSnap = await getDoc(userRef);

        return docSnap.exists() ? docSnap.data() : null
    } catch (error) {
        console.error("Error loading user: ", error);
        throw error;
    }
};

export const updateUserInDb = async (user: User) => {
    const userRef = doc(db, "User", user.id);
    try {
        await updateDoc(userRef, {
            id: user.id,
            email: user.email,
            birth: user.birth,
            blCompleted: user.blCompleted,
            blCreated: user.blCreated,
            itemsCompleted: user.itemsCompleted,
            name: user.name,
            regDate: user.regDate
        })
    } catch(error) {
        console.error("Error updating user: ", error);
        throw error;
    }
}