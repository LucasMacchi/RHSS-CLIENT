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
interface IAltaDro {
    novedad: number,
    legajo: number,
    cuit: number,
    fecha_ingreso: string,
    direccion: string,
    nacimiento: string,
    jornada: number,
    lugar: string,
    categoria:string
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

export async function createTardanzaFn (data: IAusenteDto): Promise<boolean> {
    console.log("Creando Tardanza...")
    try {
        await axios.post(SERVER+"/ausente/late/create",data,{withCredentials: true})
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

export async function createAltaFn(data:IAltaDro) {
    console.log("Creando Alta...")
    try {
        await axios.post(SERVER+"/alta/create",data,{withCredentials: true})
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

export async function activateUser(userId:number) {
    console.log("Activando usuario")
    try {
        await axios.patch(SERVER+"/usuario/activate/"+userId, {},{withCredentials: true})
        alert("Usuario activado.")
        window.location.reload()
    } catch (error) {
        console.log(error)
    }
}

export async function deactivateUser(userId:number) {
    console.log("Desactivando usuario")
    try {
        await axios.patch(SERVER+"/usuario/deactivate/"+userId, {},{withCredentials: true})
        alert("Usuario desactivado.")
        window.location.reload()
    } catch (error) {
        console.log(error)
    }
}

export async function postArchivo (numero: string, novedad: number, 
    concepto: string, archivo: File): Promise<boolean> {
    try {
        await axios.post(SERVER+"/data/upload",{
            file: archivo,
            concepto: concepto,
            carpeta: numero,
            novedad: novedad
        },
    {withCredentials: true, headers: {'Content-Type': 'multipart/form-data'}})
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function getArchivo (urlFile: string) {
    try {
        const file: Blob = (await axios.post(SERVER+"/data/download", {url:urlFile}, 
            {withCredentials: true,responseType: 'blob',headers: {'Content-Type': 'multipart/form-data'}})).data
        const filename = urlFile.split('/').pop()
        const url = window.URL.createObjectURL(file)
        const a = document.createElement('a')
        a.href = url
        a.download = filename ? filename : "NaN"
        a.click()
    } catch (error) {
        console.log(error)
        alert("No se puedo descargar el archivo")
    }
}

export async function changeState (id: number): Promise<boolean> {
    try {
        await axios.patch(SERVER+"/novedad/state/"+id,{},{withCredentials: true})
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function  deleteFileFn (url:string,id:number): Promise<boolean> {
    try {
        const data = {
            archivo_id: id,
            url: url
        }
        axios.delete(SERVER+"/data/delete",{withCredentials: true, data})
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}