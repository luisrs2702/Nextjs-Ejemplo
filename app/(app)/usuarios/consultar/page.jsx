'use client'
import { useRef,useState,useEffect,useMemo } from "react";
import UserList from "./_components/UserList";
import { useUsers } from "../_hooks/useUsers";
import Results from "./_components/Results";

export default function ConsultaPage() {
    //const {isLoading,isError, data:users=[],error } = useQuery({ queryKey: ['posts'], queryFn:  () => fetchUsers(1) })
    
    const [showColors, setShowColors] = useState(false)
    const [sorting, setSorting] = useState('NONE')
    const [filterCountry, setFilterCountry] = useState(null)
    const {isLoading,isError, users,error,refetch,fetchNextPage,hasNextPage }=useUsers()
   

   /* useEffect(() => {
        setError(false)
        setLoading(true)
        fetchUsers(currentPage)
        .then(users=> {
            setUsers(prevUsers=>{
                const newUsers=prevUsers.concat(users)
                originalUsers.current = newUsers
                return newUsers
            });
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(()=>{
            setLoading(false)
        });
        
    }, [currentPage]);*/

    const handleReset = () => {
        //setUsers(originalUsers.current);
    };

    const handleDelete = (email) => {
        const filteredUsers = users.filter((user) => user.email !== email);
        //setUsers(filteredUsers);
    };

    const handleChangeSort = (sort) => {
        setSorting(sort);
    };

    const filteredUsers = useMemo(() => {
        console.log('calculate filteredUsers')
        return filterCountry != null && filterCountry.length > 0
        ? users.filter(user => {
            return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
        })
        : users
    }, [users, filterCountry])

    const sortedUsers = useMemo(() => {
        console.log('calculate sortedUsers')

        if (sorting === 'NONE') return filteredUsers

        const compareProperties= {
            ['COUNTRY']: user => user.location.country,
            ['NAME']: user => user.name.first,
            ['LAST']: user => user.name.last
        }

        return filteredUsers.toSorted((a, b) => {
            const extractProperty = compareProperties[sorting]
            return extractProperty(a).localeCompare(extractProperty(b))
        })
    }, [filteredUsers, sorting])

    return (
        <>
            <div>Consulta Page con react Query(TanStack)</div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <Results/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {users.length > 0 &&
                            <UserList changeSorting={handleChangeSort} deleteUser={handleDelete} users={sortedUsers}/>
                        }
                        {isLoading && <strong>Cargando...</strong>}
                        {isError && <p>Ha habido un error {error.message}</p>}
                    </div>
                </div>
            </div>
           
            <div className="row align-items-center justify-content-center text-center mt-3 mb-3">
                <div className="col">
                    {!isLoading && !isError && hasNextPage && <button onClick={async()=>{await fetchNextPage()}}>Cargar más resultados</button>}
                    {!isLoading && !isError && !hasNextPage && <p>No hay mas datos</p>}
                </div>
            </div>

        </>
    );
}
