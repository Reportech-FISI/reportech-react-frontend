/*
Ejemplo:
{
    "estado": "APROBADO",
    "fechaPublicacion": "2018-04-12",
    "prioridad": "NO_URGENTE",
    "titulo": "Sillas rotas - Aula 205 NP",
    "userDesignado": null,
    "userReporterNombre": null,
    "equipo": {
        "id": 1
    },
    "trabajador": {
        "id": 1
    }
}
*/

export interface Registro {
    id?: number;
    titulo: string;
    estado: string;
    fechaPublicacion: string;
    prioridad: string;
    userDesignado: any;
    clasificacion: string;
    ubicacion: string;
    equipo: {
        id: number;
    };
    trabajador: {
        id: number;
    };
}