"use client";
import { useState, useEffect } from "react";
import { useAuthCheck } from "./utils/authcheck";
import LogoutButton from "@/components/logout";
import { getFirestore, collection, addDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import "./page.css";

interface Todo {
    id: string;
    name: string;
}

export default function Home() {
    useAuthCheck();
    const [tasks, setTasks] = useState<Todo[]>([]);
    const [taskName, setTaskName] = useState("");
    const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
    const db = getFirestore();

    // タスク一覧取得
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "tasks"), (querySnapshot) => {
            const fetchedTasks: Todo[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name
            }));
            setTasks(fetchedTasks);
        });

        return () => unsubscribe();
    }, [db]);

    // タスクの追加
    const handleClickAddButton = async () => {
        if (!taskName.trim()) {
            alert("タスクが入力されていません");
            return;
        }
        try {
            await addDoc(collection(db, "tasks"), { name: taskName });
            setTaskName("");
        } catch (error) {
            console.error("タスクの追加に失敗", error);
        }
    };

    // タスクの削除
    const handleClickDeleteButton = async () => {
        if (selectedTaskIds.length === 0) {
            alert("終了したタスクを選んでください");
            return;
        }
        try {
            await Promise.all(selectedTaskIds.map(async (taskId) => {
                await deleteDoc(doc(db, "tasks", taskId));
            }));
            setSelectedTaskIds([]);
        } catch (error) {
            console.log("タスクを削除に失敗", error);
        }
    };

    // タスクの選択切り替え
    const toggleTaskSelection = (taskId: string) => {
        setSelectedTaskIds((prev) =>
            prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
        );
    };

    return (
        <div id="root">
            {/*header*/}
            <header>
                <div className="header-container">
                    <img className="header-icon" src="https://www.kaigo-antenna.jp/uploads/illustration/main_image/1615/webp_202211_015_s.webp" alt="logo" />
                    <div className="header-logo">
                        <h1>とど管理</h1>
                        <p>今日のやるべきことを確認しよう！</p>
                    </div>  
                </div>  
                <div className="logout">
                    <LogoutButton />
                </div> 
            </header>

            {/*main*/}
            <main>
                <div className="main-container">
                    <div className="contents">
                        <input 
                            className="text-form"
                            type="text" 
                            placeholder="タスクを入力" 
                            value={taskName}
                            onChange={(event) => setTaskName(event.target.value)}
                        />
                        <button className="button" onClick={handleClickAddButton}>
                            追加
                        </button>
                    </div>
                    <div className="tag-list">
                        <h2 className="tag-text">Todo一覧</h2>
                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id} className="tasks-list">
                                    <label>
                                        <input
                                            className="input-list"
                                            type="checkbox"
                                            checked={selectedTaskIds.includes(task.id)}
                                            onChange={() => toggleTaskSelection(task.id)}
                                        />
                                        {task.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* タスク削除ボタン */}
                    <button className="delete-botton" onClick={handleClickDeleteButton}>
                        削除
                    </button>
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
