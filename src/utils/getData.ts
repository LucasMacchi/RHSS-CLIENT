import axios from "axios";
import type { IEmpresa, ILegajo, IServicio, IUsuario } from "./interfaces";
const SERVER = import.meta.env.VITE_SERVER;
const SERVER2 = import.meta.env.VITE_SERVER_2;


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

export async function getLegajos(nombre: string, egressed: boolean): Promise<ILegajo[]> {
    try {
        let res: ILegajo[] = (await axios.get(SERVER+"/data/legajos/"+nombre.toUpperCase(),{withCredentials: true})).data
        if(!egressed) {
            res = res.filter((l) => {
                const egress = new Date(l.fecha_egreso)
                if(egress.getTime() > Date.now()) return l
            })
        }
        return res
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getAllLegajos(empresa: string): Promise<ILegajo[]> {
    try {
        const res: ILegajo[] = (await axios.post(SERVER+"/data/empresa/legajos",{empresa},{withCredentials: true})).data
        console.log("Legajos...")
        let newArr: ILegajo[] = []
        res.forEach(l => {
            const egress = new Date(l.fecha_egreso)
            if(egress.getTime() >= Date.now()) {
                newArr.push(l)
            }
        });
        return newArr
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getAllCcos(): Promise<IServicio[]> {
    try {
        const res: IServicio[] = (await axios.get(SERVER2+'/data/cco')).data
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
        return []
    }
}