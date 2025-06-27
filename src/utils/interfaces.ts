export interface ISession {
    username: string,
    admin: boolean,
    administrativo: boolean,
    empresa: string
}

export interface INovedad {
    novedad_id: number,
    solicitante: string,
    legajo: number,
    causa: string,
    empresa_id: number,
    usuario_id: number,
    fecha: string,
    numero: string,
    categoria: string,
    cerrado: boolean,
    email: string,
    telefono: string
}

export interface INovFilter {
    fecha_inicio: string,
    fecha_final:string,
    categoria: string,
    solicitante: string,
    empresa_id?: number
}

export interface IEmpresa {
    empresa_id: number,
    nombre: string
}

export interface IUsuario {
    nombre: string,
    apellido: string,
    admin: boolean,
    administrativo: boolean,
    email: string,
    empresa_id: number,
    username: string,
    fecha_creacion: string,
    activado: boolean,
    usuario_id: number
}

export interface INovDto {
    causa: string,
    solicitante: string,
    empresa_id?: number,
    legajo: number,
    categoria: string,
    email: string,
    telefono: string
}

export interface ILegajo {
    legajo: number, 
    fullname: string,
    cuil: number,
    sector: string,
    fecha_egreso: string,
    direccion: string,
    empresa:string,
    telefono:number,
    email:string
}

export interface IAusente {
    ausente_id: number,
    justificado: boolean,
    fecha: string,
    fecha_ausentada: string,
    novedad_id: number,
    legajo: number,
    causa: string
}

export interface ISancion {
    sancion_id: number,
    legajo: number,
    fecha: string,
    tipo: string,
    fecha_inicio: string,
    fecha_final: string,
    causa: string,
    novedad_id: number
}

export interface IPersonal {
    personal_id: number,
    legajo: number,
    fecha: string,
    fecha_ocurrido: string,
    categoria: string,
    causa: string,
    novedad_id: number
}

export interface ILicencia {
    licencia_id: number,
    legajo: number,
    fecha: string,
    fecha_salida: string,
    fecha_entrada: string,
    categoria: string,
    causa: string,
    novedad_id: number
}

export interface IArchivo {
    ruta: string,
    concepto: string,
    novedad: number,
    fecha: string,
    archivo_id: number
}

export interface INovLeg {
    legajo: ILegajo,
    novedad: INovedad,
    ausentes: IAusente[],
    sanciones: ISancion[],
    personal: IPersonal[],
    licencias: ILicencia[],
    archivos: IArchivo[],
    altas: IAlta[]

}

export interface IAction {
    legajo: number,
    fecha: string,
    fecha_inicial?: string,
    fecha_final?: string,
    categoria: string,
    causa: string
}

export interface IAlta {
    alta_id?: number,
    novedad: number,
    legajo: number,
    fecha_ingreso: string,
    fecha?:string,
    cuit:number,
    direccion:string,
    nacimiento:string,
    jornada:number,
    lugar:string,
    categoria: string
}
export interface IServicio {
    service_id: number,
    client_id: number,
    service_des: string,
    client_des: string,
    localidad: string
}

export interface IServicioHora{
    servicio: string,
    hr:number
}