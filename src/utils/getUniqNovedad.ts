import axios from "axios";
import type { INovLeg } from "./interfaces";

const SERVER = import.meta.env.VITE_SERVER;


export default async function (id: number): Promise<INovLeg | null> {
    try {
        const res: INovLeg = (await axios.get(SERVER+"/novedad/uniq/"+id, {withCredentials: true})).data
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
        return null
    }
}