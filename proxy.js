// proxy.js (En la raíz del proyecto)
import { auth } from "@/auth"

// Opcional: Define en qué rutas quieres que actúe el proxy
export const proxy = auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
    /*const allowedRoutes = session.user?.routes || [];

    // Validar si la URL que intenta escribir coincide con sus permisos de la BD
    const hasAccess = allowedRoutes.some((route) => route.path === currentPath);

    if (!hasAccess) {
    // Si no tiene permiso, lo mandamos a una ruta segura por defecto (o un 403 personalizado)
    return NextResponse.redirect(new URL("/dashboard", req.url));
    }*/
})


export const config = {
  matcher: ["/dashboard/:path*", "/perfil/:path*"],
}