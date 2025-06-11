import { useEffect, useState } from "react";
import logo from "../assets/logo_big.webp";
import { Link, useLocation } from "react-router";
import logoutFn from "../utils/logoutFn";

export default function Header () {

    const [navbar, setNavbar] = useState(false)
    const location = useLocation();

    useEffect(() => {
        if(location.pathname !== "/login"){
            setNavbar(true)
        }
        else {
            setNavbar(false)
        }
    },[location])

    const linkStyle: React.CSSProperties = { height: "auto", border: "1px solid", borderColor: "black",
        textDecoration: "none", padding: "10px", color:"white", fontWeight: "bold",
        fontSize: "x-large"}

    const logout = async () => {
        if(confirm('Quieres cerrar la sesion?')) {
            await logoutFn()
            window.location.reload()
        }
    }

    const navbarDisplay = () => {
        if(navbar) {
            return (
                <div>
                    <img src={logo} alt="Logo" style={{maxWidth: "200px", width: "100%"}}/>
                    <div style={{
                    backgroundColor: "#6495ed",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%"
                    
                }}>
                    <div style={{padding: "10px"}}>
                        <Link style={linkStyle} to={'/'}>Pagina Principal</Link>
                        <Link style={linkStyle} to={'/Novedades'}>Novedades</Link>
                        <Link style={linkStyle} to={'/legajos'}>Legajos</Link>
                        <Link style={linkStyle} to={'/Misnovedades'}>Mis Novedades</Link>
                        <Link style={linkStyle} to={'/Nueva'}>Crear Novedad</Link>
                    </div>
                    <div style={{padding: "10px"}}>
                        <a href="" style={linkStyle} onClick={() => logout()}>Cerrar Sesion</a>
                    </div>
                </div>
                </div>
            )
        }
        else{
            return(
                <img src={logo} alt="Logo" style={{maxWidth: "500px", width: "100%"}}/>
            )
        }
    }
    return (
        <div style={{textAlign: 'center', marginBottom:"50px"}}>
            {navbarDisplay()}
        </div>
    )
}