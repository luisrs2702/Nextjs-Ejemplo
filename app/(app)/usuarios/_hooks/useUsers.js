import {fetchUsers} from '../_services/usuarios'
import { useQuery,useInfiniteQuery } from '@tanstack/react-query'
export const useUsers = () => {
    //useInfinityQuery=infinityScroll
    const {isLoading,isError, data,error,fetchNextPage,hasNextPage,refetch } = useInfiniteQuery({ queryKey: ['posts'],
        //queryFn:  () => fetchUsers,
        queryFn: fetchUsers,
        refetchOnWindowFocus: false,//evitar el refetch al regresar a la ventana
        initialPageParam: 1, // Página inicial
        getNextPageParam:(lastPage)=>lastPage.nextCursor},
    )

    return{
        isLoading,
        isError,
        users:data?.pages?.flatMap(page=>page.users)??[],
        refetch,
        fetchNextPage,
        hasNextPage,
        error
    }

}