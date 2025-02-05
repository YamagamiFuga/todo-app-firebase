//todoの中身
import { redirect } from "next/navigation";

export default function Home() {
    redirect("/login");
    return null;
}