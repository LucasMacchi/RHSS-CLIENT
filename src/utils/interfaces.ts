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