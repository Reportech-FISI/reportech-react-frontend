import { useState } from 'react'
import { styled, css } from '@mui/system';
import { grey } from '@mui/material/colors';
import { Fade, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';

const RegistersModal = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form fields states
  const [estado, setEstado] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [titulo, setTitulo] = useState("");
  const [clasificacion, setClasificacion] = useState("");
  const [estadoReparacion, setEstadoReparacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [nombre, setNombre] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const teamData = {
      estado,
      fechaPublicacion,
      prioridad,
      titulo,
      clasificacion,
    };

    const teamDataEquipo = {
      nombre,
      estadoReparacion,
      descripcion,
      imagen,
    };

    try {
      // Primera solicitud a /api/equipo
      const responseEquipo = await fetch('http://localhost:8080/api/equipo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamDataEquipo)
      });
  
      if (!responseEquipo.ok) {
        throw new Error('Error al enviar los datos a /api/equipo');
      }
  
      const dataEquipo = await responseEquipo.json();
      console.log(dataEquipo);
  
      // Segunda solicitud a /api/reporte
      const responseReporte = await fetch('http://localhost:8080/api/reporte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamData)
      });

      if (!responseReporte.ok) {
        throw new Error('Error al enviar los datos a /api/reporte');
      }

      const dataReporte = await responseReporte.json();
      console.log(dataReporte);

      handleClose();

    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className=''>
      <button
        className="bg-green-500 hover:bg-green-700 text-xl text-white font-bold py-2 px-4 rounded" 
        onClick={handleOpen}
      >
        +
      </button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <ModalContent sx={style}>
            <h2 id="spring-modal-title" className="text-xl modal-title flex justify-center">
              Crear registro
            </h2>

            <div >
              <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4' noValidate autoComplete="off">
                <div>
                  <FormControl fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select value={estado} onChange={(e) => setEstado(e.target.value)}>
                      <MenuItem value={"TECNICO_NO_NECESARIO"}>TECNICO_NO_NECESARIO</MenuItem>
                      <MenuItem value={"TECNICO_POR_ASIGNAR"}>TECNICO_POR_ASIGNAR</MenuItem>
                      <MenuItem value={"TECNICO_ASIGNADO"}>TECNICO_ASIGNADO</MenuItem>
                    </Select>
                  </FormControl>
                  <div className='mt-6 mb-6'>
                    <TextField
                      id="datetime-local"
                      label="Fecha de publicación"
                      type="datetime-local"
                      value={fechaPublicacion}
                      onChange={(e) => setFechaPublicacion(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onClick={() => {
                        console.log(fechaPublicacion)
                      }}
                    />
                  </div>

                  <FormControl fullWidth>
                    <InputLabel>Prioridad</InputLabel>
                    <Select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                      <MenuItem value={"URGENTE"}>URGENTE</MenuItem>
                      <MenuItem value={"NO_URGENTE"}>NO_URGENTE</MenuItem>
                    </Select>
                  </FormControl>
                  <div className='mt-6 mb-6'>
                    <TextField label="Titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
                  </div>
                  <FormControl fullWidth>
                    <InputLabel>Clasificación</InputLabel>
                    <Select value={clasificacion} onChange={(e) => setClasificacion(e.target.value)}>
                      <MenuItem value={"HARDWARE"}>HARDWARE</MenuItem>
                      <MenuItem value={"SOFTWARE"}>SOFTWARE</MenuItem>
                      <MenuItem value={"REDES"}>REDES</MenuItem>
                      <MenuItem value={"BASES_DE_DATOS"}>BASES_DE_DATOS</MenuItem>
                      <MenuItem value={"SEGURIDAD"}>SEGURIDAD</MenuItem>
                      <MenuItem value={"TELEFONÍA"}>TELEFONÍA</MenuItem>
                      <MenuItem value={"IMPRESIÓN"}>IMPRESIÓN</MenuItem>
                      <MenuItem value={"CABLEADO"}>CABLEADO</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <h3 className="text-lg mb-4">Datos del equipo</h3>
                  <div className='mt-6 mb-6'>
                    <TextField label="Nombre del equipo" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                  </div>
                  <FormControl fullWidth>
                    <InputLabel>Estado de reparación</InputLabel>
                    <Select value={estadoReparacion} onChange={(e) => setEstadoReparacion(e.target.value)}>
                      <MenuItem value={"REPARABLE"}>REPARABLE</MenuItem>
                      <MenuItem value={"IRREPARABLE"}>IRREPARABLE</MenuItem>
                    </Select>
                  </FormControl>
                  <div className='mt-4'>
                    <TextField
                      label="Descripción"
                      multiline
                      rows={4}
                      variant="outlined"
                      className="mt-4"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </div>
                  
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    className="mt-4"
                    onChange={() => setImagen(null)}
                  />
                </div>
                
                <button 
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" 
                  type="submit"
                  
                >
                  Guardar
                </button>
                <button 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
                  type="button" 
                  onClick={handleClose}
                >
                  Cancelar
                </button>
              </form>   
            </div>
            <div className="flex justify-end mt-4">
                  
              </div>
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  )
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
};

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

export default RegistersModal