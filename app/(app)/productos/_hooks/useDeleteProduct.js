'use client'
import { removeProduct } from '@/app/_lib/actions/productos/actionsProduct';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:removeProduct,//*se le pasan los parametros en mutation.mutate
        onSuccess: () => {
            console.log('producto eliminado!')
           // queryClient.invalidateQueries({queryKey: ['products'], }); //*borra la cache y trae datos nuevos
            queryClient.invalidateQueries('products'); //*borra la cache y trae datos nuevos
        },
    });
   
}