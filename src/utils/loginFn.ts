import axios from "axios";
const SERVER = import.meta.env.VITE_SERVER;


export default async function (user: string): Promise<boolean> {
    try {
        console.log("loggin...")
        await axios.post(SERVER+"/usuario/login/"+user,{},{withCredentials: true})
        return true
    } catch (error) {
        return false
    }

}