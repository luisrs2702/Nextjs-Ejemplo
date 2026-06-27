import UserCard from "@/components/UserCard";
import { getAllUsers } from "@/services/usersService"

export default async function page() {
   
    const usuarios = await getAllUsers();
        console.log(usuarios)
    
    return (
        <>
            <h2>Usuarios Page</h2>
            <div>
                {usuarios.map((user)=>(
                    <UserCard user={user} key={user.id}/>
                ))}
            </div>
        </>
    )
}