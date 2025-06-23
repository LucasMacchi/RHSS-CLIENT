import { useState } from "react";
import session from "../utils/session";
import Header from "./Header";
import type { ILegajo, INovedad } from "../utils/interfaces";
import { getLegajos } from "../utils/getData";
import getNovedadesLegajo from "../utils/getNovedadesLegajo";

export default function Legajos () {

    const [legajosF, setLegajosF] = useState<ILegajo[]>([])
    const [legajosS, setLegajosS] = useState<string>('')
    const [novedades, setNovedades] = useState<INovedad[] | null>()
    const [legajoN, setLegajoN] = useState<ILegajo>({legajo: 0, cuil: 0, fullname: '', sector: '', direccion: '', fecha_egreso: ''})
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

    const getNovsLegajo = async (legajo: ILegajo) => {
        setNovedades(null)
        setLegajoN(legajo)
        const novs = await getNovedadesLegajo(legajo.legajo)
        if(novs && novs.length > 0) setNovedades(novs)
    }

    const novTr: React.CSSProperties = {
        width: "25%",
        border: "1px solid"
    }

    const displayNovedades = () => {
        if(legajoN){
            return(
            <div 
            style={{width: "700px", display: "flex",flexDirection: "column", alignItems: "center", 
            border: "1px solid", marginTop: "10px"}}>
                <h1 style={{fontWeight: "bold", color: "#3399ff"}}>Legajo {legajoN.legajo}</h1>
                <div style={{alignSelf: "start", textAlign: "start", marginLeft: "10px"}}>
                    <h4 style={{fontWeight: "bold", color: "#3399ff"}}>Nombre: {legajoN.fullname}</h4>
                    <h4 style={{fontWeight: "bold", color: "#3399ff"}}>Cuil: {legajoN.cuil}</h4>
                    <h4 style={{fontWeight: "bold", color: "#3399ff"}}>Sector: {legajoN.sector}</h4>
                    <h4 style={{fontWeight: "bold", color: "#3399ff"}}>Direccion: {legajoN.direccion}</h4>
                </div>
                <h1 style={{fontWeight: "bold", color: "#3399ff"}}>Novedades del Legajo</h1>
                <div style={{height: "400px", overflow: "scroll"}}>
                    {novedades ? 
                    <table style={{width: "600px", maxHeight: "400px"}}>
                        <tbody>
                            <tr >
                                <th style={novTr}>Nro Novedad</th>
                                <th style={novTr}>Categoria</th>
                                <th style={novTr}>Fecha</th>
                                <th style={novTr}>Solicitante</th>
                                <th style={novTr}>Estado</th>
                            </tr>
                            {novedades.map((n) => (
                            <tr onClick={() => window.location.href = '/Novedad/'+n.novedad_id}>
                                <th style={novTr}>{n.numero}</th>
                                <th style={novTr}>{n.categoria}</th>
                                <th style={novTr}>{n.fecha}</th>
                                <th style={novTr}>{n.solicitante}</th>
                                <th style={novTr}>{n.cerrado ? "Cerrado" : "Abierto"}</th>
                            </tr>
                            ))}

                        </tbody>
                    </table>
                    : 
                    <h3 style={{fontWeight: "bold", color: "#3399ff", marginTop:"15px"}}>El legajo no tiene novedades</h3>
                    }
                </div>
            </div>
            )
        }
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
            <div style={{display: "flex"}}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
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
                                    <tr onClick={()=>getNovsLegajo(lg)}>
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
                {legajoN.legajo > 0 ? displayNovedades() : ''}
            </div>

        </div>
    )

}