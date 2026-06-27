"use client"
import { useSession } from "next-auth/react"

export default function HomePage() {
    const { data: session, status } = useSession()
  
    if (status === "loading") return <p>Cargando...</p>
    if (!session) return <p>No autenticado</p>

    return (
        
        <div className="container mt-4">
            <h1>Dashboard</h1>
            <p>Nombre: {session.user?.name}</p>
            <p>Email: {session.user?.email}</p>
        </div>

    )
}