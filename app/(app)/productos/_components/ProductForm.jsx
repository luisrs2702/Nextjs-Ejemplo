'use client'
import { useCreateProduct } from "../_hooks/useCreateProduct";

export default function ProductForm() {
    const { mutate,isPending , isSuccess , error,isError } = useCreateProduct()
    const handleSubmit =(e)=>{
        e.preventDefault()//*evita recarga de pagina, con react-hook-form ya no es necesario esto
        const formData=new FormData(e.target);
        const product=Object.fromEntries(formData)
        mutate(product)


    }
  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="row justify-content-center align-items-center text-center">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Producto</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="tituloHelp"/>
                        <div id="tituloHelp" className="form-text">Ingresa el nombre de producto</div>
                    </div>
                </div>
            </div>
            <div className="row mt-4 justify-content-center align-items-center text-center">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descripción</label>
                        <input type="text" className="form-control" id="description" name="description" aria-describedby="tituloHelp"/>
                    </div>
                </div>
            </div>
            <div className="row mt-4 justify-content-center align-items-center text-center">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="precio" className="form-label">Precio</label>
                        <input type="number" className="form-control" id="price" name="price" aria-describedby="tituloHelp"/>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col">
                        <button
                        disabled={isPending}
                        type='submit' className='btn btn-primary'
                    >
                        {isPending ? 'Enviando comentario...' : 'Enviar comentario'} 
                    </button>
                </div>
            </div>
        </form>
        {/* {isLoading && <strong>Cargando...</strong>} */}
    </div>
  )
}