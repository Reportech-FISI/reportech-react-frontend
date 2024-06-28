import { useParams } from 'react-router-dom';
import Appbar from '../../components/appbar/Appbar';
import { useEffect, useState } from 'react';
import { Registro } from '../../models/registro/Registro';
import { Equipo } from '../../models/equipo/Equipo';
import RegistersDeleteModal from '../../components/registers/RegistersDeleteModal';
import RegistersUpdate from '../../components/registers/RegistersUpdate';
import { useReporte } from '../../documents/ReporteContext';

export const RegisterDetails = () => {

  const { setReporteC, setEquipoC } = useReporte();

  const [flagEstado, setFlagEstado] = useState(false);

  const { registerId } = useParams<{ registerId: string }>();
  const [reporte, setReporte] = useState<Registro>({
    id: 0,
    userReporterNombre: '',
    titulo: '',
    estado: '',
    fechaPublicacion: '',
    prioridad: '',
    userDesignado: null,
    clasificacion: '',
    ubicacion: '',
    equipo: {
      id: 0
    },
    trabajador: {
      id: 0
    }
  });

  const [equipo, setEquipo] = useState<Equipo>({
    id: 0,
    estadoReparacion: '',
    descripcion: '',
    foto: {
      id: 0,
      name: ''
    },
    nombre: '' 
  });


  useEffect(() => {
    fetch(`http://localhost:8080/api/reporte/${registerId}`)
      .then(response => response.json())
      .then(data => setReporte(data));
  }, [registerId]);
  
  const fecha = new Date(reporte.fechaPublicacion);
  const fechaFormateada = `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;

  const fetchEquipo = async () => {
    await fetch(`http://localhost:8080/api/reporte/${registerId}/equipo/${reporte.titulo}`)
      .then(response => response.json())
      .then(data => setEquipo(data));

  };

  useEffect(() => {
    fetchEquipo();
  }, [registerId, reporte.titulo]);

  useEffect(() => {
    setReporteC(reporte);
    setEquipoC(equipo);
    if(equipo.foto == null) localStorage.setItem("fotoid", String("0"));
    else localStorage.setItem("fotoid", String(equipo.foto.id)); 
  }, [reporte, equipo]);

  return (
    <>
    <Appbar/>
    <div className="container mx-auto pt-16 p-5 bg-white shadow-md">
      <div>
      <h1 className="text-3xl font-bold mb-5 text-center">Detalles</h1>
      <div>
        <div className="text-lg font-semibold mb-2">Datos del registro:</div>
          <table className="w-full border-collapse table-auto">
            <tbody>
              <tr>
                <td className="border p-2">ID: {reporte.id}</td>
                <td className="border p-2">Título: {reporte.titulo}</td>
              </tr>
              <tr>
                <td className="border p-2">Fecha: {fechaFormateada} </td>
                <td className="border p-2">Estado: {reporte.estado} </td>
              </tr>
              <tr>
                <td className="border p-2">Prioridad: {reporte.prioridad} </td>
                <td className="border p-2">Ubicación: {reporte.ubicacion}</td>
              </tr>
              <tr>
                <td className="border p-2" >Reportante: {reporte.userReporterNombre}</td>
                <td className='border p-2' >Clasificacion: {reporte.clasificacion} </td>
              </tr>
              { reporte.estado == "TECNICO_NO_NECESARIO" ? (
                <tr>
                  <td className="border p-2" colSpan={2}>Tecnico especializado no necesario: Designado a soporte.</td>
                </tr>
              ) : (
                <tr>
                  <td className="border p-2" colSpan={2}>Encargado asignado: {reporte.userDesignado}</td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
        <div>
          <div className="text-lg font-semibold mt-5 mb-2">Datos del equipo:</div>
          <table className="w-full border-collapse table-auto">
            <tbody>
              <tr>
                <td className="border p-2">ID: {equipo.id}</td>
                <td className="border p-2 w-2/4 whitespace-normal break-words">Nombre: {equipo.nombre}</td>
                <td className="border p-2 align-text-top" rowSpan={3}>Foto :
                {equipo.foto && equipo.foto.id ? (
                  <img src={`http://localhost:8080/api/equipo/img/${equipo.foto.id}`} alt="imagen" className="w-60"/>
                ) : (
                  <p className="text-gray-700">No hay imagen disponible</p>
                )}
                </td>
              </tr>
              <tr>
                <td className="border p-2 w-3/4 whitespace-normal break-words" colSpan={2}>Descripción del problema: {equipo.descripcion}</td>
              </tr>
              <tr>
                <td className="border p-2" colSpan={2}>Estado de reparación: {equipo.estadoReparacion} </td>
              </tr>
            </tbody>
          </table>
        </div>  
      </div>
      <div className='flex justify-start mt-4'>
        <div 
          className="border-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded mr-2 flex cursor-pointer"
        >
          <RegistersDeleteModal reporteId={+registerId!} />
        </div>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded mr-2" 
          >
            <RegistersUpdate registro = {reporte}/>
          </button>
        </div>
        <div>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold  rounded mr-2" 
          >
            <a href={`http://localhost:5173/test`}>
              Generar PDF
            </a>
          </button>
        </div>
      </div>
      
    </div>
    </>
  );
};

