import { useState, useEffect } from "react"
import Header from "./Header"
import session from "../utils/session"
import type {IFilesLoad, ILegajo, INovDto, INovedad, INovFilter, IServicio, IServicioHora } from "../utils/interfaces"
import { getAllCcos, getAllLegajos, getCategoriasNov } from "../utils/getData"
import postNovedad from "../utils/postNovedad"
import logoutFn from "../utils/logoutFn"
import getNovedadesSup from "../utils/getNovedadesSup"

export default function CrearNovedadS () {
    
    const [categoria, setCategoria] = useState('')
    const [categoriasSele, setCategoriesSele] = useState<string[]>([])
    const [novedades, setNovedades] = useState<INovedad[]>([])
    const [legajos, setLegajos] = useState<ILegajo[]>([])
    const [legajosF, setLegajosF] = useState<ILegajo[]>([])
    const [servicios, setServicios] = useState<IServicio[]>([])
    const [serviciosF, setServiciosF] = useState<IServicio[]>([])
    const [legajosS, setLegajosS] = useState<string>('')
    const [descripcion, setDescripcion] = useState('')
    const [legajo, setLegajo] = useState(0)
    const [load, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [show, setShow] = useState(false)
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [direccion, setDireccion] = useState('')
    const [nacimiento, setNacimiento] = useState('')
    const [servicioHora, setServicioHora] = useState<IServicioHora[]>([])
    const [uniqServHr, setUniqServHr] = useState<IServicioHora>({
        servicio: '',
        hr: 0
    })
    const [jornada, setJornada] = useState('')
    const [fullname, setFullname] = useState('')
    const [dateIngreso, setDateIngreso] = useState('')
    const [fileLoad, setFileLoad] = useState<IFilesLoad>({concepto:'', file: null})
    const [files, setFiles] = useState<IFilesLoad[]>([])
    const [empresaUser, setEmpresaUser] = useState("")


    useEffect(()=>{
        session(false)
        getCategoriasNov().then(cats=>setCategoriesSele(cats))
        setTimeout(() => {
            const empresa = localStorage.getItem("empresa")
            if(empresa !== null) {
                getAllLegajos(empresa).then(lg=>setLegajos(lg))
                setEmpresaUser(empresa)
            }
        }, 1500);
    },[])

    useEffect(() => {
        if(categoria === "ALTA DE LEGAJO") {
            getAllCcos().then(s => setServicios(s))
        }
        setEmail('')
        setTelefono('')
        setDateEnd('')
        setDateStart('')
        setDescripcion('')
        setJornada('')
        setNacimiento('')
        setServicioHora([])
        setDireccion('')
        setUniqServHr({servicio: '',hr: 0})
        setFiles([])
        setFileLoad({concepto: '', file: null})

    },[show, categoria])

    useEffect(() => {
        if(categoria === "ALTA DE LEGAJO") {
            let arr = servicios
            if(legajosS.length > 3) {
                arr = arr.filter((s) => s.service_des.toLowerCase().includes(legajosS.toLowerCase()))
            }
            setServiciosF(arr)
        }
        else{
            console.log("Legajos changing")
            let arr = legajos
            if(arr.length > 0) {
                if(legajosS.length > 3) arr = arr.filter((l) => l.fullname.toLocaleLowerCase().includes(legajosS.toLocaleLowerCase()))
            }
            setLegajosF(arr)
        }

    },[legajosS, legajos, servicios])

    const filterSelect: React.CSSProperties = {
        fontSize: "large", width: "250px"
    }
    const filterTitle: React.CSSProperties = {
        margin: "5px"
    }
    const filterDivStyle: React.CSSProperties = {
        color: "#6495ed"
    }
    const novTr: React.CSSProperties = {
        border: "1px solid",
        width: "200px"
    }

    const addFile = () => {
        if(fileLoad.concepto && fileLoad.file){
            files.push(fileLoad)
            setFileLoad({concepto: '', file: null})
        }
        else alert("Faltan datos para cargar el archivo")
    }

    const deleteFile = (index: number) => {
        if(confirm("Quieres elimnar el archivo?")) {
            if(files.length === 1){
                setFiles([])
                setFileLoad({concepto: '', file: null})
            }else {
                files.splice(index, index)
                setFileLoad({concepto: '', file: null})
            }
        }
    }

    const searchNovedades = () => {
        setNovedades([])
        setLoading(true)
        const username = localStorage.getItem("username")
        if(dateEnd.length > 0 && dateStart.length > 0 && 
            username && username.length > 0) {
            const fitler: INovFilter = {
                fecha_final: dateEnd,
                fecha_inicio: dateStart,
                categoria: categoria,
                solicitante: username,
                empresa_id: 0
            }
            setTimeout(async () => {
                const novedadesR = await getNovedadesSup(fitler)
                setNovedades(novedadesR)
                setLoading(false)
            }, 1500);
            setCategoria('')
        }
        else {
            setLoading(false)
            alert("Seleccione fechas validas. Si busca el numero de novedad tiene que tener 5 digitos como minimo.")
        }
    }

    const createAltaNovedad = () => {
        const username = localStorage.getItem('username')
        if(direccion.length > 0 && nacimiento.length > 0 && legajo && email.length > 0 && 
            telefono.length > 0 && jornada.length > 0 && fullname.length>0 && username) {
            if(empresaUser !== "Tuicha" && servicioHora.length === 0){
                alert("Ingrese lugares de trabajo")
                return 0;
            }
            if(legajo.toString().length < 11 || legajo.toString().length > 11) {
                alert("Ingrese un CUIL valido")
                return 0;
            }
            if(confirm("Quieres informar una nueva alta de legajo?")){
                setLoading(true)
                let des = `Datos del Operario:\n+Apellido y Nombre: ${fullname}\n+Direccion: ${direccion}\n+Fecha de Nacimiento: ${nacimiento}\n+CUIL: ${legajo}\n+Fecha de Ingreso: ${dateIngreso}\n+Jornada: ${jornada}\n+Email: ${email}\n+Telefono: ${telefono}`
                if(empresaUser !== "Tuicha"){
                    servicioHora.forEach(s => {
                    const str = `\n+Lugar de Trabajo: ${s.hr} horas en ${s.servicio}`
                    des += str
                });
                }
                const data: INovDto = {
                    solicitante: username,
                    causa: des,
                    legajo: 1,
                    categoria: categoria,
                    email: email,
                    telefono: telefono
                }
                let filesToSend:File[] = []
                if(files.length > 0){
                    files.forEach(f => {
                        if(f.file) filesToSend.push(f.file)
                    });
                }
                setTimeout(() => {
                    setLoading(false)
                    postNovedad(data, filesToSend.length > 0 ? filesToSend : [])
                }, 1500);
                setCategoria('')
            }
        }
        else alert("Faltan datos del Operario")
    }

    const sectionActionReturner = (i: number) => {
        if(i === 0) return "Sanciones"
        else if(i === 2) return "Licencias"
        else if(i===6) return "Despidos"
        else if(i===9) return "Entregas"
        else if(i===11) return "Cambios"
        else if(i===15) return "Presentismo"
        else if(i===17) return "Altas"
    }

    const createNovedad = () => {
        const username = localStorage.getItem('username')
        if(categoria.length > 0 && descripcion.length > 50 && username && legajo && 
            legajo
        ){
            if(confirm("Quieres registrar una nueva novedad")){
                setLoading(true)
                const data: INovDto = {
                    solicitante: username,
                    causa: descripcion,
                    legajo: legajo,
                    categoria: categoria,
                    email: email.length > 3 ? email : "NaN",
                    telefono: telefono.length > 3 ? telefono : "NaN"
                }
                let filesToSend:File[] = []
                if(files.length > 0){
                    files.forEach(f => {
                        if(f.file) filesToSend.push(f.file)
                    });
                }
                setTimeout(() => {
                    setLoading(false)
                    postNovedad(data, filesToSend.length > 0 ? filesToSend : [])
                }, 1500);
                setDescripcion('')
                setLegajo(0)
                setCategoria('')
                setLegajosS('')
                setEmail('')
                setTelefono('')
                setServiciosF([])
            }
        }
        else alert("Asegurese de haber seleccionado un legajo y categoria. Ademas que la descripcion puede ser corta y faltan datos de contacto.")
    }
    const logoutBtn = async () => {
        await logoutFn()
        window.location.href = "/login"
    }

    const handleService = (payload: number | string, prop: string) => {
        setUniqServHr({
            ...uniqServHr,
            [prop]: payload
        })
    }

    const createWorkTime = () => {
        if(uniqServHr.hr && uniqServHr.servicio.length > 0) {
            servicioHora.push(uniqServHr)
            setUniqServHr({hr: 0, servicio: ''})
        }
        else alert("Selecciones un lugar y las horas")

    }

    const deleteWorkTime = (index: number) => {
        if(confirm("Quieres elimnar el lugar de trabajo?")) {
            servicioHora.splice(index, index)
            setUniqServHr({hr: 0, servicio: ''})
        }
    }

    const displayFileUpload = () => {
        return (
            <div style={{...filterDivStyle, marginBottom: "50px", marginTop:"50px"}}>
                <h3 style={filterTitle} >Subir Archivos (Opcional)</h3>
                <h4 style={filterTitle} >Concepto</h4>
                <div>
                    <input type="text" value={fileLoad.concepto} onChange={e => setFileLoad({...fileLoad, concepto: e.target.value})}/>
                </div>
                <div>
                    <input type="file"  onChange={e => setFileLoad({...fileLoad, file: e.target.files ? e.target.files[0] : null})}/>
                </div>
                <h5 style={filterTitle} >El archivo debe tener un maximo de 10MB</h5>
                <div>
                    <button id="bg-btn" style={{color: "white", backgroundColor: "#3399ff", fontSize: "large", width: "120px", margin: "10px"}} 
                    onClick={() => addFile()}>Agregar</button>
                </div>
                <h5 style={{margin: "5px",color:"crimson"}} >Para eliminar un archivo cargado, haga click al mismo en la tabla</h5>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <table>
                        <tbody>
                            <tr>
                                <th style={novTr}>Concepto</th>
                                <th style={novTr}>Archivo</th>
                            </tr>
                            {files.map((f, i) => (
                                <tr onClick={() => deleteFile(i)}>
                                    <th style={novTr}>{f.concepto}</th>
                                    <th style={novTr}>{f.file?.name}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    const displayWorkHour = () => {
        if(empresaUser !== "Tuicha") {
            return (
            <div style={{marginBottom: "50px"}}>
                <h4 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff", margin:"5px"}}>
                    Lugares de Trabajo y horas
                </h4>
                <h5 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff", margin:"5px"}}>
                    Buscar servicio por nombre
                </h5>
                <input type="text" value={legajosS} onChange={e => setLegajosS(e.target.value)}/>
                <h6 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff", margin:"5px"}}>
                    {serviciosF.length} - Encontrados
                </h6>
                <select name="causa" id="causa-selecet" style={filterSelect}
                onChange={e=>handleService(e.target.value,'servicio')} value={uniqServHr.servicio}>
                    <option value={0}>---</option>
                    {serviciosF.map((s) => (
                        <option key={s.service_id} value={s.service_des}>{s.service_des}</option>
                    ))}
                </select>
                <input style={{width: "50px"}} type="number" min={0} max={8} value={uniqServHr.hr} onChange={e => handleService(parseInt(e.target.value),"hr")}/>
                <div>
                    <button id="bg-btn" style={{color: "white", backgroundColor: "#3399ff", fontSize: "large", width: "120px", margin: "10px"}} 
                    onClick={() => createWorkTime()}>Agregar</button>
                </div>
                <h5 style={{margin: "5px",color:"crimson"}} >Para eliminar el lugar de trabajo, haga click al mismo en la tabla</h5>
                <div style={{display: "flex", justifyContent: "center"}}>
                <table>
                    <tbody>
                        <tr>
                            <th style={novTr}>Servicio</th>
                            <th style={novTr}>Horas</th>
                        </tr>
                        {servicioHora.map((s, i) => (
                            <tr onClick={() => deleteWorkTime(i)}>
                                <th style={novTr}>{s.servicio}</th>
                                <th style={novTr}>{s.hr}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
            )
        }
    }

    const displayCreateNov = () => {
        if(show){
            return (
                <div style={{marginBottom: "100px"}}>
                    <h1 id="titulo" style={{fontWeight: "bold", color: "#3399ff"}} >
                        Buscar Novedad
                    </h1>
                    <hr color='#3399ff'/>
                    <div>
                    <div style={filterDivStyle}>
                        <h3 style={filterTitle} >Categoria</h3>
                        <select name="causa" id="causa-selecet" style={filterSelect}
                        onChange={e=>setCategoria(e.target.value)} value={categoria}>
                            <option value={''}>---</option>
                            {categoriasSele.map((c,i) => (
                                i===0 || i==2 || i==6 || i==9 || i==11 || i==15|| i==17? 
                                <>
                                <option value={""}>---------------{sectionActionReturner(i)}-----------</option> 
                                <option key={c} value={c}>{c}</option>
                                </>
                                : 
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div style={filterDivStyle}>
                        <h3 style={filterTitle} >Fecha inicio</h3>
                        <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} />
                    </div>
                    <div style={filterDivStyle}>
                        <h3 style={filterTitle} >Fecha Final</h3>
                        <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} />
                    </div>
                    <h5 style={{color: "#3399ff", margin: "5px"}} >Para actualizar las novedades debes volver a buscar.</h5>
                    <button id="bg-btn" style={{color: "white", backgroundColor: "#3399ff", fontSize: "large", width: "120px"}} disabled={load} 
                    onClick={()=>searchNovedades()}>{load ? "Buscando...." : "Buscar"}</button>
                    </div>
                    <div>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
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
                        >
                        <h3>{n.numero}</h3>
                        <h3>{n.fecha}</h3>
                        <h3>{n.categoria}</h3>
                    </div>
                ))}
                    </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div style={{marginBottom: "100px"}}>
                    <h1 id="titulo" style={{fontWeight: "bold", color: "#3399ff"}} >
                        Crear Novedad
                    </h1>
                    <h4 style={{fontWeight: "bold", color: "#3399ff"}}>Empresa: {empresaUser}</h4>
                    <hr color='#3399ff'/>
                    <div>
                        <h3 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                            Categoria
                        </h3>
                            <select name="causa" id="causa-selecet" style={filterSelect}
                            onChange={e=>setCategoria(e.target.value)} value={categoria}>
                                <option value={''}>---</option>
                            {categoriasSele.map((c,i) => (
                                i===0 || i==2 || i==6 || i==9 || i==11 || i==15|| i==17? 
                                <>
                                <option value={""}>---------------{sectionActionReturner(i)}-----------</option> 
                                <option key={c} value={c}>{c}</option>
                                </>
                                : 
                                <option key={c} value={c}>{c}</option>
                            ))}
                            </select>
                    </div>
                    {categoria === "ALTA DE LEGAJO" ?
                    <div>
                        <div>
                            <hr color='#3399ff'/>
                            <h3 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                Datos del Operario
                            </h3>
                            <div>
                                <h4 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                    Apellido y Nombre
                                </h4>
                                <div style={{marginBottom: "10px"}}>
                                    <input type="text" value={fullname} onChange={e => setFullname(e.target.value)}/>
                                </div>
                            </div>
                            <div>
                                <h4 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                    Email del Operario
                                </h4>
                                <div style={{marginBottom: "10px"}}>
                                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                                </div>
                            </div>
                            <div>
                                <h4 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                    Telefono del Operario
                                </h4>
                                <div style={{marginBottom: "10px"}}>
                                    <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)}/>
                                </div>
                            </div>
                            <div style={{marginBottom: "10px"}}>
                                <h4 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff", margin:"5px"}}>
                                    Direccion
                                </h4>
                                <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)}/>
                            </div>
                            <div style={{marginBottom: "10px"}}>
                                <h4 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff", margin:"5px"}}>
                                    Nacimiento
                                </h4>
                                <input type="date" value={nacimiento} onChange={e => setNacimiento(e.target.value)}/>
                            </div>
                            <div style={{marginBottom: "10px"}}>
                                <h4 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff", margin:"5px"}}>
                                    CUIL - digitos {legajo.toString().length}
                                </h4>
                                <input type="number" value={legajo} onChange={e => setLegajo(parseInt(e.target.value))}/>
                            </div>
                            <div style={{marginBottom: "10px"}}>
                                <h4 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff", margin:"5px"}}>
                                    Fecha de Ingreso
                                </h4>
                                <input type="date" value={dateIngreso} onChange={e => setDateIngreso(e.target.value)}/>
                            </div>
                            <hr color='#3399ff'/>
                            <div style={{marginBottom: "10px"}}>
                                <h4 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff", margin:"5px"}}>
                                    Jornada de Trabajo
                                </h4>
                                <select name="causa" id="causa-selecet" style={filterSelect}
                                onChange={e=>setJornada(e.target.value)} value={jornada}>
                                    <option value={''}>---</option>
                                    <option value={'Completa'}>JORNADA COMPLETA</option>
                                    <option value={'Parcial'}>JORNADA PARCIAL</option>
                                </select>
                            </div>
                            {displayWorkHour()}
                            <hr color='#3399ff'/>
                            {displayFileUpload()}
                            <div>
                                <button id="bg-btn" style={{color: "white", backgroundColor: "#3399ff", fontSize: "x-large", width: "160px"}} disabled={load} 
                                onClick={() => createAltaNovedad()}>{load ? "Registrando...." : "Registrar"}</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div>
                            <hr color='#3399ff'/>
                            <h3 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                Email del Operario (Opcional)
                            </h3>
                            <div style={{marginBottom: "10px"}}>
                                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div>
                            <h3 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                Telefono del Operario (Opcional)
                            </h3>
                            <div style={{marginBottom: "10px"}}>
                                <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)}/>
                            </div>
                        </div>
                        <hr color='#3399ff'/>
                        <div>
                            <h3 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                Legajos
                            </h3>
                            <div style={{marginBottom: "10px"}}>
                                <h4 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff", margin:"5px"}}>
                                    Buscar por nombre
                                </h4>
                                <input type="text" value={legajosS} onChange={e => setLegajosS(e.target.value)}/>
                            </div>
                                <h4 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff", margin:"5px"}}>
                                    Legajos encontrados - {legajosF.length}
                                </h4>
                                <select name="causa" id="causa-selecet" style={filterSelect}
                                onChange={e=>setLegajo(parseInt(e.target.value))} value={legajo}>
                                    <option value={0}>---</option>
                                    {legajosF.map((e, i) => (
                                        <option key={e.legajo+'-'+i} value={e.legajo}>{e.legajo+'-'+e.fullname}</option>
                                    ))}
                                </select>
                        </div>
                        <div>
                            <h3 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                Descripcion
                            </h3>
                            <h5 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                                Minimo de 50 caracteres - Actuales {descripcion.length}
                            </h5>
                            <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)}
                            style={{width: "350px", maxWidth: "300px", height: "200px", resize: "none"}}/>
                        </div>
                        <hr color='#3399ff'/>
                        {displayFileUpload()}
                        <div>
                            <button id="bg-btn" style={{color: "white", backgroundColor: "#3399ff", fontSize: "x-large", width: "160px"}} disabled={load} 
                            onClick={() => createNovedad()}>{load ? "Registrando...." : "Registrar"}</button>
                        </div>
                    </div>
                    }
                </div>
            )
        }
    }



    return(
        <div style={{textAlign: "center"}}>
            <Header/>
            <div>
                <button id="bg-btn" style={{color: "white", backgroundColor: "crimson", fontSize: "x-large", width: "200px"}} disabled={load} 
                onClick={() => logoutBtn()}>Cerrar Sesion</button>
            </div>
            <div style={{marginTop: "10px"}}>
                <button id="bg-btn" style={{color: "white", backgroundColor: "#3399ff", fontSize: "large", width: "200px"}} disabled={load} 
                onClick={() => setShow(show ? false : true)}>{show ? "Crear Novedad" : "Mostrar Novedades"}</button>
            </div>
            {displayCreateNov()}
        </div>
    )
}