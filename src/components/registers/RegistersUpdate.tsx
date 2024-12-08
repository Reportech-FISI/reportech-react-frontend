import { useEffect, useState } from "react";
import { ModalContent } from "../../styles/modalContent";
import { style } from "../../styles/style";
import { Cached } from "@mui/icons-material";
import { Button, Fade, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";

const RegistersUpdate = ({registro}) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [estado, setEstado] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState(new Date());
  const [prioridad, setPrioridad] = useState("");
  const [titulo, setTitulo] = useState("");
  const [clasificacion, setClasificacion] = useState("");
  const [ubicacion, setUbicacion] = useState("");


  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const data = {
      estado,
      fechaPublicacion,
      prioridad,
      titulo,
      clasificacion,
      ubicacion,
    }

    console.log(data);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/reporte/${registro.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Error al enviar los datos a /api/reporte');
    }

    const responseData = await response.json();
    console.log(responseData);
    
  };

  return (
    <div className=''>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold py-2 px-4 rounded" 
        onClick={handleOpen}
      >
        <Cached/>

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
              Actualizar registro
            </h2>

            <div >
              <form onSubmit={handleSubmit} className='' noValidate autoComplete="off">
                <div className="mb-5">
                  <FormControl fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select value={estado} onChange={(e) => setEstado(e.target.value)}>
                      <MenuItem value={"NO_NECESARIO"}>NO_NECESARIO</MenuItem>
                      <MenuItem value={"POR_RESOLVER"}>POR_RESOLVER</MenuItem>
                      <MenuItem value={"RESUELTO"}>RESUELTO</MenuItem>
                    </Select>
                  </FormControl>

                  <div className='mt-6 mb-6'>
                    <TextField
                      id="datetime-local"
                      label="Fecha de ocurrencia"
                      type="datetime-local"
                      value={fechaPublicacion.toISOString().substring(0,16)}
                      onChange={(e) => setFechaPublicacion(new Date(e.target.value))}
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
                  <div className='mt-6 mb-6'>
                    <TextField label="Ubicacion" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}/>
                  </div>
                  <FormControl fullWidth>
                    <InputLabel>Clasificación</InputLabel>
                    <Select value={clasificacion} onChange={(e) => setClasificacion(e.target.value)}>
                      <MenuItem value={"PRODUCTOS"}>PRODUCTOS</MenuItem>
                      <MenuItem value={"INVENTARIO"}>INVENTARIO</MenuItem>
                      <MenuItem value={"VENTAS"}>VENTAS</MenuItem>
                      <MenuItem value={"COMPRAS"}>COMPRAS</MenuItem>
                      <MenuItem value={"CLIENTES"}>CLIENTES</MenuItem>
                      <MenuItem value={"PROVEEDORES"}>PROVEEDORES</MenuItem>
                      <MenuItem value={"FACTURACIÓN"}>FACTURACIÓN</MenuItem>
                      <MenuItem value={"ENVÍOS"}>ENVÍOS</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                
                <button 
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" 
                  type="submit"
                >
                  Actualizar
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

          </ModalContent>
        </Fade>
      </Modal>
    </div>
  )
}


export default RegistersUpdate