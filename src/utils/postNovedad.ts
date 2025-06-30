import type { INovDto } from "./interfaces";
import axios from "axios";
const SERVER = import.meta.env.VITE_SERVER;

export default async function (data:INovDto, archivos: File[]) {
    try {
        if(!data.empresa_id) data.empresa_id = 0
        console.log(archivos)
        const formD = new FormData()
        formD.append("causa", data.causa)
        formD.append("solicitante",data.solicitante)
        formD.append("empresa_id",data.empresa_id ? data.empresa_id.toString() : "0")
        formD.append("legajo",data.legajo.toString())
        formD.append("categoria",data.categoria)
        formD.append("email",data.email)
        formD.append("telefono",data.telefono)
        if(archivos.length > 0) {
            archivos.forEach(ar => {
                formD.append("archivos", ar)
            });
        }
        console.log(formD)
        await axios.post(SERVER+"/novedad/create",formD, {withCredentials: true, headers: {'Content-Type': 'multipart/form-data'}})
    } catch (error) {
        alert("Error al crear la novedad.")
        console.log(error)
    }
}