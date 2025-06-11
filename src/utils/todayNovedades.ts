import axios from "axios";
import type { INovedad } from "./interfaces";
const SERVER = import.meta.env.VITE_SERVER;

export default async function (): Promise<INovedad[]> {
    try {
        const res: INovedad[] = (await axios.get(SERVER+"/novedad/today",{withCredentials: true})).data
        return res;
    } catch (error) {
        console.log(error)
        return []
    }
}