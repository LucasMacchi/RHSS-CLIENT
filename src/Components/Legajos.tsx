import { useState } from "react";
import session from "../utils/session";
import Header from "./Header";
import type { ILegajo } from "../utils/interfaces";
import { getLegajos } from "../utils/getData";

export default function Legajos () {

    const [legajosF, setLegajosF] = useState<ILegajo[]>([])
    const [legajosS, setLegajosS] = useState<string>('')
    session(true)


    const fetchLegajos = async () => {
        let arr = await getLegajos(legajosS)
        if(arr.length > 0) {
            if(legajosS.length > 3) arr = arr.filter((l) => l.fullname.toLocaleLowerCase().includes(legajosS.toLocaleLowerCase()))
        }
        setLegajosF(arr)
    }

    const legajoTr: React.CSSProperties = {
        width: "25%"
    }

    return(
        <div style={{textAlign: "center"}}>
            <Header/>
            <h1 id="titulo" style={{fontWeight: "bold", color: "#3399ff"}}>Legajos - {legajosF.length} Encontrados</h1>
            <hr color='#3399ff'/>
            <div style={{marginBottom: "10px"}}>
                <h4 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff", margin:"5px"}}>
                    Buscar por nombre
                </h4>
                <input type="text" value={legajosS} onChange={e => setLegajosS(e.target.value)}/>
            </div>
            <button id="bg-btn" style={{color: "white", backgroundColor: "#3399ff", fontSize: "large", width: "120px"}}
            onClick={()=>fetchLegajos()}>Buscar</button>
            <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                {legajosF.map((lg) => (
                    <div key={lg.legajo} style={{
                        width: "700px",
                        backgroundColor: "#6495ed",
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "20px",
                        borderRadius: "3px",
                        color: "white",
                        cursor: "pointer",
                        padding: "5px"
                    }}>
                        <table style={{width: "100%"}}>
                            <tbody>
                                <tr >
                                    <th style={legajoTr}>{lg.legajo}</th>
                                    <th style={legajoTr}>{lg.fullname}</th>
                                    <th style={legajoTr}>{lg.cuil}</th>
                                    <th style={legajoTr}>{lg.sector}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    )

}