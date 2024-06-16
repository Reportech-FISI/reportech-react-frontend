import {randEmail, randPassword, randLastName, randFirstName } from '@ngneat/falso';
import { Trabajador } from '../../models/trabajador/Trabajador';

// Ando usando FALSO en vez de Faker debido a que el último no me funcionaba (LO ODIO)

const roles = ['ADMIN', 'SOPORTE', 'TECNICO'];
const cargos = ['REPARACION_COMPUTADORAS', 'CONFIGURACION_REDES', 'SOPORTE_SOFTWARE', 'PROGRAMACION', 'ADMINISTRACION_BASEDATOS', 'SEGURIDAD_INFORMATICA', 'ANALISIS_SISTEMAS', 'CAPACITACION_USUARIOS', 'REDACCION_DOCUMENTACION', 'RESOLUCION_PROBLEMAS', 'ATENCION_CLIENTE', 'INSTALACION_CABLEADO', 'MANTENIMIENTO_IMPRESORAS', 'CONFIGURACION_TELEFONIA', 'MANEJO_HERRAMIENTAS'];

async function createTrabajadores() {
    const promises = [];
    for (let i = 0; i < 1000; i++) {
        const trabajador: Trabajador = {
            email: randEmail(),
            password: randPassword(),
            nombres: randFirstName(),
            apellidos: randLastName(),
            rol: roles[Math.floor(Math.random() * roles.length)],
            cargo: [cargos[Math.floor(Math.random() * cargos.length)]],
            tiempoExperiencia: Math.floor(Math.random() * 10) + 1
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

createTrabajadores();

// Comando para ejecutar este script: (No importa si da error SOLO el ts)
// tsc src/test/trabajador-test/createTrabajador.ts 

// CAMBIAR el nombre del archivo js a 'createTrabajador.cjs'
// node src/test/trabajador-test/createTrabajador.cjs
