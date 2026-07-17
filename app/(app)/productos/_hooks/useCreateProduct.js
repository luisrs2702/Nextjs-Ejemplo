'use client'
import { createProduct } from '@/app/_lib/actions/productos/actionsProduct';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:createProduct,//*se le pasan los parametros en mutation.mutate
        onSuccess: () => {
            console.log('producto agregaado!')
           // queryClient.invalidateQueries({queryKey: ['products'], }); //*borra la cache y trae datos nuevos
            queryClient.invalidateQueries('products'); //*borra la cache y trae datos nuevos
        },
    });
   
}