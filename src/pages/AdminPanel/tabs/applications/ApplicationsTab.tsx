import { useState } from 'react'
import { type Application } from '../../../../shared/interfaces/application'
import { ApplicationRowItem } from './ApplicationRowItem'
import { useDictionaries } from '../../../../hooks/useDictionaries'
import { useAuth } from '../../../../shared/AuthContext/useAuth'
import { NewApplicationRow } from './NewApplicationRow'


export default function ApplicationsTab() {
  const { applications, addApplication } = useDictionaries()
  const { user } = useAuth()
  const [creating, setCreating] = useState(false)
  const [currentApplications, setApplications] = useState<Application[]>([])
  const [currentFilter, setCurrentFilter] = useState<string | null>(null)

  const handleCreate = (data: Application) => {
    const randomNum = Math.floor(Math.random() * 100000001)
    addApplication({
      ...data,
      id: randomNum.toString(),
    })
    setCreating(false)
  }

    const handleSetFilterClick = (value?: string) => {
    if (value) {
      const data = applications.filter(a => a.status === value)
      setApplications(data)
      setCurrentFilter(value)
    } else {
      setApplications(applications)
      setCurrentFilter(null)
    }
  }

  return (
    <div className="w-full flex justify-content-center grid pt-5 pb-5">
      <div className="w-full flex justify-content-center grid pt-2 pb-2">
        <button
          className="btn-main primary-btn mt-3"
          onClick={() => setCreating(true)}
          disabled={creating}
        >
          + Add application
        </button>
      </div>

      <table className="admin-table lg:col-8 md:col-10 col-11">
        <thead>
          <tr>
            {user?.role === 'manager' && (
              <th>ID</th>
            )}
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            {user?.role === 'manager' && (
              <th>Creator</th>
            )}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {creating && (
            <NewApplicationRow
              onSave={handleCreate}
              onCancel={() => setCreating(false)}
            />
          )}

          {applications.map((application, index) => (
            <ApplicationRowItem
              key={application.id}
              index={index}
              application={application}
              user={user}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
