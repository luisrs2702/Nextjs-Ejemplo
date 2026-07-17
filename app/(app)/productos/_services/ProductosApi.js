import { api } from "@/app/_lib/configAxios"

export const getProducts= async ()=>{
    const res=await api.get('/products')
    return res.data

}
export const addProduct= async (product)=>{
   const { data } = await api.post('/products', product);
   return data;
    /*try {
      const { data } = await api.post("/products", product);
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al crear el producto",
      );
    }*/

}
//export const addProduct=(product)=>api.post('/products',product)

export const deleteProduct= async (id)=>{
   const { data } = await api.delete(`/products/${id}`, );
   return data;

}
export const updateProduct= async (id,product)=>{
   const { data } = await api.delete(`/products/${id}`, product);
   return data;

}