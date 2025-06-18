import axios from "axios";
const SERVER = import.meta.env.VITE_SERVER;

interface IAusenteDto {
    causa: string,
    fecha_ausente: string,
    justificado: boolean,
    novedad_id: number,
    legajo: number
}
interface ISancionDto {
    causa: string,
    fecha_inicio?: string,
    fecha_final?: string,
    novedad_id: number,
    legajo: number,
    tipo: string
}
interface ILicenciaDto {
    causa: string,
    fecha_salida: string,
    fecha_entrada: string,
    novedad: number,
    legajo: number,
    categoria: string
}
interface IPersonalDto {
    causa: string,
    fecha_ocurrido: string,
    novedad_id: number,
    legajo: number,
    categoria: string
}
interface IUsuarioDto {
    nombre: string,
    apellido: string,
    email: string,
    username: string,
    administrativo: boolean,
    empresa_id: number
}

export async function createAusenteFn (data: IAusenteDto): Promise<boolean> {
    console.log("Creando Ausente...")
    try {
        await axios.post(SERVER+"/ausente/create",data,{withCredentials: true})
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function createSancionFn (data: ISancionDto): Promise<boolean> {
    console.log("Creando Sancion...")
    try {
        await axios.post(SERVER+"/sancion/create",data,{withCredentials: true})
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}


export async function createLicenciaFn (data: ILicenciaDto): Promise<boolean> {
    console.log("Creando Licencia...")
    try {
        await axios.post(SERVER+"/licencia/create",data,{withCredentials: true})
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function createPersonalFn (data: IPersonalDto): Promise<boolean> {
    console.log("Creando Incidente de Personal...")
    try {
        await axios.post(SERVER+"/personal/create",data,{withCredentials: true})
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function createUsuarioFn (data: IUsuarioDto): Promise<boolean> {
    console.log("Creando Incidente de Personal...")
    try {
        await axios.post(SERVER+"/usuario/registrar",data,{withCredentials: true})
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}