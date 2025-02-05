//todoの中身
"use client";
import { authcheck } from "./utils/authcheck";

export default function Home() {

    authcheck();

    return (
        <h1>todo</h1>
    );


};
