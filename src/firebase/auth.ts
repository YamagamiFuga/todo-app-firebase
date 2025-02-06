import app  from "@/firebase/firebase-config";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const auth = getAuth(app);

export const signupWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("新規登録を行いました");
        return userCredential.user;
    } catch (error) {
        alert("登録に失敗しました");
    }
};

export const signinWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("ログインしました");
        return userCredential.user;
    } catch (error) {
        alert("ログインに失敗しました");
    }
};

export const logOut = async () => {
    try {
        await signOut(auth);
        alert("ログアウトしました");
    } catch (error) {
        alert("ログアウトに失敗しました");
    }
};