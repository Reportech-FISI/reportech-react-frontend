/*
    Ejemplo:
    {
    "id": 1,
    "email": "Test@",
    "password": "12345",
    "nombres": "Carlos Juan",
    "apellidos": "Alva",
    "rol": "SOPORTE",
    "cargo": [
        "REPARACION_COMPUTADORAS",
        "PROGRAMACION"
    ],
    "habilidades": "x",
    "tiempoExperiencia": 1,
    "reportesHechos": null
}
*/

export interface Trabajador {
    id?: number;
    email: string;
    password: string;
    nombres: string;
    apellidos: string;
    rol: string;
    cargo: string[] | string; 
    tiempoExperiencia: number;
}

