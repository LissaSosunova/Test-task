import { createContext, useEffect, useState } from 'react'
import { type User } from '../../shared/interfaces/User'
import { showToast } from '../../shared/ui/toast'


interface AuthContextType {
    user: User | null
    loading: boolean
    login: (user: User) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const user = storedUser ? JSON.parse(storedUser) : null

        if (!user) {
            setLoading(false)
            return
        }

        setUser(user)
        setLoading(false)
    }, [])
    const login = (user: User) => {
        localStorage.setItem('user', JSON.stringify(user))
        showToast.success(`Welcome back ${user.name}`)
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext }