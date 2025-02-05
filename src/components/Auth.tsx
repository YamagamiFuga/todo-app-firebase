//サインインサインアップの
"use client";

import { useState } from 'react';
import { signupWithEmailAndPassword, signinWithEmailAndPassword } from '@/firebase/auth';


export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true); //isSignUp => true/false

    //サインイン、ログインの切替
    const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSignUp) {    //true,falseの変更
            await signupWithEmailAndPassword(email, password);
        } else {
            await signinWithEmailAndPassword(email, password);
        }
    };

    return (
        <div>
            <header className="w-full bg-cyan-200 text-black py-4 shadow-md">
            <div className="max-w-4xl mx-auto flex justify-between items-center px-6">
            <h1 className="text-2xl font-bold">とど管理</h1>
            </div>
            </header>
            <div className='flex fle-col items-center justify-center min-h-screen bg-cyan-400 text-black'>
                <div className='w-full max-w-sm p-6 bg-white rounded-md shadow-md'>
                    <h1 className='mb-5 text-2xl font-bold text-center'>
                        {isSignUp ? "新規会員登録" : "ログイン"}
                    </h1>
                    <form onSubmit={handleAuth}>
                        <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
                        />
                        <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
                        />
                        <button
                        type="submit"
                        className="w-full px-4 py-2 mb-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            {isSignUp ? "新規登録" : "ログイン"}
                        </button>
                    </form>
                    <div className="flex justify-start mt-4">
                        <button
                        className="text-blue-500 hover:underline text-sm"
                        onClick={() => setIsSignUp(!isSignUp)}  //ボタンクリックでisSignUpの切替
                        >
                            {isSignUp ? "すでに登録済みの方はこちら" : "新規登録はこちら"}
                        </button>
                    </div>
                </div>
            </div>
        </div>    
        );
}