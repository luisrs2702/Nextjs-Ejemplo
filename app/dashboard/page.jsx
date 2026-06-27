import { auth } from "@/auth"
export const metadata = {
  title: "Dashboard",
};
export default async  function DashboardPage() {
  const session = await auth()
  if (!session) return <p>No autenticado</p>
  return (
    <>
    <div>DASHBOARD</div>
    <h1>Bienvenido {session.user?.name}</h1>
    </>
  )
}