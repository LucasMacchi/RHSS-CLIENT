import { useState, useEffect } from "react"
import type { INovedad } from "../utils/interfaces"
import todayNovedades from "../utils/todayNovedades"
import Header from "./Header"
import session from "../utils/session"

export default function NovedadesPage () {

    const [novedades, setNovedades] = useState<INovedad[]>([])

    useEffect(() => {
        session(true)
        todayNovedades().then(novs => setNovedades(novs))
    },[])

    const novedadesDisplay = () => {
        if(novedades.length > 0 ) {
            return (
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                {novedades.map((n) => (
                    <div key={n.numero} style={{
                        width: "450px",
                        backgroundColor: n.cerrado ? "crimson" : "#6495ed",
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "20px",
                        borderRadius: "3px",
                        color: "white",
                        cursor: "pointer"}}
                        onClick={() => window.location.href = '/Novedad/'+n.novedad_id}>
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