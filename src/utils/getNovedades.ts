import axios from "axios";
import type { INovedad, INovFilter } from "./interfaces";
const SERVER = import.meta.env.VITE_SERVER;

export default async function (filter: INovFilter, nro?: string): Promise<INovedad[]> {
    try {
        let res: INovedad[] = []
        if(nro && nro.length > 4) {
            res = (await axios.get(SERVER+"/novedad/nro/"+nro,{withCredentials: true})).data
        }
        else {
            res = (await axios.post(SERVER+"/novedad/all", filter,{withCredentials: true})).data
        }
        console.log(filter, res)
        return res;
    } catch (error) {
        console.log(error)
        return []
    }
}