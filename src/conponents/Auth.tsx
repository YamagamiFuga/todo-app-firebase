//サインインサインアップ
"use client";

import { useState } from 'react';
import { signupWithEmailAndPassword, signinWithEmailAndPassword } from '@/firebase/auth';

export default function auth() {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const signup = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = await signupWithEmailAndPassword(email, password);
    };

    const signin = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = await signinWithEmailAndPassword(email, password);
    };
    return (
        <div>
            <h1 className='mb-5 text-20 font-bold text-center'>ようこそ！</h1>
        </div>
    )
}