import { useState,useEffect } from "react";
import type { IAusente, IEmpresa, INovedad, INovLeg } from "../utils/interfaces";
import { useParams } from "react-router";
import Header from "./Header";
import getUniqNovedad from "../utils/getUniqNovedad";
import { getCategoriasNov, getEmpresas } from "../utils/getData";
import getNovedadesLegajo from "../utils/getNovedadesLegajo";
import session from "../utils/session";


export default function NovedadDetail () {

    const params = useParams();
    const [novedad, setNovedad] = useState<INovLeg>();
    const [empresasSele, setEmpresasSele] = useState<IEmpresa[]>([])
    const [novedadesLeg, setNovedadesLeg] = useState<INovedad[] | null>([])
    const [categoriasSele, setCategoriesSele] = useState<string[]>([])
    const [categoria, setCategoria] = useState(0)
    const [dataCheck, setDataCherck] = useState(false)
    const [data, setData] = useState({
        date_start: '',
        date_end: '',
        causa: ''
    })


    const textStyle: React.CSSProperties = {
        fontWeight: "normal",
        color: "#3399ff"
    }
    const parrafoStyle: React.CSSProperties = {
        fontWeight: "normal",
        color: "#3399ff",
        overflowWrap: 'break-word'
    }
    const sectionStyle: React.CSSProperties = {
        maxHeight: "300px",
        display: "inline-block",
        marginLeft: "10px"
    }
    session(true)
    
    useEffect(() => {
        if(params.id) {
            getEmpresas().then(em=>setEmpresasSele(em))
            getUniqNovedad(parseInt(params.id)).then(n => n ? setNovedad(n) : '')
            getCategoriasNov().then(cats=>setCategoriesSele(cats))
        }
    },[])

    useEffect(() => {
        if(novedad?.legajo.legajo)[
            getNovsLegajo(novedad?.legajo.legajo)
        ]
    },[novedad])

    useEffect(() => {
        setData({
            date_end: '',
            date_start: '',
            causa: ''
        })
    },[categoria])

    const novTr: React.CSSProperties = {
        width: "25%",
        border: "1px solid"
    }
    const filterSelect: React.CSSProperties = {
        fontSize: "large", width: "350px"
    }


    const empresaGetter = (id: number | undefined): string => {
        if(novedad && novedad.novedad.empresa_id) {
            let empresa = 'NaN'
            empresasSele.forEach(em => {
                if(em.empresa_id === id) {
                    empresa = em.nombre
                }
            });
            return empresa
        }
        else return "NaN"
    }

    const getNovsLegajo = async (legajo: number) => {
        setNovedadesLeg(null)
        const novs = await getNovedadesLegajo(legajo)
        if(novs && novs.length > 0) setNovedadesLeg(novs)
    }

    const handleData = (prop:string, payload: string | number) => {
        setData({
            ...data,
            [prop]: payload
        })
    }

    const createAusente = () => {
        const ausente = {
            fecha_ausente: data.date_start,
            justificado: dataCheck,
            legajo: novedad?.legajo.legajo,
            novedad_id: novedad?.novedad.novedad_id,
            causa: data.causa
        }
    }

    const displayForms = () => {
        switch(categoria) {
            case 1:
                return(
                    <div>
                        <h1>Suspension</h1>
                    </div>
                )
            case 2:
                return(
                    <div>
                        <h1>Apercibimiento</h1>
                    </div>
                )
            case 3:
            case 4:
            case 5:
            case 6:
                return(
                    <div>
                        <h1>Licencias</h1>
                    </div>
                )
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                return(
                    <div>
                        <h1>Personal</h1>
                    </div>
                )
            case 12:
                return(
                    <div>
                        <h3 id="titulo" style={textStyle}>Fecha: 
                            <input type="date" value={data.date_start} onChange={e => handleData('date_start',e.target.value)}/>
                        </h3>
                        <h3 id="titulo" style={textStyle}>Justificacion: 
                            <input type="checkbox" checked={dataCheck} onChange={e => setDataCherck(e.target.checked)}/>
                        </h3>
                        <div>
                            <h3 id="subtitulo" style={{fontWeight: "normal", color: "#3399ff"}}>
                                Descripcion
                            </h3>
                            <textarea value={data.causa} onChange={e => handleData('causa',e.target.value)}
                            style={{width: "350px", maxWidth: "300px", height: "200px", resize: "none"}}/>
                        </div>
                        <div>
                            <button id="bg-btn" style={{color: "white", backgroundColor: "#3399ff", fontSize: "x-large", width: "160px"}}
                            onClick={() => createAusente()}>Registrar Ausente</button>
                        </div>
                    </div>
                )
            default:
                return(
                <div>
                    <h3 id="titulo" style={textStyle}>Ninguna categoria seleccionada.</h3>
                </div>
                )
        }
    }

    return(
        <div>
            <Header/>
            <h1 id="titulo" style={{fontWeight: "bold", color: "#3399ff", margin: "10px"}}>Novedad - {novedad?.novedad.numero}</h1>
            <hr color='#3399ff'/>
            <div style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{display: "flex", flexDirection: "column",width: "400px"}}>
                <div style={sectionStyle}>
                    <h2 id="titulo" style={{fontWeight: "bold", color: "#3399ff", margin: "10px"}}>Datos de la Novedad</h2>
                    <hr color='#3399ff'/>
                    <h3 id="titulo" style={textStyle}>Fecha de notificacion: {novedad?.novedad.fecha}</h3>
                    <h3 id="titulo" style={textStyle}>Solicitante: {novedad?.novedad.solicitante}</h3>
                    <h3 id="titulo" style={textStyle}>Empresa: {empresaGetter(novedad?.novedad.empresa_id)}</h3>
                </div>
                <div style={sectionStyle}>
                    <h2 id="titulo" style={{fontWeight: "bold", color: "#3399ff", margin: "10px"}}>Datos del Trabajador</h2>
                    <hr color='#3399ff'/>
                    <h3 id="titulo" style={textStyle}>Nombre completo: {novedad?.legajo.fullname}</h3>
                    <h3 id="titulo" style={textStyle}>CUIL: {novedad?.legajo.cuil}</h3>
                    <h3 id="titulo" style={textStyle}>Sector: {novedad?.legajo.sector}</h3>
                </div>
                <div style={sectionStyle}>
                    <h2 id="titulo" style={{fontWeight: "bold", color: "#3399ff", margin: "10px"}}>Causa y Categoria de la Novedad</h2>
                    <hr color='#3399ff'/>
                    <h3 id="titulo" style={textStyle}>Catergoria: {novedad?.novedad.categoria}</h3>
                    <h3 id="titulo" style={textStyle}>Causa:</h3>
                    <div style={{textAlign: "start", width: "400px"}}>
                        <p id="titulo" style={parrafoStyle}>{novedad?.novedad.causa}</p>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column",width: "400px", maxHeight: "800px"}}>
                <h2 id="titulo" style={{fontWeight: "bold", color: "#3399ff", margin: "10px"}}>Acciones a tomar</h2>
                <hr color='#3399ff' style={{width: "100%"}}/>
                <select name="causa" id="causa-selecet" style={filterSelect}
                onChange={e=>setCategoria(parseInt(e.target.value))} value={categoria}>
                    <option value={0}>---</option>
                    {categoriasSele.map((c,i) => (
                        <option key={c} value={(i+1)}>{c}</option>
                    ))}
                </select>
                {displayForms()}

            </div>
            <div style={{display: "flex", flexDirection: "column",width: "620px", marginRight: "5px"}}>
                <h2 id="titulo" style={{fontWeight: "bold", color: "#3399ff", margin: "10px"}}>Historial del Legajo</h2>
                <hr color='#3399ff' style={{width: "100%"}}/>
                <div style={{height: "350px", overflow: "scroll"}}>
                {novedadesLeg ? 
                    <table style={{width: "600px"}}>
                        <tbody>
                            <tr>
                                <th style={novTr}>Nro Novedad</th>
                                <th style={novTr}>Categoria</th>
                                <th style={novTr}>Fecha</th>
                                <th style={novTr}>Solicitante</th>
                            </tr>
                            {novedadesLeg.map((n) => (
                            <tr onClick={() => window.location.href = '/Novedad/'+n.novedad_id}>
                                <th style={novTr}>{n.numero}</th>
                                <th style={novTr}>{n.categoria}</th>
                                <th style={novTr}>{n.fecha}</th>
                                <th style={novTr}>{n.solicitante}</th>
                            </tr>
                            ))}

                        </tbody>
                    </table>
                    : 
                    <h3 style={{fontWeight: "bold", color: "#3399ff", marginTop:"15px"}}>El legajo no tiene novedades</h3>
                    }
                </div>
                <div>
                <h2 id="titulo" style={{fontWeight: "bold", color: "#3399ff", margin: "10px"}}>Acciones asociadas a la novedad.</h2>
                <hr color='#3399ff' style={{width: "100%"}}/>
                </div>
                <div style={{height: "250px", overflow: "scroll"}}>
                    <table style={{width: "600px"}}>
                        <tbody>
                            <tr>
                                <th style={novTr}>Tipo</th>
                                <th style={novTr}>Fecha</th>
                                <th style={novTr}>Categoria</th>
                            </tr>
                            {novedad?.ausentes.map((n) => (
                            <tr>
                                <th style={novTr}>Ausente</th>
                                <th style={novTr}>{n.fecha}</th>
                                <th style={novTr}>{n.justificado ? "Justificado" : "No Justificado"}</th>
                            </tr>
                            ))}
                            {novedad?.licencias.map((n) => (
                            <tr>
                                <th style={novTr}>Licencia</th>
                                <th style={novTr}>{n.fecha}</th>
                                <th style={novTr}>{n.categoria}</th>
                            </tr>
                            ))}
                            {novedad?.personal.map((n) => (
                            <tr>
                                <th style={novTr}>Personal</th>
                                <th style={novTr}>{n.fecha}</th>
                                <th style={novTr}>{n.categoria}</th>
                            </tr>
                            ))}
                            {novedad?.sanciones.map((n) => (
                            <tr>
                                <th style={novTr}>Sancion</th>
                                <th style={novTr}>{n.fecha}</th>
                                <th style={novTr}>{n.tipo}</th>
                            </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            </div>

        </div>
    )
}