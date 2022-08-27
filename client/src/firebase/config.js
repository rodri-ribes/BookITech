// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid';

// Your web app's Firebase configuration
const firebaseConfig = {
    //ACA VAN LOS DATOS DE FIREBASE
    apiKey: "AIzaSyCueqjsQlOMCj3_nChcxdAHtIZe1KF0CDA", 
    authDomain: "pf-books-58155.firebaseapp.com", 
    projectId: "pf-books-58155", 
    storageBucket: "pf-books-58155.appspot.com", 
    messagingSenderId: "223624109594", 
    appId: "1:223624109594:web:c36a0145fa768047947ba3" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)

export async function uploadFile(file) {
    let name = v4();
    const storageRef = ref(storage, name)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef);

    return [name, url];
}

export async function deleteFile(name) {
    const storageRef = ref(storage, name)
    await deleteObject(storageRef)
}