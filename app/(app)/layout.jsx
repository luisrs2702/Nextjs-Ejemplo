import NavBar from "@/components/NavBar";

export default function AppLayout({children}) {
  return (
    <>
        <NavBar/>
        <div className="app-content">
            {children}
        </div>
    </>
  );
}
