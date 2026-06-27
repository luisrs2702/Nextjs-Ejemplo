"use client"
import { signIn } from 'next-auth/react';
import styles from './login.module.css';
export default function LoginPage() {
    const onSubmit = async(formData) => {
        const email = formData.get("email")
        const password = formData.get("password")
        //signIn("credentials", {email,password},{redirect:false})
        await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/dashboard"
        })

        // 2. Ahora sí puedes ver los logs en la consola del navegador
        //console.log("Resultado de Auth.js:", result)
    }


    return (
        <div className={"container-fluid min-vh-100 d-flex justify-content-center align-items-center py-5 "+styles.contenedorPrincipal}>
            <div className="row align-items-center justify-content-center mb-4 mt-4 w-100" >
                {/* <div className="col-lg-4 col-sm-4 col-md-6 text-start justify-content-center text-center mb-3">
                   
                </div> */}
                <div className='col-lg-4 col-sm-10 col-md-6'>
                    <div className={"card p-3 "+styles.cardCustom} >
                        <div className="card-body">
                            <form action={onSubmit}>
                                <div className="mb-3">
                                     <label htmlFor="username" className={"form-label "+styles.labelStyle}>Usuario</label>
                                    <input type="text" className={"form-control "+styles.inputStyle} id={styles.username} name="email"  placeholder="Usuario"   autoCapitalize="off" maxLength="30"/>
                                </div>
                                 <div className="mb-3">
                                    <label htmlFor="pass" className={"form-label "+styles.labelStyle}>Password</label>
                                    <input type="password" className={"form-control "+styles.inputStyle}  id={styles.pass}  name="password"  placeholder="Password"  autoComplete="off" maxLength="100" required/>

                                 </div>
                                <div className="row mt-4 mb-4">
                                    <div className="d-grid gap-2 col-12 mx-auto">
                                        <button type="submit" className="btn btn-light">Iniciar Sesion</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
