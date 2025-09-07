'use client'
import {useState} from "react";

type User = {
    id: number
    username: string
    firstName: string
    lastName: string
}
export default function UserPage() {

    const [users, setUsers] = useState<User[]>([
        {id: 1, username: 'abc@gmail.com', firstName: 'abc', lastName: 'xyz'},
        {id: 2, username: 'xyz@gmail.com', firstName: 'xyz', lastName: 'abc'},
        {id: 3, username: 'admin@gmail.com', firstName: 'Admin', lastName: 'abc'}
    ]);

    function handleDelete(id: number) {
        setUsers(users.filter((user) => user.id !== id));
    }

    return (
        <div className=" h-screen bg-gray-100 flex flex-col items-center justify-start">

            <h2 className="text-2xl font-bold mb-6">Users</h2>

            <div className="w-full max-w-4xl bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Username</th>
                        <th className="px-4 py-3">First Name</th>
                        <th className="px-4 py-3">Last Name</th>
                        <th className="px-4 py-3">Tools</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">{index + 1}</td>
                            <td className="px-4 py-3">{user.firstName}</td>
                            <td className="px-4 py-3">{user.firstName}</td>
                            <td className="px-4 py-3">{user.lastName}</td>
                            <td className="px-4 py-3">
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-gray-500">
                                No Result Found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
