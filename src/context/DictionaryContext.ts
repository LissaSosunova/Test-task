import { createContext } from 'react'
import { type Application } from '../shared/interfaces/application'

export type Dictionaries = {
  applications: Application[]
  addApplication: (app: Application) => void
  updateApplication: (app: Application) => void
  deleteApplication: (id: string) => void
}

export const DictionaryContext = createContext<Dictionaries | null>(null)
