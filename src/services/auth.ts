import {auth} from "../../firebase/firebaseConfig"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { addUserToDb } from "./db";

export const signIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in successfully");
    if(user.email === email) return user
    } catch(error) {
        console.error("Error signing in:", error);
    throw new Error("Failed to sign in. Please check your credentials.");
    }
}

export const RegisterUser = async (email: string, password: string, name: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user.email && user.uid && user.metadata.creationTime){
            const createdAt = new Date(user.metadata.creationTime)
            await addUserToDb(user.email, name, user.uid, createdAt)
            console.log("user created:")
            return user.email
        }
        throw new Error("User registration failed. Missing user details.");
    }catch(error) {
        console.error("Error creating user: ", error);
        throw error;
    }
}

export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully")
    } catch (error) {
        console.error("Error trying to sign out user", error);
        throw error;
    }
}