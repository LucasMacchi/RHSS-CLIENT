import axios from "axios";
const SERVER = import.meta.env.VITE_SERVER;

export default async function (): Promise<void> {
    await axios.delete(SERVER+"/usuario/logout",{withCredentials: true})
    localStorage.removeItem('username')
    localStorage.removeItem("admin")
    document.cookie = "SESSIONCK=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}