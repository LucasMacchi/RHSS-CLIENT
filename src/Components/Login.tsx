import { useEffect, useState } from "react"
//import { useEffect } from "react"
import loginFn from "../utils/loginFn"
import sessionChecker from "../utils/sessionChecker"
import Header from "./Header"
export default function Login () {

    const [username, setUsername] = useState('')
    const [load, setLoading] = useState(false)

    useEffect(() => {
        const res = sessionChecker()
        res.then(d => d.username.length > 0 ?
            window.location.href = '/' : console.log("no log")
        )
    },[])

    const loginAction = async () => {
        setLoading(true)
        const res = await loginFn(username)
        if(!res){
            setUsername('')
            setLoading(false)
            alert("Usuario incorrecto.")
        }
        else{
            setLoading(false)
            window.location.reload()
        }
        
    }

    return(
        <>
        <Header/>
        <div style={{textAlign: 'center'}}>
            <h1 id="titulo" style={{fontWeight: "bold", color: "#3399ff"}}>Sistema de Novedades</h1>
            <hr color='#3399ff'/>
            <h2 id='subtitle' style={{fontWeight: "normal", color: "#3399ff"}}>Ingrese el usuario</h2>
            <form >
                <div style={{padding: "10px"}}>
                  <input type='text' id='username' size={20} value={username} onChange={e => setUsername(e.target.value)}
                  style={{fontSize:"x-large", color: "#3399ff"}}/>
                </div>
                <button id="bg-btn" style={{color: "white", backgroundColor: "#3399ff", fontSize: "x-large", width: "160px"}} disabled={load} 
                onClick={() => loginAction()}>{load ? "Ingresando...." : "Ingresar"}</button>
            </form>
        </div>
        </>

    )
}