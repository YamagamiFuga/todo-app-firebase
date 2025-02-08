//ログアウト
import { logOut } from "@/firebase/auth"; 
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logOut();
            router.push("/login");
        }   catch (error) {
            console.error("ログアウトに失敗", error);
        };
    };


    return (
        <button
        onClick={handleLogout}
        className="px-4 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-600"
        >
        Logout
        </button>
        );
}