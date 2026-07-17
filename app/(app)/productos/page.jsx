import {dehydrate,HydrationBoundary,QueryClient} from '@tanstack/react-query'
import  ProductsList  from "./_components/ProductsList";
import {getProducts} from './_services/ProductosApi'
import ProductForm from './_components/ProductForm';
export default async function ProductosPage() {
    const queryClient = new QueryClient()
    //*prefetching
    await queryClient.prefetchQuery({
        queryKey: ['proucts'],
        queryFn: getProducts,
    })
    return (
        <div className="container mt-4">    
            <div className="row justify-content-center align-items-center text-center">
                <div className="col">
                    <ProductForm/>
                </div>
                <div className="col">
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <ProductsList />
                    </HydrationBoundary>
                </div>
            </div>
        </div>
       
    )
}
