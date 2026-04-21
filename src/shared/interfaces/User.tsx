export interface User {
    id?: string
    role?: 'user' | 'manager'
    name: string
}