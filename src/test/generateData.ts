import { faker } from '@faker-js/faker';
import { Trabajador } from '../models/trabajador/Trabajador';
import { Equipo } from '../models/equipo/Equipo';
import { Registro } from '../models/registro/Registro';

const cargos = ['REPARACION_COMPUTADORAS', 'CONFIGURACION_REDES', 'SOPORTE_SOFTWARE', 'PROGRAMACION', 'ADMINISTRACION_BASEDATOS', 'SEGURIDAD_INFORMATICA', 'ANALISIS_SISTEMAS', 'CAPACITACION_USUARIOS', 'REDACCION_DOCUMENTACION', 'RESOLUCION_PROBLEMAS', 'ATENCION_CLIENTE', 'INSTALACION_CABLEADO', 'MANTENIMIENTO_IMPRESORAS', 'CONFIGURACION_TELEFONIA', 'MANEJO_HERRAMIENTAS'];
const clasificacion = ['HARDWARE','SOFTWARE', 'REDES', 'BASES_DE_DATOS','SEGURIDAD', 'TELEFONÍA', 'IMPRESIÓN', 'CABLEADO'];
const ubicaciones = [
    'Salón 100',
    'Salón 101',
    'Salón 102',
    'Salón 103',
    'Salón 104',
    'Salón 105',
    'Salón 106',
    'Salón 107',
    'Salón 108',
    'Salón 109',
    'Laboratorio 1° piso',
    'Biblioteca',
    'Unidad de economía',
    'DGA',
    'CERSEU',
    'Departamento académico de CC',
    'Auditorio',
    'Decanato',
    'Salón 200',
    'Salón 201',
    'Salón 202',
    'Salón 203',
    'Salón 204',
    'Salón 206',
    'Salón 207',
    'Salón 208',
    'Salón 209',
    'Salón 210',
    'Aula Magna',
    'Salón tercio estudiantil',
    'Salón de catedráticos',
    'Unidad de posgrado',
    'Unidad de matrícula',
    'Dirección de Escuela de Software',
    'Dirección de Escuela de Sistemas',
    'UNAYOE y Bienestar',
    'Salón 300',
    'Salón 301',
    'Salón 302',
    'Salón 303',
    'Salón 304',
    'Salón 305',
    'Salón 306',
    'Salón 307',
    'Salón 308',
    'Salón 309',
    'Salón 310',
    'Salón 311',
    'Salón 312',
    'Salón 101 - NP',
    'Salón 102 - NP',
    'Salón 103 - NP',
    'Salón 104 - NP',
    'Salón 105 - NP',
    'Salón 106 - NP',
    'Salón 107 - NP',
    'Salón 108 - NP',
    'Salón 109 - NP',
    'Salón de estudio - NP',
    'Data center',
    'Laboratorio 01 - NP',
    'Laboratorio 02 - NP',
    'Laboratorio 03 - NP',
    'Laboratorio 04 - NP',
    'Laboratorio 05 - NP',
    'Laboratorio 06 - NP',
    'Salón 200 - NP',
    'Salón 201 - NP',
    'Salón 202 - NP',
    'Laboratorio 07 - NP',
    'Laboratorio 08 - NP',
    'Salón de música',
    'General (pabellón principal)',
    'General (pabellón nuevo)',
    'General (todo el campus)'
]

const BATCH_SIZE = 1000; // Tamaño del lote

async function createTrabajadores() {
    for(let i = 0; i < 1000; i += BATCH_SIZE) {
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
    for(let i = 0; i < 1000; i += BATCH_SIZE) {
        const batchPromises = [];
        for(let j = 0; j < BATCH_SIZE; j++) {
            const equipo: Equipo = {
                estadoReparacion: faker.helpers.arrayElement(['REPARABLE', 'IRREPARABLE']),
                descripcion: faker.lorem.sentence(),
                nombre: faker.commerce.productName(), 
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

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function createReportes() {
    for(let i = 0; i < 1000; i += BATCH_SIZE) {
        const batchPromises = [];
        for(let j = 0; j < BATCH_SIZE; j++) {
            const registro: Registro = {
                estado: faker.helpers.arrayElement(['TECNICO_NO_NECESARIO', 'TECNICO_POR_ASIGNAR','TECNICO_ASIGNADO']),
                fechaPublicacion: faker.date.between({from: new Date('01/01/2024'), to: new Date('12/12/2024')}).toISOString(),
                prioridad: faker.helpers.arrayElement(['URGENTE', 'NO_URGENTE']),
                titulo: `${capitalizeFirstLetter(faker.hacker.verb())} ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
                userDesignado: null,
                clasificacion: faker.helpers.arrayElement(clasificacion),
                ubicacion: faker.helpers.arrayElement(ubicaciones),
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

// npx tsx src/test/generateData.ts