import { useState, useEffect } from "react"
import Header from "./Header"
import session from "../utils/session"
import type { IEmpresa, ILegajo, INovDto } from "../utils/interfaces"
import { getCategoriasNov, getEmpresas, getAllLegajos } from "../utils/getData"
import postNovedad from "../utils/postNovedad"


export default function CrearNovedad () {
    
    const [categoria, setCategoria] = useState('')
    const [empresasSele, setEmpresasSele] = useState<IEmpresa[]>([])
    const [categoriasSele, setCategoriesSele] = useState<string[]>([])
    const [legajos, setLegajos] = useState<ILegajo[]>([])
    const [legajosF, setLegajosF] = useState<ILegajo[]>([])
    const [legajosS, setLegajosS] = useState<string>('')
    const [empresa, setEmpresa] = useState(0)
    const [descripcion, setDescripcion] = useState('')
    const [legajo, setLegajo] = useState(0)
    const [load, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')

    useEffect(()=>{
        session(true)
        getEmpresas().then(em=>setEmpresasSele(em))
        getCategoriasNov().then(cats=>setCategoriesSele(cats))
        setTimeout(() => {
            const empresa = localStorage.getItem("empresa")
            if(empresa !== null) getAllLegajos(empresa).then(lg=>setLegajos(lg))
        }, 1500);
    },[])

    useEffect(() => {
        let arr = legajos
        if(arr.length > 0) {
            if(legajosS.length > 3) arr = arr.filter((l) => l.fullname.toLocaleLowerCase().includes(legajosS.toLocaleLowerCase()))
        }
        setLegajosF(arr)
    },[legajosS, legajos])

    const filterSelect: React.CSSProperties = {
        fontSize: "large", width: "200px"
    }

    const createNovedad = () => {
        const username = localStorage.getItem('username')
        if(categoria.length > 0 && empresa && descripcion.length > 50 && username &&
             legajo && email.length > 0 && telefono.length > 0){
            if(confirm("Quieres registrar una nueva novedad")){
                setLoading(true)
                const data: INovDto = {
                    solicitante: username,
                    causa: descripcion,
                    empresa_id: empresa,
                    legajo: legajo,
                    categoria: categoria,
                    email: email,
                    telefono: telefono
                }
                setTimeout(() => {
                    setLoading(false)
                    postNovedad(data)
                }, 1500);
                setDescripcion('')
                setEmpresa(0)
                setLegajo(0)
                setCategoria('')
                setLegajosS('')
                setEmail('')
                setTelefono('')
            }
        }
        else alert("Asegurese de haber seleccionado una empresa, un legajo y categoria. Ademas que la descripcion puede ser corta y faltan datos de contacto.")
    }   


    return(
        <div style={{textAlign: "center"}}>
            <Header/>
            <h1 id="titulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                Crear Novedad
            </h1>
            <hr color='#3399ff'/>
            <div>
                <h3 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                    Categoria
                </h3>
                    <select name="causa" id="causa-selecet" style={filterSelect}
                    onChange={e=>setCategoria(e.target.value)} value={categoria}>
                        <option value={''}>---</option>
                        {categoriasSele.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
            </div>
            <div>
                <h3 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                    Empresa
                </h3>
                    <select name="causa" id="causa-selecet" style={filterSelect}
                    onChange={e=>setEmpresa(parseInt(e.target.value))} value={empresa}>
                        <option value={0}>---</option>
                        {empresasSele.map((e) => (
                            <option key={e.empresa_id+e.nombre} value={e.empresa_id}>{e.nombre}</option>
                        ))}
                    </select>
            </div>

            <div>
                <h3 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                    Email del Operario
                </h3>
                <div style={{marginBottom: "10px"}}>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
            </div>
            <div>
                <h3 id="subtitulo" style={{fontWeight: "bold", color: "#3399ff"}}>
                    Telefono del Operario
                </h3>
                <div style={{marginBottom: "10px"}}>
                    <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)}/>
                </div>
            </div>
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
                        {legajosF.map((e) => (
                            <option key={e.legajo} value={e.legajo}>{e.legajo+'-'+e.fullname}</option>
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
            <div>
                <button id="bg-btn" style={{color: "white", backgroundColor: "#3399ff", fontSize: "x-large", width: "160px"}} disabled={load} 
                onClick={() => createNovedad()}>{load ? "Registrando...." : "Registrar"}</button>
            </div>
        </div>
    )
}