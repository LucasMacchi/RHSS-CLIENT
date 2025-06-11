import axios from "axios";
import type { ISession } from "./interfaces";
const SERVER = import.meta.env.VITE_SERVER;


export default async function (): Promise<ISession> {
    try {
        const res: ISession = (await axios.post(SERVER+"/usuario/session",{},{withCredentials: true})).data
        return res
    } catch (error) {
        console.log(error)
        return {username: '', admin: false, administrativo: false}
    }
}