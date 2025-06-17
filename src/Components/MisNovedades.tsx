import { useState,useEffect } from "react";
import Header from "./Header";
import type { IEmpresa, INovedad, INovFilter } from "../utils/interfaces";
import getNovedades from "../utils/getNovedades";
import { getCategoriasNov, getEmpresas } from "../utils/getData";

import session from "../utils/session";

export default function MisNovedades () {


    const [novedades, setNovedades] = useState<INovedad[]>([])
    const [empresa, setEmpresa] = useState(0)
    const [solicitnate, _setSolicitante] = useState('')
    const [categoria, setCategoria] = useState('')
    const [numero, setNumero] = useState('')
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [load, setLoading] = useState(false)
    const [empresasSele, setEmpresasSele] = useState<IEmpresa[]>([])
    const [categoriasSele, setCategoriesSele] = useState<string[]>([])
    

    session(true)
    
    useEffect(() => {
        getEmpresas().then(em=>setEmpresasSele(em))
        getCategoriasNov().then(cats=>setCategoriesSele(cats))
    },[])

    useEffect(() => {setNovedades([])},[numero])

    const filterDivStyle: React.CSSProperties = {
     color: "#6495ed", marginLeft: "100px"
    }
    const filterTitle: React.CSSProperties = {
        margin: "5px"
    }
    const filterSelect: React.CSSProperties = {
        fontSize: "large", width: "200px"
    }
    const nroChecker = ():boolean => {
        if(numero.length > 0) return true
        return false
    }

    const searchNovedades = () => {
        setNovedades([])
        setLoading(true)
        setNumero('')
        if(empresa && dateEnd.length > 0 && dateStart.length > 0) {
            const fitler: INovFilter = {
                fecha_final: dateEnd,
                fecha_inicio: dateStart,
                categoria: categoria,
                solicitante: solicitnate,
                empresa_id: empresa
            }
            setLoading(true)
            setTimeout(async () => {
                const novedadesR = await getNovedades(fitler, numero)
                setNovedades(novedadesR)
                setLoading(false)
            }, 1500);
        }
        else if(numero.length > 4) {
            const fitler: INovFilter = {
                fecha_final: dateEnd,
                fecha_inicio: dateStart,
                categoria: categoria,
                solicitante: solicitnate,
                empresa_id: 0
            }
            setLoading(true)
            setTimeout(async () => {
                const novedadesR = await getNovedades(fitler, numero)
                setNovedades(novedadesR)
                setLoading(false)
            }, 1500);
        }
        else {
            setLoading(false)
            alert("Seleccione fechas validas y una empresa. Si busca el numero de novedad tiene que tener 5 digitos como minimo.")
        }
    }

        const novedadesDisplay = () => {
        if(novedades.length > 0 ) {
            return (
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                {novedades.map((n) => (
                    <div key={n.numero} style={{
                        width: "450px",
                        backgroundColor: "#6495ed",
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "20px",
                        borderRadius: "3px",
                        color: "white",
                        cursor: "pointer"
                    }} onClick={() => window.location.href = '/Novedad/'+n.novedad_id}>
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
                    <h1 id="titulo" style={{fontWeight: "bold", color: "#3399ff"}}>No hay novedades.</h1>
                </div>
            )
        }
    }

    return(
        <div style={{textAlign: "center"}}>
            <Header/>
            <h1 id="titulo" style={{fontWeight: "bold", color: "#3399ff"}}>Mis Novedades</h1>
            <hr color='#3399ff'/>
            <div>
            <div style={{
                display: "flex",
                marginBottom: "20px"
            }}
            >
                <div style={filterDivStyle}>
                    <h3 style={filterTitle}>Numero</h3>
                    <input type="text" value={numero} onChange={e => setNumero(e.target.value)}/>
                </div>
                <div style={filterDivStyle}>
                    <h3 style={filterTitle}>Empresa</h3>
                    <select name="causa" id="causa-selecet" style={filterSelect} disabled={nroChecker()}
                    onChange={e=>setEmpresa(parseInt(e.target.value))} value={empresa}>
                        <option value={0}>---</option>
                        {empresasSele.map((e) => (
                            <option key={e.empresa_id+e.nombre} value={e.empresa_id}>{e.nombre}</option>
                        ))}
                    </select>
                </div>
                <div style={filterDivStyle}>
                    <h3 style={filterTitle} >Categoria</h3>
                    <select name="causa" id="causa-selecet" style={filterSelect} disabled={nroChecker()}
                    onChange={e=>setCategoria(e.target.value)} value={categoria}>
                        <option value={''}>---</option>
                        {categoriasSele.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div style={filterDivStyle}>
                    <h3 style={filterTitle} >Fecha inicio</h3>
                    <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} disabled={nroChecker()}/>
                </div>
                <div style={filterDivStyle}>
                    <h3 style={filterTitle} >Fecha Final</h3>
                    <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} disabled={nroChecker()}/>
                </div>
                
            </div>
            <h5 style={{color: "#3399ff", margin: "5px"}} >Para actualizar las novedades debes volver a buscar.</h5>
            <button id="bg-btn" style={{color: "white", backgroundColor: "#3399ff", fontSize: "large", width: "120px"}} disabled={load} 
            onClick={()=>searchNovedades()}>{load ? "Buscando...." : "Buscar"}</button>
            </div>
            <hr color='#3399ff'/>
            {novedadesDisplay()}
        </div>
    )
}