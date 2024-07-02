import { faker } from '@faker-js/faker';
import { Trabajador } from '../models/trabajador/Trabajador';
import { Equipo } from '../models/equipo/Equipo';
import { Registro } from '../models/registro/Registro';

const cargos = ['REPARACION_COMPUTADORAS', 'CONFIGURACION_REDES', 'SOPORTE_SOFTWARE', 'PROGRAMACION', 'ADMINISTRACION_BASEDATOS', 'SEGURIDAD_INFORMATICA', 'ANALISIS_SISTEMAS', 'CAPACITACION_USUARIOS', 'REDACCION_DOCUMENTACION', 'RESOLUCION_PROBLEMAS', 'ATENCION_CLIENTE', 'INSTALACION_CABLEADO', 'MANTENIMIENTO_IMPRESORAS', 'CONFIGURACION_TELEFONIA', 'MANEJO_HERRAMIENTAS'];
const clasificacion = ['HARDWARE','SOFTWARE', 'REDES', 'BASES_DE_DATOS','SEGURIDAD', 'TELEFONÍA', 'IMPRESIÓN', 'CABLEADO'];

const BATCH_SIZE = 1000; // Tamaño del lote

async function createTrabajadores() {
    for(let i = 0; i < 10000; i += BATCH_SIZE) {
        const batchPromises = [];
        for(let j = 0; j < BATCH_SIZE; j++) {
            const cargosUnicos = new Set<string>();
            while (cargosUnicos.size < 3) {
                cargosUnicos.add(faker.helpers.arrayElement(cargos));
            }
            const trabajador: Trabajador = {
                email: faker.internet.email(),
                password: faker.internet.password(),
                nombres: faker.person.firstName(),
                apellidos: faker.person.lastName(),
                rol: faker.helpers.arrayElement(['ADMIN', 'SOPORTE', 'TECNICO']),
                cargo: Array.from(cargosUnicos),
                tiempoExperiencia: faker.number.int({min: 1, max: 10})
            }
            
            const promesa = fetch('http://localhost:8080/api/test/trabajador', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trabajador),
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
            
            batchPromises.push(promesa);
            console.log(`Solicitud ${i + j} enviada`);
        }
        try {
            await Promise.all(batchPromises);
            console.log(`Lote ${i / BATCH_SIZE + 1} completado`);
        } catch (error) {
            console.error('Ocurrió un error en alguna de las solicitudes:', error);
        }
    }
    console.log('Todas las solicitudes de trabajadores se han completado');
}

async function createEquipos() {
    for(let i = 0; i < 10000; i += BATCH_SIZE) {
        const batchPromises = [];
        for(let j = 0; j < BATCH_SIZE; j++) {
            const equipo: Equipo = {
                estadoReparacion: faker.helpers.arrayElement(['REPARABLE', 'IRREPARABLE']),
                descripcion: faker.lorem.sentence(),
                nombre: `PC ${i + j}`,
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
            
            batchPromises.push(promesa);
            console.log(`Solicitud ${i + j} enviada`);
        }
        try {
            await Promise.all(batchPromises);
            console.log(`Lote ${i / BATCH_SIZE + 1} completado`);
        } catch (error) {
            console.error('Ocurrió un error en alguna de las solicitudes:', error);
        }
    }
    console.log('Todas las solicitudes de equipos se han completado');
}

async function createReportes() {
    for(let i = 0; i < 10000; i += BATCH_SIZE) {
        const batchPromises = [];
        for(let j = 0; j < BATCH_SIZE; j++) {
            const registro: Registro = {
                estado: faker.helpers.arrayElement(['TECNICO_NO_NECESARIO', 'TECNICO_POR_ASIGNAR','TECNICO_ASIGNADO']),
                fechaPublicacion: faker.date.between({from: new Date('10/06/2024'), to: new Date('10/07/2025')}).toISOString(),
                prioridad: faker.helpers.arrayElement(['URGENTE', 'NO_URGENTE']),
                titulo: `Registro ${i + j}`,
                userDesignado: null,
                clasificacion: faker.helpers.arrayElement(clasificacion),
                ubicacion: 'Aula 205 NP',
                equipo: {
                    id: faker.number.int({min: 1, max: 50})
                },
                trabajador: {
                    id: faker.number.int({min: 1, max: 50})
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

            batchPromises.push(promesa);
            console.log(`Solicitud ${i + j} enviada`);
        }
        try {
            await Promise.all(batchPromises);
            console.log(`Lote ${i / BATCH_SIZE + 1} completado`);
        } catch (error) {
            console.error('Ocurrió un error en alguna de las solicitudes:', error);
        }
    }
    console.log('Todas las solicitudes de reportes se han completado');
}

async function inicializarDatos() {
    try {
        await createTrabajadores();
        await createEquipos();
        await createReportes();
        console.log('Todas las entidades han sido creadas exitosamente');
    } catch (error) {
        console.error('Ocurrió un error durante la inicialización de los datos:', error);
    }
}

inicializarDatos();
