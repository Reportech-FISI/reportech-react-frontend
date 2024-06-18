import { useParams } from 'react-router-dom';
import Appbar from '../../components/appbar/Appbar';
import { useEffect, useState } from 'react';
import { Registro } from '../../models/registro/Registro';
import { Equipo } from '../../models/equipo/Equipo';
import RegistersDeleteModal from '../../components/registers/RegistersDeleteModal';
export const RegisterDetails = () => {

  const { registerId } = useParams<{ registerId: string }>();
  const [reporte, setReporte] = useState<Registro>({
    id: 0,
    titulo: '',
    estado: '',
    fechaPublicacion: '',
    prioridad: '',
    userDesignado: null,
    clasificacion: '',
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
    foto: null,
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

  // useEffect(() => {
  //   console.log(reporte);
  //   console.log(equipo);
  // } , []);

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
                <td className="border p-2">Ubicación:</td>
              </tr>
              <tr>
                <td className="border p-2" colSpan={2}>Usuario reportador:</td>
              </tr>
              <tr>
                <td className="border p-2" colSpan={2}>Encargado asignado:</td>
              </tr>
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
                <td className="border p-2 align-text-top" rowSpan={3}>Foto {equipo.foto}:</td>
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
          className="border-red-500 hover:bg-red-500 text-red-500 hover:text-white font-bold py-2 px-4 rounded mr-2 flex cursor-pointer"
        >
          <a
            className="border-red-500 hover:bg-red-500 text-red-500 hover:text-white font-bold py-2 px-4 rounded mr-2 flex" 
          >
            Eliminar: 
          </a>
          <RegistersDeleteModal reporteId={+registerId!} />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" 
        >
          Actualizar
        </button>
      </div>
      
    </div>
    </>
  );
};

