import { useEffect, useState } from "react"
import loginFn from "../utils/loginFn"
import Header from "./Header"
export default function Login () {

    const [username, setUsername] = useState('')
    const [load, setLoading] = useState(false)
    const [save, setSave] = useState(false)
    const [password, setPassword] = useState('')

    const loginAction = async () => {
        if(username.length > 0 && password.length > 0){
            setLoading(true)
            const res = await loginFn(username, password)
            if(!res){
                setUsername('')
                setPassword('')
                setLoading(false)
                alert("Usuario incorrecto o contraña incorrecta.")
            }
            else{
                setLoading(false)
                window.location.href = "/"
            }
        }
        else alert("Ingrese los datos faltantes")
    }

    useEffect(() => {
       const usrCheck = localStorage.getItem('save') 
       if(usrCheck){
            console.log(usrCheck)
            setUsername(usrCheck)
            setSave(true)
       }
    },[])

    useEffect(() => {
        if(save){
            localStorage.setItem('save',username)
        }
        else{
            localStorage.removeItem('save')
        }
    },[save, username])

    return(
        <>
        <Header/>
        <div style={{textAlign: 'center'}}>
            <h1 id="titulo" style={{fontWeight: "bold", color: "#3399ff"}}>Sistema de Novedades</h1>
            <hr color='#3399ff'/>
            <form >
                <div style={{padding: "8px"}}>
                    <h2 id='subtitle' style={{fontWeight: "normal", color: "#3399ff"}}>Ingrese el usuario</h2>
                    <input type='text' id='username' size={20} value={username} onChange={e => setUsername(e.target.value)}
                    style={{fontSize:"x-large", color: "#3399ff"}}/>
                </div>
                <div style={{padding: "8px"}}>
                    <h2 id='subtitle' style={{fontWeight: "normal", color: "#3399ff"}}>Ingrese la contraseña</h2>
                    <input type='password' id='username' size={20} value={password} onChange={e => setPassword(e.target.value)}
                    style={{fontSize:"x-large", color: "#3399ff"}}/>
                </div>
                <div style={{padding: "7px"}}>
                    <h4 id='subtitle' style={{fontWeight: "normal", color: "#3399ff"}}>Recordar usuario
                    <input type="checkbox" id='username' checked={save} onChange={e => setSave(e.target.checked)} style={{fontSize:"x-large", color: "#3399ff"}}/>
                    </h4>
                </div>
                <button id="bg-btn" style={{color: "white", backgroundColor: "#3399ff", fontSize: "x-large", width: "160px"}} disabled={load} 
                onClick={() => loginAction()}>{load ? "Ingresando...." : "Ingresar"}</button>
            </form>
        </div>
        </>

    )
}