import axios from "axios";
const SERVER = import.meta.env.VITE_SERVER;


export default async function (username: string, password: string): Promise<boolean> {
    try {
        const data = {
            username,
            password
        }
        console.log("loggin...")
        await axios.post(SERVER+"/usuario/login",data,{withCredentials: true})
        return true
    } catch (error) {
        return false
    }

}