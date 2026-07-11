import { useUsers } from "../../_hooks/useUsers"

export default function Results() {
    const {users}= useUsers()
  return (
    <h3>Results {users.length}</h3>
  )
}