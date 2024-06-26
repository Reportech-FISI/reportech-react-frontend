import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { ModalContent } from "../../styles/modalContent"
import { style } from "../../styles/style"
import { useEffect, useState } from "react";
import { Registro } from "../../models/registro/Registro";
import { Trabajador } from "../../models/trabajador/Trabajador";

const ManualAssignModal = ({registerId}: {registerId: number}) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 7));
    setPage(0);
  };  

  const [trabajadores, setTrabajadores] = useState<Set<Trabajador> >(new Set());

  const fetchTrabajadores = async () => {
    const response = await fetch('http://localhost:8080/api/trabajadores');
    const data: Set<Trabajador> = await response.json();
    setTrabajadores(data);
  }

  const [userNombreAsignado, setUserNombreAsignado] = useState('');
  const [userApellidoAsignado, setUserApellidoAsignado] = useState('');
  const [trabajadorId, setTrabajadorId] = useState(0);

  const [registro, setRegistro] = useState({
    id: 0,
    titulo: '',
    prioridad: '',
    clasificacion: '',
  })

  useEffect(() => {
    fetch(`http://localhost:8080/api/reporte/${registerId}`)
    .then(res => res.json())
    .then(data => setRegistro(data))
  }, [registerId])


  useEffect(() => {
    fetchTrabajadores();
  }, []);

  // const [estado, setEstado] = useState("TECNICO_ASIGNADO");
  const [userDesignado, setUserDesignado] = useState("");

  const handleSetUserDesignado = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const data = {
      userDesignado
      // estado
    }

    const response = await fetch(`http://localhost:8080/api/reporte/${registerId}/${trabajadorId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Error al enviar los datos a /api/reporte/registerId/trabajadorId');
    }

    console.log(response.json())

    setTimeout(() => {console.log("Enviando...")}, 1000)
    location.reload();
  }

  return (
    <div>
      <Button sx={{backgroundColor: 'white'}} onClick={handleOpen}>
        Asignacion manual
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <ModalContent sx={style}>
            <div className="mt-2 mb-2">
              <h1 className="font-semibold text-2xl mb-1">Reporte seleccionado</h1>
              <h1>Id: {registro.id}</h1>
              <h1>Titulo: {registro.titulo}</h1>
              <h1>Prioridad: {registro.prioridad}</h1>
              <h1>Clasificacion: {registro.clasificacion}</h1>
            </div>

          <h1 className="font-semibold text-2xl mb-1">Usuario por asignar</h1>
          <TableContainer component={Paper} >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Id
                  </TableCell>
                  <TableCell>
                    Nombre
                  </TableCell>
                  <TableCell>
                    Apellido
                  </TableCell>
                  <TableCell>
                    Cargo
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from(trabajadores)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((trabajador: Trabajador) => (
                  <TableRow key={trabajador.id} onClick={
                    () => {
                      setUserNombreAsignado(trabajador.nombres);
                      setUserApellidoAsignado(trabajador.apellidos);
                      setTrabajadorId(trabajador.id!);
                      setOpenDialog(true);
                      setUserDesignado(trabajador.nombres + ' ' + trabajador.apellidos);
                    }
                  }>
                    <TableCell>{trabajador.id}</TableCell>
                    <TableCell>{trabajador.nombres}</TableCell>
                    <TableCell>{trabajador.apellidos}</TableCell>
                    <TableCell>{trabajador.cargo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[7, 15, 40]}
              component="div"
              count={Array.from(trabajadores).length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
          </ModalContent>
        </Fade>
      </Modal>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>{"Asignación manual"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Desea que ${userNombreAsignado} ${userApellidoAsignado} sea asignado en ${registro.titulo} ?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick = {handleSetUserDesignado}
          >
            Aceptar
          </Button>
          <Button onClick={() => setOpenDialog(false)}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ManualAssignModal