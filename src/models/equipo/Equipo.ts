/*
Ejemplo:
{
    "estadoReparacion": "REPARABLE",
    "descripcion": "Lorem ipsum",
    "foto": null,
    "historial": "test",
    "nombre": "PC 3"
}
*/

export interface Equipo {
    id: number;
    estadoReparacion: string;
    descripcion: string;
    foto: any;
    nombre: string;
}