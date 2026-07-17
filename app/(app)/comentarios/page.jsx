'use client'
import ComentCard from "./_components/ComentCard";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getComments,postComment } from "./_services/comments";


export default function ComentariosPage() {
    const { data, isLoading, error } = useQuery({queryKey:['comments'], // <-----
        queryFn:getComments}
    )
    const queryClient = useQueryClient()//se crea de la misma instancia del provider
    const { mutate, isLoading: isLoadingMutation,error:errorPost } = useMutation({
    mutationFn: postComment,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries(['comments'])

      // esto lo hacemos para guardar el estado previo
      // por si tenemos que hacer un rollback
      const previousComments = queryClient.getQueryData(['comments'])

      queryClient.setQueryData(['comments'], (oldData)=> {
        const newCommentToAdd = structuredClone(newComment)
        newCommentToAdd.preview = true

        if (oldData == null) return [newCommentToAdd]
        return [...oldData, newCommentToAdd]
      })

      return { previousComments } // -----> context
    },
    onError: (error, variables, context) => {// muestra el comentarió, pero si hay un error regresa los datos previos
      console.error(error)
      if (context?.previousComments != null) {
        queryClient.setQueryData(['comments'], context.previousComments)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['comments']
      })
    }
    })

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
       // const comment=Object.fromEntries(data)//*evitar data.get para cada campo
       // const message = comment.mensaje?.toString() ?? ''
        const message = data.get('mensaje')?.toString() ?? ''
        const title = data.get('titulo')?.toString() ?? ''

        if (title !== '' && message !== '') {
            mutate({ title, message })
        }
    }



  return (
    <div className="container mt-4">
        <form onSubmit={handleSubmit}>
            <div className="row justify-content-center align-items-center text-center">
                <div className="col">
                    <div className="row justify-content-center align-items-center text-center">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="titulo" className="form-label">Titulo</label>
                                <input type="text" className="form-control" id="titulo" name="titulo" aria-describedby="tituloHelp"/>
                                <div id="tituloHelp" className="form-text">Ingresa el titulo</div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 justify-content-center align-items-center text-center">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="mensaje" className="form-label">Mensaje</label>
                                <input type="text" className="form-control" id="mensaje" name="mensaje" aria-describedby="tituloHelp"/>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col">
                             <button
                                disabled={isLoadingMutation}
                                type='submit' className='btn btn-primary'
                            >
                                {isLoadingMutation ? 'Enviando comentario...' : 'Enviar comentario'}
                            </button>
                        </div>
                    </div>
                     {isLoading && <strong>Cargando...</strong>}
                    
                </div>
                <div className="col">
                    {errorPost != null && <strong>Algo ha ido mal {errorPost.message}</strong>}
                    <ul>
                        <li>
                            {
                            data?.map((comment) => (
                                <ComentCard titulo={comment.title} mensaje={comment.message} key={comment.id}/>
                            ))
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </form>
       
    </div>
  )
}