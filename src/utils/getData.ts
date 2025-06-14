import axios from "axios";
import type { IEmpresa, ILegajo, IUsuario } from "./interfaces";
const SERVER = import.meta.env.VITE_SERVER;


export async function getEmpresas(): Promise<IEmpresa[]> {
    console.log("Empresa...")
    try {
        const res: IEmpresa[] = (await axios.get(SERVER+"/data/all/empresas",{withCredentials: true})).data
        return res
    } catch (error) {
        console.log(error)
        return []
    }
}
export async function getCategoriasNov(): Promise<string[]> {
    console.log("Categorias...")
    try {
        const res: string[] = (await axios.get(SERVER+"/novedad/categories",{withCredentials: true})).data
        return res
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getUsuarios(): Promise<IUsuario[]> {
    console.log("Usuarios...")
    try {
        const res: IUsuario[] = (await axios.get(SERVER+"/usuario/all",{withCredentials: true})).data
        return res
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getLegajos(nombre: string): Promise<ILegajo[]> {
    try {
        const res: ILegajo[] = (await axios.get(SERVER+"/data/legajos/"+nombre.toUpperCase(),{withCredentials: true})).data
        return res
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getAllLegajos(): Promise<ILegajo[]> {
    try {
        const res: ILegajo[] = (await axios.get(SERVER+"/data/legajos",{withCredentials: true})).data
        return res
    } catch (error) {
        console.log(error)
        return []
    }
}