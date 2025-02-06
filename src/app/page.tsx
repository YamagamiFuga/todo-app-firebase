//todoの中身
"use client";
import { useState, useEffect } from "react";
import { logOut } from "@/firebase/auth"; 
import { authcheck } from "./utils/authcheck";
import firebase from "firebase/compat/app";
import "firebase/compat/firebase";
import { getFirestore, collection, addDoc, getDoc, doc } from "firebase/firestore";

interface Todo {
    id: string;
    name: string;
}


export default function Home() {
    //認証
    authcheck();

    const [takes, setTasks] = useState<Todo[]>([]);
    const [takeName, setTaskName] = useState("");
    const [documentId, setDocumentId] = useState("");


    //タスクの追加とタスクの名前取得
    const handleClickAddButton = async () => {
        if (!takeName) {
            alert("タスクが入力されていません");
            return;
        }
        try {
            const db = getFirestore();
            const res = await addDoc(collection(db, "takes"),{
                name: takeName
            });

            
            const snapshot = await getDoc(doc(db, "tasks", res.id));
            const data = snapshot.data()?.name;

            setTaskName("");
            } catch (error) {
                console.error("タスクの追加に失敗", error);
            }
        };
    
    //タスクの削除
    const handleClickDeleteButton = async () => {
        if (!documentId) {
            //ここから
        }
    };
    
    
            return (
        <h1>todo</h1>
    );


};

