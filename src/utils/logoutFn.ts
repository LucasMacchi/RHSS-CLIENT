import axios from "axios";
const SERVER = import.meta.env.VITE_SERVER;

export default async function (): Promise<void> {
    await axios.post(SERVER+"/usuario/logout",{},{withCredentials: true})
}