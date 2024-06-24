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
          <ModalContent sx={style}>
            <h2
              id="spring-modal-title"
              className="text-xl modal-title flex justify-center"
            >
              Crear registro
            </h2>

            <div>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-4"
                noValidate
                autoComplete="off"
              >
                <div>
                  <FormControl fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                    >
                      <MenuItem value={"TECNICO_NO_NECESARIO"}>
                        TECNICO_NO_NECESARIO
                      </MenuItem>
                      <MenuItem value={"TECNICO_POR_ASIGNAR"}>
                        TECNICO_POR_ASIGNAR
                      </MenuItem>
                      <MenuItem value={"TECNICO_ASIGNADO"}>
                        TECNICO_ASIGNADO
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <div className="mt-6 mb-6">
                    <TextField
                      id="datetime-local"
                      label="Fecha de ocurrencia"
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
                  </div>

                  <FormControl fullWidth>
                    <InputLabel>Prioridad</InputLabel>
                    <Select
                      value={prioridad}
                      onChange={(e) => setPrioridad(e.target.value)}
                    >
                      <MenuItem value={"URGENTE"}>URGENTE</MenuItem>
                      <MenuItem value={"NO_URGENTE"}>NO_URGENTE</MenuItem>
                    </Select>
                  </FormControl>
                  <div className="mt-6 mb-6">
                    <TextField
                      label="Titulo"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                    />
                  </div>
                  <div className="mt-6 mb-6">
                    <TextField
                      label="Ubicacion"
                      value={ubicacion}
                      onChange={(e) => setUbicacion(e.target.value)}
                    />
                  </div>
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
                        BASES_DE_DATOS
                      </MenuItem>
                      <MenuItem value={"SEGURIDAD"}>SEGURIDAD</MenuItem>
                      <MenuItem value={"TELEFONÍA"}>TELEFONÍA</MenuItem>
                      <MenuItem value={"IMPRESIÓN"}>IMPRESIÓN</MenuItem>
                      <MenuItem value={"CABLEADO"}>CABLEADO</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <Button onClick={() => setAddingNewEquipo(false)}>
                    Seleccionar equipo existente
                  </Button>
                  {addingNewEquipo == false ? (
                    <div>
                      <div>
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
                  <Button onClick={() => setAddingNewEquipo(true)}>
                    Añadir nuevo equipo
                  </Button>
                  {addingNewEquipo == true ? (
                    <div>
                      <h3 className="text-lg mb-4">Datos del equipo</h3>
                      <div className="mt-6 mb-6">
                        <TextField
                          label="Nombre del equipo"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                        />
                      </div>

                      <FormControl fullWidth>
                        <InputLabel>Estado de reparación</InputLabel>
                        <Select
                          value={estadoReparacion}
                          onChange={(e) => setEstadoReparacion(e.target.value)}
                        >
                          <MenuItem value={"REPARABLE"}>REPARABLE</MenuItem>
                          <MenuItem value={"IRREPARABLE"}>IRREPARABLE</MenuItem>
                        </Select>
                      </FormControl>

                      <div className="mt-4">
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
                        type="file"
                        onChange={(e) => setFoto(e.target.files[0])} // Añade esto para manejar la imagen
                        className="my-2"
                      />
                    </div>
                  ) : null}
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
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  );
};

export default RegistersModal;
