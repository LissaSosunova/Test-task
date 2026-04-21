import { useContext } from 'react'
import { DictionaryContext } from '../context/DictionaryContext'

export const useDictionaries = () => {
  const ctx = useContext(DictionaryContext)
  if (!ctx) throw new Error('useDictionaries must be used within provider')
  return ctx
}
