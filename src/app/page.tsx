//todoの中身
"use client";
import { useState, useEffect } from "react";
import { authcheck } from "./utils/authcheck";
import LogoutButton from "@/components/logout";
import { getFirestore, collection, addDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";


interface Todo {
    id: string;
    name: string;
}


export default function Home() {
    //認証
    authcheck();

    const [tasks, setTasks] = useState<Todo[]>([]);
    const [taskName, setTaskName] = useState("");
    const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);


    const db = getFirestore();

    //タスク一覧取得
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "tasks"), (querySnapshot) => {
            const fetchedTasks: Todo[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name
            }));
            setTasks(fetchedTasks);
        });

        return () => unsubscribe(); // クリーンアップ
    }, []);

    //タスクの追加
    const handleClickAddButton = async () => {
        if (!taskName.trim()) {
            alert("タスクが入力されていません");
            return;
        }
        try {
            const res = await addDoc(collection(db, "tasks"),{
                name: taskName
            });

            setTaskName("");
            } catch (error) {
                console.error("タスクの追加に失敗", error);
            }
        };
    
    //タスクの削除
    const handleClickDeleteButton = async () => {
        if (selectedTaskIds.length === 0) {
            alert("終了したタスクを選んでください");
            return;
        }
        try {
            await Promise.all(selectedTaskIds.map(async (taskId) => {
                await deleteDoc(doc(db, "tasks", taskId));
            }));
            
            //チェックしたタスク削除
            setSelectedTaskIds([]);

        } catch (error) {
            console.log("タスクを削除に失敗")
        }
    };

    const toggleTaskSelection = (taskId: string) => {
        setSelectedTaskIds((prev) =>
            prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
        );
    };
    
    
    return (
        <div>
            {/*header*/}
            <header className="w-full bg-cyan-200 text-black py-4 shadow-md">
                <div className="max-w-4xl mx-auto flex justify-between items-center px-6">
                <h1 className="text-2xl font-bold">とど管理</h1>
                <LogoutButton />
                </div>
            </header>
            {/*body*/}
            <div className='flex fle-col items-center justify-center min-h-screen bg-cyan-100 text-black'>
                <div className='w-full max-w-sm p-6 bg-white rounded-md shadow-md'>
                <input
                    type="text"
                    placeholder="タスクを入力"
                    value={taskName}
                    onChange={(event) => setTaskName(event.target.value)}
                    className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
                />
                <button
                    onClick={handleClickAddButton}
                    className="w-full px-4 py-2 mb-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                追加
                </button>

                {/*タスクリスト */}
                <div className="mt-6 p-4 border rounded-md bg-gray-50 shadow-sm">
                        <h2 className="text-lg font-bold mb-2">Todo一覧</h2>
                        <ul className="list-none p-0">
                            {tasks.map((task) => (
                                <li key={task.id} className="flex items-center justify-between p-2 border-b">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedTaskIds.includes(task.id)}
                                            onChange={() => toggleTaskSelection(task.id)}
                                            className="mr-2"
                                        />
                                        {task.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                </div>
                {/* 削除ボタン */}
                    <button
                        onClick={handleClickDeleteButton}
                        className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                        削除
                    </button>
                </div>
            </div>
        </div>
    );


};

