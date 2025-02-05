import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDy-2L4Er_rTKCDKCz5suKqornLKTqYxt4",
    authDomain: "todo-app-6fabb.firebaseapp.com",
    projectId: "todo-app-6fabb",
    storageBucket: "todo-app-6fabb.firebasestorage.app",
    messagingSenderId: "789579566738",
    appId: "1:789579566738:web:642807fd61784a0592204b",
    measurementId: "G-LLHG64GKTW"
};

const app = initializeApp(firebaseConfig);

export default app;
