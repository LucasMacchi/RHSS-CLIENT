import { useState, useEffect } from "react"
import sessionChecker from "../utils/sessionChecker"
import type { INovedad } from "../utils/interfaces"
import todayNovedades from "../utils/todayNovedades"
import Header from "./Header"

export default function NovedadesPage () {

    const [novedades, setNovedades] = useState<INovedad[]>([])

    useEffect(() => {
        sessionChecker()
        .then(d => d.username.length > 0 ? console.log('log') : window.location.href = '/login')
        todayNovedades().then(novs => setNovedades(novs))
    },[])

    useEffect(() => {
        console.log(novedades)
    },[novedades])

    const novedadesDisplay = () => {
        if(novedades.length > 0 ) {
            return (
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                {novedades.map((n) => (
                    <div key={n.numero} style={{
                        width: "350px",
                        backgroundColor: "#6495ed",
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "20px",
                        borderRadius: "3px",
                        color: "white",
                        cursor: "pointer"
                    }}>
                        <h3>{n.numero}</h3>
                        <h3>{n.fecha}</h3>
                        <h3>{n.categoria}</h3>
                    </div>
                ))}
            </div>
            )
        }
        else {
            return(
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                    <h1 id="titulo" style={{fontWeight: "bold", color: "#3399ff"}}>No hay novedades nuevas.</h1>
                </div>
            )
        }
    }

    return (
        <>
        <Header/>
        <div style={{textAlign: "center"}}>
            <h1 id="titulo" style={{fontWeight: "bold", color: "#3399ff"}}>Novedades del Dia</h1>
            <hr color='#3399ff'/>
            {novedadesDisplay()}
            <hr color='#3399ff'/> 
        </div>
        </>

    )
}