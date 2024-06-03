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
    titulo: string;
    estado: string;
    fechaPublicacion: string;
    prioridad: string;
    userDesignado: any;
    userReporterNombre: any;
    equipo: {
        id: number;
    };
    trabajador: {
        id: number;
    };
}