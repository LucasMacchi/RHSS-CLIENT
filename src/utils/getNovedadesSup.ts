import axios from "axios";
import type { INovedad, INovFilter } from "./interfaces";
const SERVER = import.meta.env.VITE_SERVER;

export default async function (filter: INovFilter): Promise<INovedad[]> {
    try {
        const res: INovedad[] = (await axios.post(SERVER+"/novedad/allsup", filter,{withCredentials: true})).data
        console.log(filter, res)
        return res;
    } catch (error) {
        console.log(error)
        return []
    }
}