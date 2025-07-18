import { useEffect, useState } from "react";
import logo from "../assets/sistemasLogo.jpg";
import { Link, useLocation } from "react-router";
import logoutFn from "../utils/logoutFn";

export default function Header () {

    const [navbar, setNavbar] = useState(false)
    const [admin, setAdmin] = useState(false)
    const location = useLocation();
    useEffect(() => {
        if(location.pathname !== "/login" && location.pathname !== "/Crear"){
            setNavbar(true)
        }
        else {
            setNavbar(false)
        }
        if(localStorage.getItem('admin')) setAdmin(true)
    },[location])

    const linkStyle: React.CSSProperties = { height: "auto", border: "1px solid", borderColor: "black",
        textDecoration: "none", padding: "10px", color:"white", fontWeight: "bold",
        fontSize: "x-large"}

    const logout = async () => {
        await logoutFn()
    }

    const navbarDisplay = () => {
        if(navbar) {
            return (
                <div>
                    <img src={logo} alt="Logo" style={{maxWidth: "180px", width: "100%"}}/>
                    <div style={{
                    backgroundColor: "#6495ed",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%"
                    
                }}>
                    <div style={{padding: "10px"}}>
                        <Link style={linkStyle} to={'/'}>Pagina Principal</Link>
                        <Link style={linkStyle} to={'/Novedades'}>Novedades</Link>
                        <Link style={linkStyle} to={'/Legajos'}>Legajos</Link>
                        <Link style={linkStyle} to={'/Misnovedades'}>Mis Novedades</Link>
                        <Link style={linkStyle} to={'/Nueva'}>Crear Novedad</Link>
                        {admin && <Link style={linkStyle} to={'/Usuarios'}>Usuarios</Link>}
                    </div>
                    <div style={{padding: "10px"}}>
                        <a href="/login" style={{...linkStyle, backgroundColor: "red"}} onClick={() => logout()}>Cerrar Sesion</a>
                    </div>
                </div>
                </div>
            )
        }
        else{
            return(
                <img src={logo} alt="Logo" style={{maxWidth: "250px", width: "100%"}}/>
            )
        }
    }
    return (
        <div style={{textAlign: 'center', marginBottom:"50px"}}>
            {navbarDisplay()}
        </div>
    )
}