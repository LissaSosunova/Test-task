import { type Application } from '../../../../shared/interfaces/application'
import { showToast } from '../../../../shared/ui/toast'
import { useDictionaries } from '../../../../hooks/useDictionaries'


type Props = {
    index: number
    application: Application
    user: any
}

export function ApplicationRowItem({ application, user }: Props) {
    const { updateApplication, deleteApplication } = useDictionaries()
    const getAvailableStatuses = (status: Application['status']) => {
        switch (status) {
            case 'new':
                return ['new', 'in_progress']
            case 'in_progress':
                return ['in_progress', 'done']
            case 'done':
                return ['done']
            default:
                return ['new']
        }
    }

    const availableStatuses = getAvailableStatuses(application.status)

    const handleStatusChange = (value: Application['status']) => {

        if (!availableStatuses.includes(value)) {
            showToast.error('Invalid status transition')
            return
        }

        try {
            updateApplication({
                ...application,
                status: value,
            })

            showToast.success('Status has changed')
        } catch (e) {
            showToast.error('Status change failed')
        }
    }

    return (
        <tr>
            {user?.role === 'manager' && (
                <td>{application.id}</td>
            )}
            <td>{application.title}</td>
            <td>{application.description}</td>

            <td>
                {user?.role === 'manager' ? (
                    <select
                        value={application.status}
                        onChange={(e) =>
                            handleStatusChange(e.target.value as Application['status'])
                        }
                    >
                        {availableStatuses.map(status => (
                            <option key={status} value={status}>
                                {status === 'new' && 'New'}
                                {status === 'in_progress' && 'In Progress'}
                                {status === 'done' && 'Done'}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span>{application.status}</span>
                )}
            </td>
            {user?.role === 'manager' && (
                <td>{application.creator?.name}</td>
            )}
            <td>
                {user?.role === 'manager' && (
                    <button
                        className="btn-medium primary-btn"
                        onClick={() => deleteApplication(application.id as string)}
                    >
                        Delete
                    </button>
                )}
            </td>
        </tr>
    )
}
