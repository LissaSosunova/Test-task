import { type User } from '../../../../shared/interfaces/User'

type Props = {
    user: User
}

export function UserRowItem({
    user,
}: Props) {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.role}</td>
        </tr>
    )
}
