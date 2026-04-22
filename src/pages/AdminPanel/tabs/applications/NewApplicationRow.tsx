import { useState, useEffect } from 'react'
import { ApplicationSchema, type Application } from '../../../../shared/validators/application.schema'
import { useAuth } from '../../../../shared/AuthContext/useAuth'

type Props = {
    onSave: (data: Application) => void
    onCancel: () => void
}

export function NewApplicationRow({ onSave, onCancel }: Props) {
    const { user } = useAuth()

    const [errors, setErrors] = useState<Record<string, string>>({})
    const createEmptyApplication = (): Application => ({
        title: '',
        description: '',
        status: 'new',
        creator: user
    })
    const [data, setData] = useState<Application>(createEmptyApplication())

    useEffect(() => {
        if (user) {
            setData(prev => ({ ...prev, creator: user }))
        }
    }, [user])

    const handleSave = () => {
        data.creator = user;
        const result = ApplicationSchema.safeParse(data)

        if (!result.success) {
            const fieldErrors: Record<string, string> = {}

            result.error.issues.forEach(err => {
                const field = err.path[0] as string
                fieldErrors[field] = err.message
            })

            setErrors(fieldErrors)
            return
        }

        setErrors({})
        onSave(result.data)
        setData(createEmptyApplication())
    }

    return (
        <tr>
            {user?.role === 'manager' && (
                <td></td>
            )}
            <td>
                <div className="mb-3 input-set w-full md:min-w-full col input-td">
                    <label className="form-label form-label1">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={data.title}
                        onChange={e =>
                            setData(prev => ({ ...prev, title: e.target.value }))
                        }
                    />
                    <p className="error error-form error-td">
                        {errors.title && <span >{errors.title}</span>}
                    </p>
                </div>
            </td>

            <td>
                <div className="mb-3 input-set w-full md:min-w-full col input-td">
                    <label className="form-label form-label1">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={data.description}
                        onChange={e =>
                            setData(prev => ({ ...prev, description: e.target.value }))
                        }
                    />
                    <p className="error error-form error-td">
                        {errors.description && <span >{errors.description}</span>}
                    </p>

                </div>

            </td>

            <td>
                New
            </td>
            {user?.role === 'manager' && (
                <td>{user?.name}</td>
            )}
            <td>
                <button className="btn-medium primary-btn mt-3" onClick={handleSave}>
                    Save
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn-medium filter-btn mt-3">
                    Cancel
                </button>
            </td>
        </tr>
    )
}
