import axios from "axios";
import type { INovedad } from "./interfaces";

const SERVER = import.meta.env.VITE_SERVER;


export default async function (legajo: number): Promise<INovedad[]> {
    try {
        const res: INovedad[] = (await axios.get(SERVER+"/novedad/legajo/"+legajo, {withCredentials: true})).data
        return res
    } catch (error) {
        console.log(error)
        return []
    }
}