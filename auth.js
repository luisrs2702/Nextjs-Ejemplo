import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { api } from "@/app/_lib/configAxios"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
        /*credentials: {
            email: {},
            password: {},
        },*/
        credentials: {},
        authorize: async (credentials) => {
            try {
                const res = await api.post("/login", {
                    email: credentials?.email,
                    password: credentials?.password,
                });
                const respuestaApi = res.data;

                // Verificamos si Laravel dice que todo salió bien (status: true)
                if (respuestaApi && respuestaApi.status) {
                    // RETORNAMOS TODO EL OBJETO. 
                    // NextAuth pasará esto directamente al callback jwt({ user })
                    return respuestaApi; 
                }
               // console.log({res})
                //return res.data.user;
                return null;
            } 
            catch (error) {
                console.log(error)
                //throw new Error(error.response?.data?.msg || "Credenciales incorrectas");
                return null;
            }
        },
    }),
    ],
    callbacks: {
        // 1. El callback JWT se ejecuta cuando se inicia sesión
    async jwt({ token, user }) {
        if (user) {
            // Guardamos el token de Laravel dentro del JWT de NextAuth
            token.laravelToken = user.access_token;
            
            // Guardamos los datos del usuario (id, name, email)
            token.userData = user.user; 
            //?token.role = user.role;         // Ej: "admin" o "editor"
            //?token.routes = user.routes;
            
            // Opcional: 
            //token.expiresAt = user.expires_at;
        }
        return token;
        },

        // 2. El callback session se ejecuta cada vez que el cliente consulta la sesión (useSession)
        async session({ session, token }) {
        // Pasamos los datos del JWT de NextAuth hacia la sesión del cliente
            session.laravelToken = token.laravelToken;
            session.user = token.userData; // Esto reemplaza o complementa el objeto user por defecto
            //session.expiresAt = token.expiresAt;
            //?session.user.role = token.role;
            //?session.user.routes = token.routes;
            
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    /*authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },*/
});
