import { useEffect, useState } from "react";
import type { INovedad } from "../utils/interfaces";
import sessionChecker from "../utils/sessionChecker";
import Header from "./Header";



export default function Novedades () {

    const [novedades, setNovedades] = useState<INovedad[]>([])
    
    useEffect(() => {
        sessionChecker()
        .then(d => d.username.length > 0 ? console.log('log') : window.location.href = '/login')
    },[])


    return(
        <div style={{textAlign: "center"}}>
            <Header/>
            <h1 id="titulo" style={{fontWeight: "bold", color: "#3399ff"}}>Novedades</h1>
            <hr color='#3399ff'/>
        </div>
    )
    
}