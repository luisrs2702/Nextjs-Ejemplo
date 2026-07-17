'use client'

import { useDeleteProduct } from "../_hooks/useDeleteProduct";
import { getProducts } from "../_services/ProductosApi"
import { useQuery,useMutation } from '@tanstack/react-query';

export default function ProductsList() {
    const { data:products, isLoading, isError,error } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts(),
        //queryFn: getPosts,//* tambien podría ser así ya que no se necesitan parametros, es solo una referencia
        select:products=>products.sort((a,b)=>b.id - a.id) //ordenar datos
    })
    const { mutate:deleteMutate,isPending , isSuccess , error:errorDelete,isError:isErrorDelete } = useDeleteProduct()

    if (isLoading) return <div>Cargando...</div>
    else if (isError) return <div>Ha habido un error: {error.message}</div> 
    return (
        <>
            <div>ProductsList</div>
            {
                products?.map((product) => (
                    <div key={product.id}>
                        <h4>{product.title}</h4>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <button onClick={()=>{
                            console.log(product.id)
                            deleteMutate(product.id)
                        }}>Delete</button>
                    </div>
                ))
            }
        </>
    )
}