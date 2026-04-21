import { type User } from './User'
export interface Application {
    id?: string
    title: string
    description: string
    status: 'new' | 'in_progress' | 'done'
    creator?: User | null
}