import app  from "@/firebase/firebase-config";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signOut } from "firebase/auth";


const auth = getAuth(app);
await signOut(auth);

export const signupWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await sendEmailVerification(userCredential.user);

        alert("新規登録を行いました");
        return userCredential.user;
    } catch (error) {
        alert("登録に失敗しました");
    }
};

export const signinWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await sendEmailVerification(userCredential.user);

        alert("ログインしました");
        return userCredential.user;
    } catch (error) {
        alert("ログインに失敗しました");
    }
};

export const logOut = async () => {
    try {
        alert("ログアウトしました");
    } catch (error) {
        alert("ログアウトに失敗しました");
    }
};