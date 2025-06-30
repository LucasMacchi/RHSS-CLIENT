import { useEffect, useState } from "react";
import session from "../utils/session";
import Header from "./Header";
import type { IEmpresa, IUsuario } from "../utils/interfaces";
import { getEmpresas, getUsuarios } from "../utils/getData";
import { activateUser, createUsuarioFn, deactivateUser } from "../utils/createActions";


export default function Usuarios () {

    const [usuarios, setUsuarios] = useState<IUsuario[]>([])
    const [empresasSele, setEmpresasSele] = useState<IEmpresa[]>([])
    const [loading, setLoading] = useState(false)
    const [registerUser, setRegisterUser] = useState({
        nombre: '',
        apellido: '',
        username: '',
        administrativo: false,
        email: '',
        empresa_id: 1,
        password: ''
    })

    const handleRegister = (prop: string, payload: string | number | boolean) => {
        setRegisterUser({
            ...registerUser,
            [prop]: payload
        })
    }

    const btnRegister: React.CSSProperties = {
        color: "white", backgroundColor: "#3399ff", fontSize: "large", width: "200 px", height: "40px"
    }

    useEffect(() => {
        getEmpresas().then(em=>setEmpresasSele(em)) 
        getUsuarios().then(us=>setUsuarios(us))
    },[])

    session(true)

    const novTr: React.CSSProperties = {
        border: "1px solid",
        width: "120px"
    }
    const novTrBg: React.CSSProperties = {
        border: "1px solid",
        width: "370px"
    }

    const empresaGetter = (id: number): string => {
        let empresa = ''
            empresasSele.forEach(em => {
                if(em.empresa_id === id) {
                    empresa = em.nombre
                }
            });
            return empresa
    }
    const filterTitle: React.CSSProperties = {
        margin: "5px",
        color: "#3399ff"
    }
    const filterSelect: React.CSSProperties = {
        fontSize: "large", width: "200px"
    }


    async function createUser() {
        if(registerUser.apellido && registerUser.email && registerUser.empresa_id && 
            registerUser.nombre && registerUser.username && confirm("Quieres crear el usuario?")){
            setLoading(true)
            const res = await createUsuarioFn(registerUser)
            if(res) {
                alert("Usuario Creado.")
                window.location.reload()
            }
            else {
                alert("Error al crear el usuario.")
                setRegisterUser({
                nombre: '',
                apellido: '',
                username: '',
                administrativo: false,
                email: '',
                empresa_id: 1,
                password: ''
                })
            }
        }else alert("Faltan datos.")
    }

    async function activate(id:number) {
        if(confirm("Quieres activar este usuario?")) activateUser(id)
    }

    async function deactivate(id:number) {
        if(confirm("Quieres desactivar este usuario?")) deactivateUser(id)
    }

    return (
        <div>
            <Header/>
            <div>
                <h1 id="titulo" style={{fontWeight: "bold", color: "#3399ff", margin: "10px"}}>Usuarios</h1>
                <hr color='#3399ff'/>
                <div style={{height: "230px", overflow: "scroll", alignItems: "center"}}>
                    <table>
                        <tbody>
                            <tr>
                                <th style={novTr}>Nombre</th>
                                <th style={novTr}>Apellido</th>
                                <th style={novTr}>Username</th>
                                <th style={novTr}>Admin</th>
                                <th style={novTr}>Administrativo</th>
                                <th style={novTrBg}>Email</th>
                                <th style={novTrBg}>Empresa</th>
                                <th style={novTr}>Fecha de Creacion</th>
                                <th style={novTr}>Activado</th>
                                <th style={novTrBg}>Contraseña</th>
                            </tr>
                            {usuarios.map((u) => (
                                <tr onClick={() => u.activado ? deactivate(u.usuario_id) : activate(u.usuario_id)}>
                                    <th style={novTr}>{u.nombre}</th>
                                    <th style={novTr}>{u.apellido}</th>
                                    <th style={novTr}>{u.username}</th>
                                    <th style={novTr}>{u.admin ? "Si":"No"}</th>
                                    <th style={novTr}>{u.administrativo ? "Si":"No"}</th>
                                    <th style={novTrBg}>{u.email}</th>
                                    <th style={novTrBg}>{empresaGetter(u.empresa_id)}</th>
                                    <th style={novTr}>{u.fecha_creacion}</th>
                                    <th style={novTr}>{u.activado ? "Si":"No"}</th>
                                    <th style={novTrBg}>{u.password}</th>
                                </tr>        
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{marginLeft: "20px", height: "600px"}}>
                    <h1 id="titulo" style={{fontWeight: "bold", color: "#3399ff", margin: "10px"}}>Crear Usuario</h1>
                    <hr color='#3399ff'/>
                    <h3 style={filterTitle}>Empresa:</h3>
                    <select name="causa" id="causa-selecet" style={filterSelect}
                    onChange={e=>handleRegister("empresa_id" ,parseInt(e.target.value))}>
                        <option value={0}>---</option>
                        {empresasSele.map((e) => (
                            <option key={e.empresa_id+e.nombre} value={e.empresa_id}>{e.nombre}</option>
                        ))}
                    </select>
                    <h3 style={filterTitle}>Nombre:</h3>
                    <input style={{width: "300px"}} type="text" value={registerUser.nombre} onChange={e => handleRegister('nombre', e.target.value)}/>
                    <h3 style={filterTitle}>Apellido:</h3>
                    <input style={{width: "300px"}} type="text" value={registerUser.apellido} onChange={e => handleRegister('apellido', e.target.value)}/>
                    <h3 style={filterTitle}>Email:</h3>
                    <input style={{width: "300px"}} type="text" value={registerUser.email} onChange={e => handleRegister('email', e.target.value)}/>
                    <h3 style={filterTitle}>Nombre de usuario:</h3>
                    <input style={{width: "300px"}} type="text" value={registerUser.username} onChange={e => handleRegister('username', e.target.value)}/>
                    <h3 style={filterTitle}>Contraseña:</h3>
                    <input style={{width: "300px"}} type="text" value={registerUser.password} onChange={e => handleRegister('password', e.target.value)}/>
                    <h3 style={filterTitle}>Administrativo: 
                        <input type="checkbox" checked={registerUser.administrativo} onChange={e => handleRegister('administrativo', e.target.checked)}/>
                    </h3>
                    <div style={{marginTop: "50px"}}>
                        <button id="bg-btn" style={btnRegister}
                        onClick={() => createUser()}>{loading ? "Registrando" : "Registrar Usuario"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}