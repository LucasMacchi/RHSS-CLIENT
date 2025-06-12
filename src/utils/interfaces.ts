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
        activado: boolean
}