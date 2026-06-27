"use client"
import Link from "next/link";
import { useSession,signOut } from "next-auth/react"

export default function NavBar() {
    const { data: session, status } = useSession()
    if (status === "loading") {
        return <nav>Cargando...</nav>; // Evita parpadeos mientras valida
    }
    //?const menuItems = session?.user?.routes || [];
    //?const userRole = session?.user?.role;
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                Navbar
                </a>
                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                {/* Renderizado 100% dinámico desde la Base de Datos */}
                {/* <div className="flex gap-4">
                {menuItems.map((item, index) => (
                    <Link key={index} href={item.path} className="hover:underline">
                    {item.name}
                    </Link>
                ))}
                </div>
                </div> */}
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" href="/home">
                        Home
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" href="/dashboard">
                        Dashboard
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" href="/usuarios">
                        Usuarios
                    </Link>
                    </li>
                    
                    <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">
                        Disabled
                    </a>
                    </li>
                </ul>
                <span>{session?.user?.name}</span>
                




                <div className="ms-auto">
                    <button className="btn btn-primary" onClick={() => signOut({ callbackUrl: "/login" })}>Log Out</button>
                </div> 

                </div>
            </div>
        </nav>
    )
}