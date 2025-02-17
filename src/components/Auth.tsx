"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { signupWithEmailAndPassword, signinWithEmailAndPassword } from '@/firebase/auth';
import "./auth.css";

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true); 
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    // サインイン・ログインの切替
    const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        if (!email || !password) {
            alert("Emailとpasswordを入力してください");
            return;
        }
        try {
            let user = null;
            if (isSignUp) {    
                user = await signupWithEmailAndPassword(email, password);
            } else {
                user = await signinWithEmailAndPassword(email, password);
            }
            if (!user) {
                throw new Error("認証エラー");
            }
            router.push("/");
        } catch (error) {
            console.error("認証エラー:", error);
            setErrorMessage("認証に失敗しました。もう一度試してください");
        }
    };

    return (
        <div id="auth-container">
            {/*header*/}
            <header>
                <div className="header-container">
                    <img className="header-icon" src="https://www.kaigo-antenna.jp/uploads/illustration/main_image/1615/webp_202211_015_s.webp" alt="logo" />
                    <div className="header-logo">
                        <h1>とど管理</h1>
                        <p>今日のやるべきことを確認しよう！</p>
                    </div>  
                </div>  
            </header>

            {/*main*/}
            <main className="auth-main">
                <div className="auth-box">
                    <h1 className="auth-title">{isSignUp ? "新規登録" : "ログイン"}</h1>
                    {errorMessage && <p className="auth-error">{errorMessage}</p>}
                    <form onSubmit={handleAuth}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="auth-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="auth-input"
                        />
                        <button type="submit" className="auth-button">
                            {isSignUp ? "新規登録" : "ログイン"}
                        </button>
                    </form>
                    <div className="auth-toggle">
                        <button onClick={() => setIsSignUp(!isSignUp)} className="auth-link">
                            {isSignUp ? "すでに登録済みの方はこちら" : "新規登録はこちら"}
                        </button>
                    </div>
                </div>
            </main>

            {/*footer*/}
            <footer>
                <div className="footer-logo">とど管理</div>
                <h2>今日のやるべきことを確認しよう！</h2>
            </footer>
        </div>
    );
}
