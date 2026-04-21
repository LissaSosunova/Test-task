import { useEffect, useState } from 'react'
import { DictionaryContext } from '../context/DictionaryContext'
import { type Application } from '../shared/interfaces/application'

export function DictionaryProvider({ children }: { children: React.ReactNode }) {

  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('applications')
    setApplications(stored ? JSON.parse(stored) : [])
  }, [])

  const saveToStorage = (data: Application[]) => {
    localStorage.setItem('applications', JSON.stringify(data))
    setApplications(data)
  }

  const addApplication = (app: Application) => {
    const newData = [...applications, app]
    saveToStorage(newData)
  }

  const updateApplication = (updated: Application) => {
    const newData = applications.map(a =>
      a.id === updated.id ? updated : a
    )
    saveToStorage(newData)
  }

  const deleteApplication = (id: string) => {
    const newData = applications.filter(a => a.id !== id)
    saveToStorage(newData)
  }

  return (
    <DictionaryContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
      }}
    >
      {children}
    </DictionaryContext.Provider>
  )
}
