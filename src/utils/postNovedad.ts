import type { INovDto } from "./interfaces";
import axios from "axios";
const SERVER = import.meta.env.VITE_SERVER;

export default async function (data:INovDto) {
    try {
        await axios.post(SERVER+"/novedad/create",data, {withCredentials: true})
        alert("Novedad creada.")
    } catch (error) {
        alert("Error al crear la novedad.")
        console.log(error)
    }
}