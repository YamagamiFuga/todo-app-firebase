"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/firebase/auth";

export function useAuthCheck() {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push("/login");
            }
        });

        return () => unsubscribe();
    }, [router]);
}