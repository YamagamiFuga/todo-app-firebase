"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export const authcheck = () => {
    const router = useRouter();


    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
        //ユーザーが未ログインなら login フォルダの page.tsx 
                router.replace("/login");
            }
        }
    );
    
    return () => unsubscribe();
    }, [router]);
};