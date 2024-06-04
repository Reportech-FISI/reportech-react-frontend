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
    estadoReparacion: string;
    descripcion: string;
    foto: any;
    historial: string;
    nombre: string;
}