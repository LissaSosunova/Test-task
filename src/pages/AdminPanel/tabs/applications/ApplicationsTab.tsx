import { useState, useEffect, useRef } from 'react'
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
  const [isOpenFilter, setCurrentFilter] = useState(false)

  const handleCreate = (data: Application) => {
    const randomNum = Math.floor(Math.random() * 100000001)
    addApplication({
      ...data,
      id: randomNum.toString(),
    })
    setCreating(false)
  }
  useEffect(() => {
    setApplications(applications)
  }, [applications])

  const toggleFilter = () => {
    setCurrentFilter(!isOpenFilter)
  };
  // Handle clicks outside the dropdown
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current?.contains(event.target as Node)) {
        setCurrentFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSetFilterClick = (value?: string) => {
    if (value) {
      const data = applications.filter(a => a.status === value)
      setApplications(data)
      setCurrentFilter(false)
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
            <th>
              <div className="admin-table--td-filter">
                Status
                <div className="btn-filter" onClick={() => toggleFilter()}></div>
                {isOpenFilter && (
                  <div className="admin-table--filter-options" ref={dropdownRef}>
                    <ul>
                      <li className="filter-btn-li" onClick={() => handleSetFilterClick()}>Reset filter</li>
                      <li className="filter-btn-li" onClick={() => handleSetFilterClick('new')}>New</li>
                      <li className="filter-btn-li" onClick={() => handleSetFilterClick('in_progress')}>In progress</li>
                      <li className="filter-btn-li" onClick={() => handleSetFilterClick('done')}>Done</li>
                    </ul>
                  </div>
                )}

              </div>
            </th>
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

          {currentApplications.map((application, index) => (
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
