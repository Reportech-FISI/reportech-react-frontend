import { Button, Fade, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material"
import { style } from "../../styles/style"
import { ModalContent } from "../../styles/modalContent"
import { useState } from "react";
import { generatePassword } from "../../algorithms/generatePassword";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Trabajador } from "../../models/trabajador/Trabajador";

import { Toolbar } from "@mui/material";


const CreateUser = () => {

  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [cargo, setcargo] = useState<string[] | string>([]);
  const [tiempoExperiencia, setTiempoExperiencia] = useState(0);
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openCargo, setOpenCargo] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const generatedPassword = await generatePassword({
      nombres,
      apellidos,
      email,
      rol,
      cargo,
      tiempoExperiencia,
      password: ""
    });
  
    const userData: Trabajador = {
      nombres,
      apellidos,
      email,
      rol,
      cargo,
      tiempoExperiencia,
      password: generatedPassword
    };
  
    setPassword(generatedPassword);
    setOpenDialog(true);
    
    console.log(userData);
    try {
      const response = await fetch('http://localhost:8080/api/trabajador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        handleClose();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="">
      <div className="p-0 flex flex-col items-center justify-end">
        <Toolbar
          sx={{
            width: "90%",
            "@media (min-width: 600px)": {
              paddingLeft: 0,
              paddingRight: 0,
            },
          }}
        >
          <div className="flex justify-start w-full ">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2" color="secondary" onClick={handleOpen}>
              Añadir usuario
            </button>
          </div>
        </Toolbar>
      </div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <ModalContent sx={style}>
            <h2 id="spring-modal-title" className="text-3xl modal-title flex justify-center">
              Añadir usuario
            </h2>
            <div>
              <form onSubmit={handleSubmit} >
              <div className="flex space-x-4">
                <div className='w-1/2 mb-4 mt-2'>
                  <FormControl fullWidth >
                    <TextField 
                      label="Nombres" 
                      value = {nombres}
                      onChange={(e) => setNombres(e.target.value)}
                    />
                  </FormControl>
                </div>

                <div className='w-1/2 mb-4 mt-2'>
                  <FormControl fullWidth>
                    <TextField 
                      label="Apellidos" 
                      value = {apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                    />
                  </FormControl>
                </div>
                </div>
                
                <div className="flex space-x-4">
                <div className='w-3/4 mb-4'>
                  <FormControl fullWidth>
                    <TextField 
                      label="Email" 
                      value = {email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                </div>

                <div className='mb-4'>
                <FormControl fullWidth>
                  <TextField
                    label="Tiempo Experiencia"
                    type="number"
                    value = {tiempoExperiencia}
                    onChange={(e) => setTiempoExperiencia(parseInt(e.target.value))}
                  />
                </FormControl>
                </div> 
                </div>

                <div className='mb-4'>
                  <FormControl fullWidth>
                    {/* Solo SOPORTE o TECNICO */}
                    <InputLabel>Rol</InputLabel>
                    <Select value={rol} onChange={(e) => setRol(e.target.value)}>
                      <MenuItem value={"SOPORTE"}>SOPORTE</MenuItem>
                      <MenuItem value={"TECNICO"}>TECNICO</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                
                <div className='mb-4'>
                <FormControl fullWidth>
                  <InputLabel>Cargo</InputLabel>
                  <Select
                    open={openCargo}
                    onOpen={() => setOpenCargo(true)}
                    onClose={() => setOpenCargo(false)}
                    multiple
                    value={cargo}
                    onChange={(e) => {
                      const selectedValues = Array.isArray(e.target.value) ? e.target.value : [e.target.value];
                      if (selectedValues.length <= 3) {
                        setcargo(selectedValues);
                        if (selectedValues.length === 3) {
                          setOpenCargo(false);
                        }
                      }
                    }}
                  >
                    <MenuItem value={"REPARACION_COMPUTADORAS"}>REPARACION COMPUTADORAS</MenuItem>
                    <MenuItem value={"CONFIGURACION_REDES"}>CONFIGURACION REDES</MenuItem>
                    <MenuItem value={"SOPORTE_SOFTWARE"}>SOPORTE SOFTWARE</MenuItem>
                    <MenuItem value={"PROGRAMACION"}>PROGRAMACION</MenuItem>
                    <MenuItem value={"ADMINISTRACION_BASEDATOS"}>ADMINISTRACION BASEDATOS</MenuItem>
                    <MenuItem value={"SEGURIDAD_INFORMATICA"}>SEGURIDAD INFORMATICA</MenuItem>
                    <MenuItem value={"ANALISIS_SISTEMAS"}>ANALISIS SISTEMAS</MenuItem>
                    <MenuItem value={"CAPACITACION_USUARIOS"}>CAPACITACION USUARIOS</MenuItem>
                    <MenuItem value={"REDACCION_DOCUMENTACION"}>REDACCION DOCUMENTACION</MenuItem>
                    <MenuItem value={"RESOLUCION_PROBLEMAS"}>RESOLUCION PROBLEMAS</MenuItem>
                    <MenuItem value={"ATENCION_CLIENTE"}>ATENCION CLIENTE</MenuItem>
                    <MenuItem value={"INSTALACION_CABLEADO"}>INSTALACION CABLEADO</MenuItem>
                    <MenuItem value={"MANTENIMIENTO_IMPRESORAS"}>MANTENIMIENTO IMPRESORAS</MenuItem>
                    <MenuItem value={"CONFIGURACION_TELEFONIA"}>CONFIGURACION TELEFONIA</MenuItem>
                    <MenuItem value={"MANEJO_HERRAMIENTAS"}>MANEJO HERRAMIENTAS</MenuItem>
                  </Select>
                </FormControl>
                </div>

                <div className="flex justify-between">
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
                </div>
              </form>
            </div>
          </ModalContent>
        </Fade>
      </Modal>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>{"Contraseña generada"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`La contraseña generada es: ${password}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateUser