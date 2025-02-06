//ログアウト
import { logOut } from "@/firebase/auth"; 
import { useRouter } from "next/navigation";
const router = useRouter();

const handleLogout = async () => {
    try {
        await logOut();
        alert("ログアウトしました");
        router.push("/login");
    }   catch (error) {

    };


return (
    <button
    onClick={handleLogout}
    className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-400"
    >
    Logout
    </button>
    )
};