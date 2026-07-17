'use server';
import { addProduct,deleteProduct, updateProduct } from '@/app/(app)/productos/_services/ProductosApi';
import { auth } from '@/auth';
export async function createProduct(product) {
    /*const session = await auth();
    if (!session) { throw new Error('No autorizado'); }*/
    //TODO validar roles
    const resp = await addProduct(product);
    return resp.data
    
}
export async function removeProduct(id) {
    /*const session = await auth();
    if (!session) { throw new Error('No autorizado'); }*/
    //TODO validar roles
    const resp = await deleteProduct(id);
    return resp.data
    
}
export async function editProduct(id) {
    /*const session = await auth();
    if (!session) { throw new Error('No autorizado'); }*/
    //TODO validar roles
    const resp = await updateProduct(id);
    return resp.data
    
}