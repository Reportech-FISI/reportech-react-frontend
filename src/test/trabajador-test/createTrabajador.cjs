"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var falso_1 = require("@ngneat/falso");
// Ando usando FALSO en vez de Faker debido a que el último no me funcionaba (LO ODIO)
var roles = ['ADMIN', 'SOPORTE', 'TECNICO'];
var cargos = ['REPARACION_COMPUTADORAS', 'CONFIGURACION_REDES', 'SOPORTE_SOFTWARE', 'PROGRAMACION', 'ADMINISTRACION_BASEDATOS', 'SEGURIDAD_INFORMATICA', 'ANALISIS_SISTEMAS', 'CAPACITACION_USUARIOS', 'REDACCION_DOCUMENTACION', 'RESOLUCION_PROBLEMAS', 'ATENCION_CLIENTE', 'INSTALACION_CABLEADO', 'MANTENIMIENTO_IMPRESORAS', 'CONFIGURACION_TELEFONIA', 'MANEJO_HERRAMIENTAS'];
function createTrabajadores() {
    return __awaiter(this, void 0, void 0, function () {
        var promises, i, trabajador, promesa, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = [];
                    for (i = 0; i < 50; i++) {
                        trabajador = {
                            email: (0, falso_1.randEmail)(),
                            password: (0, falso_1.randPassword)(),
                            nombres: (0, falso_1.randFirstName)(),
                            apellidos: (0, falso_1.randLastName)(),
                            rol: roles[Math.floor(Math.random() * roles.length)],
                            cargo: [cargos[Math.floor(Math.random() * cargos.length)]],
                            tiempoExperiencia: Math.floor(Math.random() * 10) + 1
                        };
                        promesa = fetch('http://localhost:8080/api/test/trabajador', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(trabajador),
                        })
                            .then(function (response) { return response.json(); })
                            .then(function (data) { return console.log(data); })
                            .catch(function (error) { return console.error('Error:', error); });
                        promises.push(promesa);
                        console.log("Solicitud ".concat(i, " enviada"));
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    _a.sent();
                    console.log('Todas las solicitudes se han completado');
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Ocurrió un error en alguna de las solicitudes:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
createTrabajadores();
// Comando para ejecutar este script: (No importa si da error SOLO el ts)
// tsc src/test/trabajador-test/createTrabajador.ts 
// CAMBIAR el nombre del archivo js a 'createTrabajador.cjs'
// node src/test/trabajador-test/createTrabajador.cjs
