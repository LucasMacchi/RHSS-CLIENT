import { useState,useEffect } from "react";
import type { IAlta, IAction, IEmpresa, INovedad, INovLeg } from "../utils/interfaces";
import { useParams } from "react-router";
import Header from "./Header";
import getUniqNovedad from "../utils/getUniqNovedad";
import {getCategoriasNov, getEmpresas } from "../utils/getData";
import getNovedadesLegajo from "../utils/getNovedadesLegajo";
import session from "../utils/session";
import { changeState, createAltaFn, createAusenteFn, createLicenciaFn, createPersonalFn, createSancionFn, createTardanzaFn, deleteFileFn, getArchivo, postArchivo } from "../utils/createActions";


export default function NovedadDetail () {

    const params = useParams();
    const [novedad, setNovedad] = useState<INovLeg>();
    const [empresasSele, setEmpresasSele] = useState<IEmpresa[]>([])
    const [novedadesLeg, setNovedadesLeg] = useState<INovedad[] | null>([])
    const [categoriasSele, setCategoriesSele] = useState<string[]>([])
    const [categoria, setCategoria] = useState(0)
    const [dataCheck, setDataCherck] = useState(false)
    const [concepto, setConcepto] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [altaData, setAltaData]= useState<IAlta>({
        fecha_ingreso: '',
        cuit: 0,
        direccion: '',
        nacimiento: '',
        jornada: 0,
        lugar: '',
        categoria: '',
        novedad: 0
    })
    const [data, setData] = useState({
        date_start: '',
        date_end: '',
        causa: ''
    })
    const [action, setAction] = useState<IAction> ({
        legajo: 0,
        fecha: '',
        categoria: '',
        causa: ''
    })


    const textStyle: React.CSSProperties = {
        fontWeight: "normal",
        color: "#3399ff",
        margin: "5px",
        textAlign: "left"
    }
    const textStyleData: React.CSSProperties = {
        fontWeight: "bolder",
        margin: "5px",
        textAlign: "left"

    }
    const parrafoStyle: React.CSSProperties = {
        fontWeight: "normal",
        color: "#3399ff",
        overflowWrap: 'break-word'
    }
    const sectionStyle: React.CSSProperties = {
        maxHeight: "380px",
        display: "inline-block",
        marginLeft: "10px",
        height: "100%"
    }
    const sectionActionStyle: React.CSSProperties = {
        maxHeight: "326px",
        display: "inline-block",
        marginLeft: "10px",
        height: "100%"
    }

    useEffect(() => {
        session(true)
        setTimeout(() => {
            if(params.id) {
                getEmpresas().then(em=>setEmpresasSele(em))
                getUniqNovedad(parseInt(params.id)).then(n => n ? setNovedad(n) : '')
                getCategoriasNov().then(cats=>setCategoriesSele(cats))
            }
        }, 2000);

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
        setConcepto('')
        setFile(null)
    },[categoria])

    const novTr: React.CSSProperties = {
        width: "25%",
        border: "1px solid"
    }
    const filterSelect: React.CSSProperties = {
        fontSize: "large", width: "350px"
    }
    const filterSelectSmall: React.CSSProperties = {
        fontSize: "large", width: "200px"
    }
    const btnRegister: React.CSSProperties = {
        color: "white", backgroundColor: "#3399ff", fontSize: "large", width: "200 px", height: "40px"
    }
    const textAreaStyle: React.CSSProperties = {
        width: "350px", maxWidth: "300px", height: "120px", resize: "none", overflow: "scroll"
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

    const handleAlta = (prop: string, payload: string | number) => {
        setAltaData({...altaData,[prop]:payload})
    }

    const handleActionData = (legajo: number, fecha: string, causa: string, categoria: string, fecha_inicial?:string, fecha_final?:string) => {
        const data: IAction = {
            legajo,
            fecha,
            causa,
            categoria,
            fecha_inicial,
            fecha_final
        }
        setAction(data)
    }

    const createAusente = async () => {
        if(confirm('Quieres crear la accion?') && novedad && data.causa.length > 50 && data.date_start.length > 0) {
            const ausente = {
                fecha_ausente: data.date_start,
                justificado: dataCheck,
                legajo: novedad.legajo.legajo,
                novedad_id: novedad.novedad.novedad_id,
                causa: data.causa
            }
            if(categoria !== 17){
                const res = await createAusenteFn(ausente)
                if(res) {
                    alert("Ausente creado.")
                    window.location.reload()
                    setData({date_end: '',date_start: '',causa: ''})
                }
                else alert("Error al crear ausente.")
            }
            else {
                const res = await createTardanzaFn(ausente)
                if(res) {
                    alert("Tardanza creada.")
                    window.location.reload()
                    setData({date_end: '',date_start: '',causa: ''})
                }
                else alert("Error al crear ausente.")
            }

        } else alert("Debe ingresar una causa con no menos de 50 caracteres y una fecha valida.")
    }
    const createPersonal = async () => {
        if(confirm('Quieres crear la accion?') && novedad && data.causa.length > 50 && data.date_start.length > 0) {
            const personal = {
                fecha_ocurrido: data.date_start,
                categoria: categoriasSele[categoria - 1],
                legajo: novedad.legajo.legajo,
                novedad_id: novedad.novedad.novedad_id,
                causa: data.causa
            }
            const res = await createPersonalFn(personal)
            if(res) {
                alert("Incidente creado.")
                window.location.reload()
                setData({date_end: '',date_start: '',causa: ''})
            }
            else alert("Error al crear Incidente.")
        } else alert("Debe ingresar una causa con no menos de 50 caracteres y una fecha valida.")
    }
    const createLicencia = async () => {
        if(confirm('Quieres crear la accion?') && novedad && data.causa.length > 50 && data.date_start.length > 0 && data.date_end.length > 0) {
            const licencia = {
                fecha_salida: data.date_start,
                fecha_entrada: data.date_end,
                legajo: novedad.legajo.legajo,
                novedad: novedad.novedad.novedad_id,
                causa: data.causa,
                categoria: categoriasSele[categoria - 1]
            }
            const res = await createLicenciaFn(licencia)
            if(res) {
                alert("Licencia creada.")
                window.location.reload()
                setData({date_end: '',date_start: '',causa: ''})
            }
            else alert("Error al crear la licencia.")
        } else alert("Debe ingresar una causa con no menos de 50 caracteres y una fecha valida de salida y entrada.")
    }
    const createSancion = async (suspencion: boolean) => {
        if(suspencion) {
            if(confirm('Quieres crear la accion?') && novedad && data.causa.length > 50 && data.date_start.length > 0 && data.date_end.length > 0) {
                const sancion = {
                    fecha_inicio: data.date_start,
                    fecha_final: data.date_end,
                    legajo: novedad.legajo.legajo,
                    novedad_id: novedad.novedad.novedad_id,
                    causa: data.causa,
                    tipo: "SUSPENCION"
                }
                const res = await createSancionFn(sancion)
                if(res) {
                    alert("Sancion creado.")
                    window.location.reload()
                    setData({date_end: '',date_start: '',causa: ''})
                }
                else alert("Error al crear la sancion.")
            } else alert("Debe ingresar una causa con no menos de 50 caracteres y una fecha valida de inicio y final.")
        }
        else {
            if(confirm('Quieres crear la accion?') && novedad && data.causa.length > 50) {
                const sancion = {
                    legajo: novedad.legajo.legajo,
                    novedad_id: novedad.novedad.novedad_id,
                    causa: data.causa,
                    tipo: "APERCIBIMIENTO"
                }
                const res = await createSancionFn(sancion)
                if(res) {
                    alert("Ausente creado.")
                    window.location.reload()
                    setData({date_end: '',date_start: '',causa: ''})
                }
                else alert("Error al crear la sancion.")
            } else alert("Debe ingresar una causa con no menos de 50 caracteres y una fecha valida.")
        }

    }

    const createArchivo = async () => {
        if(file && concepto && novedad?.novedad) {
            const res = await postArchivo(novedad.novedad.numero,novedad.novedad.novedad_id,concepto,file)
            if(res) {
                alert("Archivo guardado!")
                window.location.reload()
            } else alert("Error al subir")
        }
        else alert("Ingrese un concepto y suba un archivo.")
    }

    const downloadFile = async (url: string) => {
        if(confirm("Quieres descargar el archivo?")){
            await getArchivo(url)
        }
    }
    
    const changeStateNov = async () => {
        if(novedad && novedad.novedad && confirm(novedad?.novedad.cerrado ? "Quieres reabrir la novedad" : "Quieres cerrar la novedad?")) {
            const res = await changeState(novedad.novedad.novedad_id)
            if(res) {
                alert("Cambios aplicados.")
                window.location.reload()
            }
            else alert("No se pudo aplicar los cambios.")
        }
    }

    const createAlta = async () => {
        console.log(altaData, novedad?.novedad.novedad_id)
        if(altaData.categoria.length>0 && altaData.direccion.length>0 && 
            altaData.fecha_ingreso.length>0 && altaData.lugar.length>0 &&
            altaData.nacimiento.length>0 && altaData.cuit && altaData.jornada
            && novedad && novedad.novedad && novedad.novedad.novedad_id
        ){
            if(confirm("Quieres realizar una nueva Alta?")) {
                const data = altaData
                data.novedad = novedad.novedad.novedad_id
                await createAltaFn(data)
                alert("Alta creada")
                setAltaData({
                    fecha_ingreso: '',
                    cuit: 0,
                    direccion: '',
                    nacimiento: '',
                    jornada: 0,
                    lugar: '',
                    categoria: '',
                    novedad: 0
                })
                window.location.reload()
            }
        }
        else alert("Faltan datos.")

    }

    const deleteFile = async (url: string, concepto: string, id:number) => {
        if(url && confirm("Quieres eliminar el archivo de concepto "+concepto+"?")) {
            const res = await deleteFileFn(url,id)
            if(res) {
                alert("Archivo Eliminado!")
                window.location.reload()
            }
            else alert("Error al eliminar el archivo")
        }
    }

    const displayForms = () => {
        switch(categoria) {
            case 1:
                return(
                    <div style={sectionActionStyle} >
                        <h3 id="titulo" style={textStyle}>Fecha de inicio: 
                            <input type="date" value={data.date_start} onChange={e => handleData('date_start',e.target.value)}/>
                        </h3>
                        <h3 id="titulo" style={textStyle}>Fecha de final: 
                            <input type="date" value={data.date_end} onChange={e => handleData('date_end',e.target.value)}/>
                        </h3>
                        <div>
                            <h3 id="subtitulo" style={textStyle}>
                                Descripcion
                            </h3>
                            <h5 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                Minimo de 50 caracteres - Actuales {data.causa.length}
                            </h5>
                            <textarea value={data.causa} onChange={e => handleData('causa',e.target.value)}
                            style={textAreaStyle}/>
                        </div>
                        <div>
                            <button id="bg-btn" style={btnRegister}
                            onClick={() => createSancion(true)}>Registrar Sancion</button>
                        </div>
                    </div>
                )
            case 2:
                return(
                    <div style={sectionActionStyle}>
                        <div>
                            <h3 id="subtitulo" style={textStyle}>
                                Descripcion
                            </h3>
                            <h5 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                Minimo de 50 caracteres - Actuales {data.causa.length}
                            </h5>
                            <textarea value={data.causa} onChange={e => handleData('causa',e.target.value)}
                            style={textAreaStyle}/>
                        </div>
                        <div>
                            <button id="bg-btn" style={btnRegister}
                            onClick={() => createSancion(false)}>Registrar Sancion</button>
                        </div>
                    </div>
                )
            case 3:
            case 4:
            case 5:
            case 6:
                return(
                    <div style={sectionActionStyle}>
                        <h3 id="titulo" style={textStyle}>Fecha de salida: 
                            <input type="date" value={data.date_start} onChange={e => handleData('date_start',e.target.value)}/>
                        </h3>
                        <h3 id="titulo" style={textStyle}>Fecha de entrada: 
                            <input type="date" value={data.date_end} onChange={e => handleData('date_end',e.target.value)}/>
                        </h3>
                        <div>
                            <h3 id="subtitulo" style={textStyle}>
                                Descripcion
                            </h3>
                            <h5 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                Minimo de 50 caracteres - Actuales {data.causa.length}
                            </h5>
                            <textarea value={data.causa} onChange={e => handleData('causa',e.target.value)}
                            style={textAreaStyle}/>
                        </div>
                        <div>
                            <button id="bg-btn" style={btnRegister}
                            onClick={() => createLicencia()}>Registrar Licencia</button>
                        </div>
                    </div>
                )
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
                return(
                    <div style={sectionActionStyle}>
                        <h3 id="titulo" style={textStyle}>Fecha Ocurrido: 
                            <input type="date" value={data.date_start} onChange={e => handleData('date_start',e.target.value)}/>
                        </h3>
                        <div>
                            <h3 id="subtitulo" style={textStyle}>
                                Descripcion
                            </h3>
                            <h5 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                Minimo de 50 caracteres - Actuales {data.causa.length}
                            </h5>
                            <textarea value={data.causa} onChange={e => handleData('causa',e.target.value)}
                            style={textAreaStyle}/>
                        </div>
                        <div>
                            <button id="bg-btn" style={btnRegister}
                            onClick={() => createPersonal()}>Registrar Situacion</button>
                        </div>
                    </div>
                )
            case 16:
                return(
                    <div style={sectionActionStyle}>
                        <h3 id="titulo" style={textStyle}>Fecha: 
                            <input type="date" value={data.date_start} onChange={e => handleData('date_start',e.target.value)}/>
                        </h3>
                        <h3 id="titulo" style={textStyle}>Justificacion: 
                            <input type="checkbox" checked={dataCheck} onChange={e => setDataCherck(e.target.checked)}/>
                        </h3>
                        <div>
                            <h3 id="subtitulo" style={textStyle}>
                                Descripcion
                            </h3>
                            <h5 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                Minimo de 50 caracteres - Actuales {data.causa.length}
                            </h5>
                            <textarea value={data.causa} onChange={e => handleData('causa',e.target.value)}
                            style={textAreaStyle}/>
                        </div>
                        <div>
                            <button id="bg-btn" style={btnRegister}
                            onClick={() => createAusente()}>Registrar Ausente</button>
                        </div>
                    </div>
                )
            case 17:
                return(
                    <div style={sectionActionStyle}>
                        <h3 id="titulo" style={textStyle}>Fecha: 
                            <input type="date" value={data.date_start} onChange={e => handleData('date_start',e.target.value)}/>
                        </h3>
                        <h3 id="titulo" style={textStyle}>Justificacion: 
                            <input type="checkbox" checked={dataCheck} onChange={e => setDataCherck(e.target.checked)}/>
                        </h3>
                        <div>
                            <h3 id="subtitulo" style={textStyle}>
                                Descripcion
                            </h3>
                            <h5 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                Minimo de 50 caracteres - Actuales {data.causa.length}
                            </h5>
                            <textarea value={data.causa} onChange={e => handleData('causa',e.target.value)}
                            style={textAreaStyle}/>
                        </div>
                        <div>
                            <button id="bg-btn" style={btnRegister}
                            onClick={() => createAusente()}>Registrar Tardanza</button>
                        </div>
                    </div>
                )
            case 18:
                return(
                    <div style={sectionActionStyle}>
                        <table>
                            <tbody>
                                <tr>
                                    <th><h3 id="titulo" style={textStyle}>Fecha de Ingreso: </h3></th>
                                    <th><input type="date" value={altaData.fecha_ingreso} onChange={e => handleAlta('fecha_ingreso',e.target.value)}/></th>
                                </tr>
                                <tr>
                                    <th><h3 id="titulo" style={textStyle}>CUIL:</h3></th>
                                    <th><input type="number" value={altaData.cuit} onChange={e => handleAlta("cuit",e.target.value)}/></th>
                                </tr>
                                <tr>
                                    <th><h3 id="titulo" style={textStyle}>Direccion:</h3></th>
                                    <th><input type="text" value={altaData.direccion} onChange={e => handleAlta("direccion",e.target.value)}/></th>
                                </tr>
                                <tr>
                                    <th><h3 id="titulo" style={textStyle}>Nacimiento:</h3></th>
                                    <th><input type="date" value={altaData.nacimiento} onChange={e => handleAlta("nacimiento",e.target.value)}/></th>
                                </tr>
                                <tr>
                                    <th><h3 id="titulo" style={textStyle}>Jornada:</h3></th>
                                    <th>
                                        <select name="causa" id="causa-selecet" style={filterSelectSmall}
                                        onChange={e=>handleAlta("jornada" ,e.target.value)} value={altaData.jornada}>
                                            <option value={''}>---</option>
                                            <option value={'Completa'}>JORNADA COMPLETA</option>
                                            <option value={'Parcial'}>JORNADA PARCIAL</option>
                                        </select>
                                    </th>
                                </tr>
                                <tr>
                                    <th><h3 id="titulo" style={textStyle}>Categoria:</h3></th>
                                    <th><input type="text" value={altaData.categoria} onChange={e => handleAlta("categoria",e.target.value)}/></th>
                                </tr>
                                <tr>
                                    <th><h3 id="titulo" style={textStyle}>Lugar de Trabajo:</h3></th>
                                    <th>
                                        <textarea value={altaData.lugar} onChange={e => handleAlta('lugar',e.target.value)}
                                        style={textAreaStyle}/>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button id="bg-btn" style={btnRegister}
                            onClick={() => createAlta()}>Registrar Alta</button>
                        </div>
                    </div>
                )
            case 25:
                return(
                    <div style={sectionActionStyle}>
                        <h3 id="subtitulo" style={textStyle}>
                            Concepto
                        </h3>
                        <input style={{width: "300px"}} type="text" value={concepto} onChange={e => setConcepto(e.target.value)}/>
                        <h3 id="subtitulo" style={textStyle}>
                            Archivo
                        </h3>
                        <h5 id="subtitulo" style={{...textStyle, margin: "5px"}}>Limite de 10MB</h5>
                        <input style={{width: "300px", marginBottom: "30px"}} type="file" onChange={e => e.target.files && setFile(e.target.files[0])}/>
                        <div>
                            <button id="bg-btn" style={btnRegister}
                            onClick={() => createArchivo()}>Subir Archivo</button>
                        </div>
                    </div>
                )
            case 26:
                return (
                    <div style={{...sectionActionStyle, marginTop: "30px"}}>
                    <h4 id="titulo" style={{fontWeight: "bold", color: "crimson", margin: "10px"}}>Haga click en el archivo que desee eliminar.</h4>
                    <table style={{width: "400px"}}>
                        <tbody>
                            <tr>
                                <th style={novTr}>Tipo</th>
                                <th style={novTr}>Fecha</th>
                                <th style={novTr}>Categoria/Concepto</th>
                            </tr>
                            {novedad?.archivos.map((a) => (
                            <tr onClick={() => deleteFile(a.ruta, a.concepto, a.archivo_id)}>
                                <th style={novTr}>Archivo</th>
                                <th style={novTr}>{a.fecha}</th>
                                <th style={novTr}>{a.concepto}</th>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                )
            case 27:
                return (
                    <div style={{...sectionActionStyle, marginTop: "30px"}}>
                        <div>
                            <button id="bg-btn" style={btnRegister}
                            onClick={() => changeStateNov()}>{novedad?.novedad.cerrado ? "REABRIR NOVEDAD" : "CERRAR NOVEDAD"}</button>
                        </div>
                    </div>
                )
            default:
                return(
                <div style={sectionActionStyle}>
                    <h3 id="titulo" style={textStyle}>Ninguna categoria seleccionada.</h3>
                </div>
                )
        }
    }

    const displayAction = () => {
        if(action.legajo) {
            return (
                <div style={{marginTop:"80px"}}>
                    <h2 id="titulo" style={{fontWeight: "bold", color: "#3399ff", margin: "10px"}}>{action.categoria +" - "+action.fecha}</h2>
                    <hr color='#3399ff' style={{width: "100%"}}/>
                    <h3 id="titulo" style={textStyle}>Fecha de lo ocurrido o inicial: {action.fecha_inicial}</h3>
                    {action.fecha_final  ? 
                    <h3 id="titulo" style={textStyle}>Fecha final: {action.fecha_inicial}</h3> : ''}
                    <h3 id="titulo" style={textStyle}>Causa:</h3>
                    <div style={{textAlign: "start", width: "400px"}}>
                        <p id="titulo" style={parrafoStyle}>{action.causa}</p>
                    </div>
                </div>
            )
        }
    }

    return(
        <div>
            <Header/>
            <h1 id="titulo" style={{fontWeight: "bold", color: novedad?.novedad.cerrado ? "crimson" :"#3399ff", margin: "10px"}}>Novedad - {novedad?.novedad.numero} - {novedad?.novedad.cerrado ? "Cerrado" : "Abierto"}</h1>
            <hr color='#3399ff'/>
            <div style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{display: "flex", flexDirection: "column",width: "400px"}}>
                <div style={sectionStyle}>
                    <h2 id="titulo" style={{fontWeight: "bold", color: "#3399ff", margin: "10px"}}>Datos de la Novedad</h2>
                    <hr color='#3399ff'/>
                    <table >
                        <tbody>
                            <tr >
                                <th><h3 style={textStyle}>Fecha de notificacion:</h3></th>
                                <th><h3 style={textStyleData}>{novedad?.novedad.fecha}</h3></th>
                            </tr>
                            <tr >
                                <th><h3 id="titulo" style={textStyle}>Solicitante:</h3></th>
                                <th><h3 id="titulo" style={textStyleData}>{novedad?.novedad.solicitante}</h3></th>
                            </tr>
                            <tr >
                                <th><h3 id="titulo" style={textStyle}>Empresa:</h3></th>
                                <th><h3 id="titulo" style={textStyleData}>{empresaGetter(novedad?.novedad.empresa_id)}</h3></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={sectionStyle}>
                    <h2 id="titulo" style={{fontWeight: "bold", color: "#3399ff", margin: "10px"}}>Datos del Operario</h2>
                    <hr color='#3399ff'/>
                    <table >
                        <tbody>
                            <tr >
                                <th><h3 style={textStyle}>Nombre completo:</h3></th>
                                <th><h3 style={textStyleData}>{novedad?.legajo.fullname}</h3></th>
                            </tr>
                            <tr >
                                <th><h3 id="titulo" style={textStyle}>CUIL:</h3></th>
                                <th><h3 id="titulo" style={textStyleData}>{novedad?.legajo.cuil}</h3></th>
                            </tr>
                            <tr >
                                <th><h3 id="titulo" style={textStyle}>Sector:</h3></th>
                                <th><h3 id="titulo" style={textStyleData}>{novedad?.legajo.sector}</h3></th>
                            </tr>
                            <tr >
                                <th><h3 id="titulo" style={textStyle}>Direccion:</h3></th>
                                <th><h3 id="titulo" style={textStyleData}>{novedad?.legajo.direccion ? novedad?.legajo.direccion : "NaN"}</h3></th>
                            </tr>
                            <tr >
                                <th><h3 id="titulo" style={textStyle}>Email:</h3></th>
                                <th><h3 id="titulo" style={textStyleData}>{novedad?.novedad.email ? novedad?.novedad.email : "NaN"}</h3></th>
                            </tr>
                            <tr >
                                <th><h3 id="titulo" style={textStyle}>Telefono:</h3></th>
                                <th><h3 id="titulo" style={textStyleData}>{novedad?.novedad.telefono ? novedad?.novedad.telefono : "NaN"}</h3></th>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div style={sectionStyle}>
                    <h2 id="titulo" style={{fontWeight: "bold", color: "#3399ff", margin: "10px"}}>Causa de la Novedad</h2>
                    <hr color='#3399ff'/>
                    <table >
                        <tbody>
                            <tr >
                                <th><h3 style={textStyle}>Catergoria:</h3></th>
                                <th><h3 style={textStyleData}>{novedad?.novedad.categoria}</h3></th>
                            </tr>
                        </tbody>
                    </table>
                    <h3 id="titulo" style={textStyle}>Causa:</h3>
                    <div style={{textAlign: "start", width: "400px"}}>
                        {novedad?.novedad.causa.split('+').map((p) => (
                            <p id="titulo" style={parrafoStyle}>{p}</p>
                        ))}
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
                    <option value={25}>SUBIR ARCHIVO</option>
                    <option value={26}>ELIMINAR ARCHIVO</option>
                    <option value={27}>{novedad?.novedad.cerrado ? "REABRIR NOVEDAD" : "CERRAR NOVEDAD"}</option>
                </select>
                {displayForms()}
                {displayAction()}
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
                            <tr onClick={() => window.location.href = '/Novedad/'+n.novedad_id} 
                            style={{backgroundColor: novedad?.novedad.novedad_id === n.novedad_id ? "#3399ff" : "white"}}>
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
                <h2 id="titulo" style={{fontWeight: "bold", color: "#3399ff", margin: "10px"}}>Acciones asociadas a la novedad</h2>
                <h5 style={{margin: "5px",color:"#3399ff"}} >Para descargar un archivo, haz click en el mismo en la tabla</h5>
                <hr color='#3399ff' style={{width: "100%"}}/>
                </div>
                <div style={{height: "250px", overflow: "scroll"}}>
                    <table style={{width: "600px"}}>
                        <tbody>
                            <tr>
                                <th style={novTr}>Tipo</th>
                                <th style={novTr}>Fecha</th>
                                <th style={novTr}>Categoria/Concepto</th>
                            </tr>
                            {novedad?.ausentes.map((n) => (
                            <tr onClick={() => handleActionData(n.legajo, n.fecha, n.causa, n.categoria, n.fecha_ausentada)}>
                                <th style={novTr}>{n.categoria}</th>
                                <th style={novTr}>{n.fecha}</th>
                                <th style={novTr}>{n.justificado ? "Justificado" : "No Justificado"}</th>
                            </tr>
                            ))}
                            {novedad?.licencias.map((n) => (
                            <tr onClick={() => handleActionData(n.legajo, n.fecha, n.causa, n.categoria, n.fecha_salida, n.fecha_entrada)}>
                                <th style={novTr}>Licencia</th>
                                <th style={novTr}>{n.fecha}</th>
                                <th style={novTr}>{n.categoria}</th>
                            </tr>
                            ))}
                            {novedad?.personal.map((n) => (
                            <tr onClick={() => handleActionData(n.legajo, n.fecha, n.causa, n.categoria, n.fecha_ocurrido)}>
                                <th style={novTr}>Personal</th>
                                <th style={novTr}>{n.fecha}</th>
                                <th style={novTr}>{n.categoria}</th>
                            </tr>
                            ))}
                            {novedad?.sanciones.map((n) => (
                            <tr onClick={() => handleActionData(n.legajo, n.fecha, n.causa, n.tipo, n.fecha_inicio, n.fecha_final)}>
                                <th style={novTr}>Sancion</th>
                                <th style={novTr}>{n.fecha}</th>
                                <th style={novTr}>{n.tipo}</th>
                            </tr>
                            ))}
                            {novedad?.archivos.map((a) => (
                            <tr onClick={() => downloadFile(a.ruta)}>
                                <th style={novTr}>Archivo</th>
                                <th style={novTr}>{a.fecha}</th>
                                <th style={novTr}>{a.concepto}</th>
                            </tr>
                            ))}
                            {novedad?.altas.map((a) => (
                            <tr onClick={() => handleActionData(a.cuit, a.fecha ? a.fecha : a.fecha_ingreso, `Nuevo legajo creado, CUIL ${a.cuit}, Direccion ${a.direccion}, Lugar de Trabajo ${a.lugar}`,a.fecha_ingreso)}>
                                <th style={novTr}>Alta</th>
                                <th style={novTr}>{a.fecha}</th>
                                <th style={novTr}>{"Alta a "+a.cuit}</th>
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