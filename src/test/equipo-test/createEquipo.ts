import { randProductDescription } from '@ngneat/falso';
import { Equipo } from '../../models/equipo/Equipo';

const estados = ['REPARABLE', 'IRREPARABLE'];

async function createEquipo() {
    const promises = [];
    for (let i = 0; i < 50; i++) {
        const equipo: Equipo = {
            estadoReparacion: estados[Math.floor(Math.random() * estados.length)],
            descripcion: randProductDescription(),
            foto: null,
            historial: 'test',
            nombre: `PC ${i}`
        }

        const promesa = fetch('http://localhost:8080/api/test/equipo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(equipo),
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

createEquipo();

// Comando para ejecutar este script: (No importa si da error SOLO el ts)
// tsc src/test/equipo-test/createEquipo.ts

// CAMBIAR el nombre del archivo js a 'createEquipo.cjs'
// node src/test/equipo-test/createEquipo.cjs