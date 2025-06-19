export interface ISession {
    username: string,
    admin: boolean,
    administrativo: boolean
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
    categoria: string
}

export interface INovFilter {
    fecha_inicio: string,
    fecha_final:string,
    categoria: string,
    solicitante: string,
    empresa_id: number
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
    categoria: string
}

export interface ILegajo {
    legajo: number, 
    fullname: string,
    cuil: number,
    sector: string
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

export interface INovLeg {
    legajo: ILegajo,
    novedad: INovedad,
    ausentes: IAusente[],
    sanciones: ISancion[],
    personal: IPersonal[],
    licencias: ILicencia[]

}

export interface IAction {
    legajo: number,
    fecha: string,
    fecha_inicial?: string,
    fecha_final?: string,
    categoria: string,
    causa: string
}