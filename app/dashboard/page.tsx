'use client'
import {useRouter} from "next/navigation";



export default function DashboardPage() {
    const router = useRouter();

    function handleLogout() {
        router.push("/");
    }

    return (
        <div className="w-full min-h-screen max-w-sm bg-white rounded-xl shadow p-6 space-y-4">

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <button onClick={handleLogout} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                    Logout
                </button>
                <p>Welcome to your dashboard</p>
            </div>

        </div>
    );
}
