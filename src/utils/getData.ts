import axios from "axios";
import type { IEmpresa, IUsuario } from "./interfaces";
const SERVER = import.meta.env.VITE_SERVER;


export async function getEmpresas(): Promise<IEmpresa[]> {
    try {
        const res: IEmpresa[] = (await axios.get(SERVER+"/data/all/empresas",{withCredentials: true})).data
        return res
    } catch (error) {
        console.log(error)
        return []
    }
}
export async function getCategoriasNov(): Promise<string[]> {
    try {
        const res: string[] = (await axios.get(SERVER+"/novedad/categories",{withCredentials: true})).data
        return res
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getUsuarios(): Promise<IUsuario[]> {
    try {
        const res: IUsuario[] = (await axios.get(SERVER+"/usuario/all",{withCredentials: true})).data
        return res
    } catch (error) {
        console.log(error)
        return []
    }
}