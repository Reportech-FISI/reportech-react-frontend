import { randBetweenDate } from '@ngneat/falso';
import { Registro } from '../../models/registro/Registro';

const estados = ['TECNICO_NO_NECESARIO', 'TECNICO_POR_ASIGNAR','TECNICO_ASIGNADO'];
const prioridades = ['URGENTE', 'NO_URGENTE'];
const clasificacion = ['HARDWARE','SOFTWARE', 'REDES', 'BASES_DE_DATOS','SEGURIDAD',
    'TELEFONÍA', 'IMPRESIÓN', 'CABLEADO'];

async function createRegistros() {
    const promises = [];
    for (let i = 0; i < 50; i++) {
        const date = randBetweenDate({ from: new Date('10/06/2024'), to: new Date('10/07/2025')});
        const registro: Registro = {
            estado: estados[Math.floor(Math.random() * estados.length)],
            fechaPublicacion: new Date(date).toISOString(),
            prioridad: prioridades[Math.floor(Math.random() * prioridades.length)],
            titulo: `Registro ${i}`,
            userDesignado: null,
            clasificacion: clasificacion[Math.floor(Math.random() * clasificacion.length)],
            equipo: {
                id: Math.floor(Math.random() * 50) + 1
            },
            trabajador: {
                id: Math.floor(Math.random() * 50) + 1
            }
        }

        const promesa = fetch('http://localhost:8080/api/test/reporte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registro),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));

        promises.push(promesa);
        console.log(`Solicitud ${i} enviada`);
    }

    try {
        await Promise.all(promises);
        console.log('Todas las solicitudes se han completado');
    } catch (error) {
        console.error('Ocurrió un error en alguna de las solicitudes:', error);
    }
}

createRegistros();

// Comando para ejecutar este script: (No importa si da error SOLO el ts)
// tsc src/test/registro-test/createRegistro.ts

// CAMBIAR el nombre del archivo js a 'createRegistro.cjs'
// node src/test/registro-test/createRegistro.cjs
