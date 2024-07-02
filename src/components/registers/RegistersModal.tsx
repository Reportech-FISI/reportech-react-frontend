import { useEffect, useState } from "react";
import {
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { ModalContent } from "../../styles/modalContent";
import { style } from "../../styles/style";
import { Equipo } from "../../models/equipo/Equipo";
import { useAuth } from "../../AuthProvider";

type modalProps = {
  buttonStyles: string;
};

const RegistersModal = ({ buttonStyles }: modalProps) => {
  const { id } = useAuth();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addingNewEquipo, setAddingNewEquipo] = useState(false);

  // Form fields states
  const [estado, setEstado] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState(new Date());
  const [prioridad, setPrioridad] = useState("");
  const [titulo, setTitulo] = useState("");
  const [clasificacion, setClasificacion] = useState("");
  const [estadoReparacion, setEstadoReparacion] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const [equipos, setEquipos] = useState([]);
  const [equipo_id, setEquipoId] = useState("");

  const [foto, setFoto] = useState(null); // Agrega un estado para la imagen

  let id_equipo;

  useEffect(() => {
    const fetchEquipos = async () => {
      const response = await fetch("http://localhost:8080/api/equipos");
      const data = await response.json();
      setEquipos(data);
    };

    fetchEquipos();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const teamData = {
      estado,
      fechaPublicacion: fechaPublicacion.toISOString(),
      prioridad,
      titulo,
      clasificacion,
      ubicacion,
      trabajador: { id },
      equipo: { id: equipo_id },
    };

    const teamDataEquipo = {
      nombre,
      estadoReparacion,
      descripcion,
      foto,
    };

    try {
      if (addingNewEquipo) {
        // Primera solicitud a /api/equipo
        const responseEquipo = await fetch("http://localhost:8080/api/equipo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teamDataEquipo),
        });

        if (!responseEquipo.ok) {
          throw new Error("Error al enviar los datos a /api/equipo");
        }

        const dataEquipo = await responseEquipo.json();
        console.log(dataEquipo);

        // Se actualiza equipo_id con el ID del equipo recién creado
        teamData.equipo = { id: dataEquipo.id };
        id_equipo = dataEquipo.id;
      }

      // Segunda solicitud a /api/reporte
      const responseReporte = await fetch("http://localhost:8080/api/reporte", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      if (!responseReporte.ok) {
        throw new Error("Error al enviar los datos a /api/reporte");
      }

      const dataReporte = await responseReporte.json();
      console.log(dataReporte);

      if (addingNewEquipo) {
        // Enviar imagen si existe
        if (foto) {
          const formData = new FormData();
          formData.append("imagen", foto);

          const imageResponse = await fetch(
            `http://localhost:8080/api/equipo/${id_equipo}/img`,
            {
              method: "POST",
              body: formData,
            },
          );

          if (!imageResponse.ok) {
            throw new Error("Error al enviar la imagen");
          }

          // const imageData = await imageResponse.json();
          // console.log(imageData);
        }
        handleClose();
      }

      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="">
      <button className={buttonStyles} onClick={handleOpen}>
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
          <ModalContent sx={{ 
            width: '90%', 
            maxWidth: '1200px', 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
          }}>
            <h2
              id="spring-modal-title"
              className="text-3xl modal-title flex justify-center bg-yellow-300 py-4 px-4 rounded-lg"
            >
              Crear Registro
            </h2>

            <div className="border border-gray-300 p-4">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-8"
                noValidate
                autoComplete="off"
              >
                <div>

                <div className="flex space-x-4">
                    <div className='w-3/4 mt-6 mb-4'>
                    <FormControl fullWidth>
                      <TextField
                        label="Titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                      />
                    </FormControl>
                    </div>

                    <div className='w-1/4 mt-6 mb-4'>
                    <FormControl fullWidth>
                      <TextField
                        id="datetime-local"
                        label="Fecha"
                        type="datetime-local"
                        value={fechaPublicacion.toISOString().substring(0, 16)}
                        onChange={(e) =>
                          setFechaPublicacion(new Date(e.target.value))
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onClick={() => {
                          console.log(fechaPublicacion);
                        }}
                      />
                    </FormControl>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className='w-1/2 mt-4 mb-4'>
                    <FormControl fullWidth>
                      <InputLabel>Estado</InputLabel>
                      <Select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                      >
                        <MenuItem value={"TECNICO_NO_NECESARIO"}>
                          TECNICO NO NECESARIO
                        </MenuItem>
                        <MenuItem value={"TECNICO_POR_ASIGNAR"}>
                          TECNICO POR ASIGNAR
                        </MenuItem>
                        <MenuItem value={"TECNICO_ASIGNADO"}>
                          TECNICO ASIGNADO
                        </MenuItem>
                      </Select>
                    </FormControl>
                    </div>

                    <div className='w-1/2 mb-4 mt-4'>
                    <FormControl fullWidth>
                      <InputLabel>Prioridad</InputLabel>
                      <Select
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                      >
                        <MenuItem value={"URGENTE"}>URGENTE</MenuItem>
                        <MenuItem value={"NO_URGENTE"}>NO URGENTE</MenuItem>
                      </Select>
                    </FormControl>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                  <div className='w-4/6 mt-4 mb-4'>
                  <FormControl fullWidth>
                    <TextField
                      label="Ubicacion"
                      value={ubicacion}
                      onChange={(e) => setUbicacion(e.target.value)}
                    />
                    </FormControl>
                  </div>
                  <div className='w-2/6 mt-4 mb-4'>
                  <FormControl fullWidth>
                    <InputLabel>Clasificación</InputLabel>
                    <Select
                      value={clasificacion}
                      onChange={(e) => setClasificacion(e.target.value)}
                    >
                      <MenuItem value={"HARDWARE"}>HARDWARE</MenuItem>
                      <MenuItem value={"SOFTWARE"}>SOFTWARE</MenuItem>
                      <MenuItem value={"REDES"}>REDES</MenuItem>
                      <MenuItem value={"BASES_DE_DATOS"}>
                        BASES DE DATOS
                      </MenuItem>
                      <MenuItem value={"SEGURIDAD"}>SEGURIDAD</MenuItem>
                      <MenuItem value={"TELEFONÍA"}>TELEFONÍA</MenuItem>
                      <MenuItem value={"IMPRESIÓN"}>IMPRESIÓN</MenuItem>
                      <MenuItem value={"CABLEADO"}>CABLEADO</MenuItem>
                    </Select>
                  </FormControl>
                  </div>
                  </div>
                </div>

                <div className="">
                  <Button onClick={() => setAddingNewEquipo(false)} variant="outlined"  style={{marginTop: '25px'}} >
                    Seleccionar equipo existente
                  </Button>
                  {addingNewEquipo == false ? (
                    <div>
                      <div className="w-4/4 mt-8 mb-8">
                        <FormControl fullWidth>
                          <InputLabel>Equipo</InputLabel>
                          <Select
                            value={equipo_id}
                            onChange={(e) => setEquipoId(e.target.value)}
                          >
                            {equipos.map((equipo: Equipo) => (
                              <MenuItem key={equipo.id} value={equipo.id}>
                                {equipo.nombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  ) : null}
                  <div>
                  <Button  onClick={() => setAddingNewEquipo(true)} variant="outlined"  style={{marginTop: '25px'}} >
                    Añadir nuevo equipo
                  </Button>
                  {addingNewEquipo == true ? (
                    <div>
                      <h3 className="text-lg mt-8 mb-4 flex items-center justify-center h-full">Datos del equipo</h3>
                      
                     <div className="flex space-x-2"> 
                      <div className="w-4/6 mt-4 mb-4">
                      <FormControl fullWidth>
                          <TextField
                            label="Nombre del equipo"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                          />
                          </FormControl>
                      </div>

                      <div className='w-2/6 mt-4 mb-4'>
                      <FormControl fullWidth>
                        <InputLabel>Estado</InputLabel>
                        <Select
                          value={estadoReparacion}
                          onChange={(e) => setEstadoReparacion(e.target.value)}
                        >
                          <MenuItem value={"REPARABLE"}>REPARABLE</MenuItem>
                          <MenuItem value={"IRREPARABLE"}>IRREPARABLE</MenuItem>
                        </Select>
                      </FormControl>
                      </div>
                      </div>

                      <div className="flex space-x-4">
                      <div className="w-4/6 mt-4 mb-4">
                      <FormControl fullWidth>
                        <TextField
                          label="Descripción"
                          multiline
                          rows={5.5}
                          variant="outlined"
                          className="mt-4"
                          value={descripcion}
                          onChange={(e) => setDescripcion(e.target.value)}
                        />
                        </FormControl>
                      </div>

                      <div className="w-2/6 mt-4 mb-4">
                      <label className="block relative h-40 border border-gray-300 cursor-pointer">
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                document.getElementById('image-preview').src = e.target.result;
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <img id="image-preview" className="h-full w-full object-contain" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-bold opacity-0 hover:opacity-100 transition-opacity duration-300">
                          Subir imagen
                        </div>
                      </label>
                    </div>
                      
                      

                      </div>
                    </div>
                  ) : null}
                  </div>
                </div>
                
                
              </form>
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-2"
                  type="submit"
                  >
                  Guardar
                </button>

                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-2"
                  type="button"
                  onClick={handleClose}
                  >
                Cancelar
                </button>
              </div>
              
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  );
};

export default RegistersModal;
