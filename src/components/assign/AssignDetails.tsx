import { useEffect, useState } from "react"
import { Registro } from "../../models/registro/Registro"
import { Equipo } from "../../models/equipo/Equipo"
import { Typography, Paper } from "@mui/material"
import { styled } from "@mui/system";

type AssignDetailsProps = {
  registerId: number;
  flag: boolean;
};

// const AssignDetails = ({registerId}: {registerId: number}, flag: boolean) => {
const AssignDetails: React.FC<AssignDetailsProps> = ({ registerId, flag }) => {

  const [mostrarDetails, setMostrarDetails] = useState<boolean>(false)

  const [registro, setRegistro] = useState<Registro>({
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

  })

  const [equipo, setEquipo] = useState<Equipo>({
    id: 0,
    estadoReparacion: '',
    descripcion: '',
    foto: null,
    nombre: ''
  })

  useEffect(() => {
    fetch(`http://localhost:8080/api/reporte/${registerId}`)
    .then(res => res.json())
    .then(data => setRegistro(data))
  }, [registerId])

  const fecha = new Date(registro.fechaPublicacion);
  const fechaFormateada = `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;

  const fetchEquipo = async () => {
    await fetch(`http://localhost:8080/api/reporte/${registerId}/equipo/${registro.titulo}`)
      .then(response => response.json())
      .then(data => setEquipo(data));
  };

  useEffect(() => {
    setMostrarDetails(flag);
    fetchEquipo();
  }, [registerId, registro.titulo]);

  return (
    <div>
      {mostrarDetails == false ? (
        <div className="flex justify-center text-2xl mb-7">
          Ningún registro seleccionado.
        </div>
      ): null}
      {mostrarDetails == true ? (

      <div className="grid grid-cols-2 gap-4">
        <div className="ml-5">
          <Paper className="p-5 bg-gray-100 mb-3 w-2/3">
            <Typography variant="h6" className="text-blue-600">Id del registro:</Typography>
            <Typography variant="body1" className="text-gray-700">{registro.id}</Typography>
          </Paper>
          <Paper className="p-5 bg-gray-100 mb-3 w-2/3">
            <Typography variant="h6" className="text-blue-600">Titulo:</Typography>
            <Typography variant="body1" className="text-gray-700">{registro.titulo}</Typography>
          </Paper>
          <Paper className="p-5 bg-gray-100 mb-3 w-60">
            <Typography variant="h6" className="text-blue-600">Fecha de publicacion:</Typography>
            <Typography variant="body1" className="text-gray-700">{fechaFormateada}</Typography>
          </Paper>
          <Paper className="p-5 bg-gray-100 mb-3 w-2/3">
            <Typography variant="h6" className="text-blue-600">Prioridad:</Typography>
            <Typography variant="body1" className="text-gray-700">{registro.prioridad}</Typography>
          </Paper>
          <Paper className="p-5 bg-gray-100 mb-3 w-2/3">
            <Typography variant="h6" className="text-blue-600">Clasificacion:</Typography>
            <Typography variant="body1" className="text-gray-700">{registro.clasificacion}</Typography>
          </Paper>
        </div>
        <div>
          <Paper className="p-5 bg-gray-100 mb-3 w-2/3">
            <Typography variant="h6" className="text-orange-600">Nombre del equipo:</Typography>
            <Typography variant="body1" className="text-gray-700">{equipo.nombre}</Typography>
          </Paper>
          <Paper className="p-5 bg-gray-100 mb-3 w-2/3">
            <Typography variant="h6" className="text-orange-600">Descripcion:</Typography>
            <Typography variant="body1" className="text-gray-700">{equipo.descripcion}</Typography>
          </Paper>
          <Paper className="p-5 bg-gray-100 mb-3 w-2/3">
            <Typography variant="h6" className="text-orange-600">Estado reparacion:</Typography>
            <Typography variant="body1" className="text-gray-700">{equipo.estadoReparacion}</Typography>
          </Paper>
        </div>
      </div>
      ): null}
      
    </div>
  )
}

export default AssignDetails