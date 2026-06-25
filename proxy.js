// proxy.js (En la raíz del proyecto)
import { auth } from "@/auth"

// Opcional: Define en qué rutas quieres que actúe el proxy
export const proxy = auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})


export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
}