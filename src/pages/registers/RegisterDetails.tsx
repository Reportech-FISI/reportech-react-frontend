import { useParams } from 'react-router-dom';
import Appbar from '../../components/appbar/Appbar';
import { useEffect, useState } from 'react';
import { Registro } from '../../models/registro/Registro';
import { Equipo } from '../../models/equipo/Equipo';
import RegistersDeleteModal from '../../components/registers/RegistersDeleteModal';
import RegistersUpdate from '../../components/registers/RegistersUpdate';
import { useReporte } from '../../documents/ReporteContext';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

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
    <div className=" container mx-auto mt-16 px-3 shadow-md">
      <div className=' bg-white'>
        <div className=' bg-white p-7 rounded-md'>
          <h1 className="text-3xl font-bold mb-5 text-center">Detalles</h1>
          <div>
          <div className="text-lg font-semibold mb-2">Datos del registro:</div>
            <table className="w-full border-collapse table-auto">
              <tbody>
                <tr>
                  <td className="border p-2">
                    <span className="font-semibold text-blue-700">ID:</span>
                    <span className="ml-2">{reporte.id}</span>
                  </td>
                  <td className="border p-2">
                    <span className="font-semibold text-blue-800 ">Título:</span>
                    <span className="ml-2">{reporte.titulo}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">
                    <span className="font-semibold text-blue-800 ">Fecha:</span>
                    <span className="ml-2">{fechaFormateada}</span>
                  </td>
                  <td className="border p-2">
                    <span className="font-semibold text-blue-800 ">Estado:</span>
                    <span className="ml-2">{reporte.estado}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">
                    <span className="font-semibold text-blue-800 ">Prioridad:</span>
                    <span className="ml-2">{reporte.prioridad}</span>
                  </td>
                  <td className="border p-2">
                    <span className="font-semibold text-blue-800 ">Ubicación:</span>
                    <span className="ml-2">{reporte.ubicacion}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">
                    <span className="font-semibold text-blue-800 ">Reportante:</span>
                    <span className="ml-2">{reporte.userReporterNombre}</span>
                  </td>
                  <td className="border p-2">
                    <span className="font-semibold text-blue-800 ">Clasificación:</span>
                    <span className="ml-2">{reporte.clasificacion}</span>
                  </td>
                </tr>
                {reporte.estado === "TECNICO_NO_NECESARIO" ? (
                  <tr>
                    <td className="border p-2" colSpan={2}>
                      <span className="font-semibold text-blue-800 ">Tecnico especializado no necesario:</span>
                      <span className="ml-2 text-blue-600">Designado a soporte.</span>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td className="border p-2" colSpan={2}>
                      <span className="font-semibold text-blue-800 ">Encargado asignado:</span>
                      <span className="ml-2 ">{reporte.userDesignado}</span>
                    </td>
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
                    <td className="border p-2">
                      <span className="font-semibold text-blue-800 ">ID:</span>
                      <span className="ml-2">{equipo.id}</span>
                    </td>
                    <td className="border p-2 w-2/4 whitespace-normal break-words">
                      <span className="font-semibold text-blue-800 ">Nombre:</span>
                      <span className="ml-2">{equipo.nombre}</span>
                    </td>
                    <td className="border p-2 align-text-top" rowSpan={3}>
                      <span className="font-semibold text-blue-800 ">Foto:</span>
                      <div className="mt-1">
                        {equipo.foto && equipo.foto.id ? (
                          <img src={`http://localhost:8080/api/equipo/img/${equipo.foto.id}`} alt="imagen" className="w-60"/>
                        ) : (
                          <p className="text-gray-700">No hay imagen disponible</p>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2 w-3/4 whitespace-normal break-words" colSpan={2}>
                      <span className="font-semibold text-blue-800 ">Descripción del problema:</span>
                      <span className="ml-2">{equipo.descripcion}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2" colSpan={2}>
                      <span className="font-semibold text-blue-800 ">Estado de reparación:</span>
                      <span className="ml-2">{equipo.estadoReparacion}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>  
          </div>
        <div className='ml-6 flex justify-start py-4'>
          <div 
            className="border border-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-3 rounded mr-2 flex cursor-pointer"
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
              className="border border-orange-400 p-2 px-3 bg-orange-500 hover:bg-orange-700 text-white font-bold  rounded mr-2" 
            >
              <a href={`http://localhost:5173/test`}>
                <PictureAsPdfIcon/>
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

