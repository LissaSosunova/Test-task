
import { useEffect, useState } from 'react'
import { UserRowItem } from './UserRowItem'

export default function UsersTab() {
    const [loading, setLoading] = useState(true)
    const [users, updUsers] = useState([])

    useEffect(() => {
        const stored = localStorage.getItem('users')
        updUsers(stored ? JSON.parse(stored) : [])
        console.log(users)
        setLoading(false)
    }, [])

    if (loading) {
        return <div>Loading users…</div>
    }

    if (!users.length) {
        return <div>User's list is empty</div>
    }

    return (
        <div className="w-full flex justify-content-center grid pt-5 pb-5">
            <table className="admin-table lg:col-8 md:col-10 col-12 justify-content-center align-items-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => (
                        <UserRowItem
                            key={index}
                            user={user}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
