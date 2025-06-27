import axios from "axios";
import type { ISession } from "./interfaces";
const SERVER = import.meta.env.VITE_SERVER;

export default async function (adm:boolean) {
    try {
    const res: ISession = (await axios.get(SERVER+"/usuario/session",{withCredentials: true})).data
    setTimeout(() => {
        console.log(res)
        localStorage.setItem('username', res.username)
        localStorage.setItem('empresa', res.empresa)
        if(res.admin) localStorage.setItem('admin',res.username)
        else localStorage.removeItem('admin')
        if(adm) {
            if(!res.administrativo && res.username.length > 0){
                window.location.href = "/Crear"
            }
            else if(!res.administrativo){
                window.location.href = "/login"
            }
        }
        else {
            if(res.username.length === 0) window.location.href = "/login"
            if(res.administrativo) window.location.href = "/"
        }
    }, 1000);
    } catch (error) {
        window.location.href = "/login"
    }

}