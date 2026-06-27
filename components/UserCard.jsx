"use client"
// ?client component
export default function UserCard({user}) {
    console.log(user)
  return (
    <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
    </div>
  )
}