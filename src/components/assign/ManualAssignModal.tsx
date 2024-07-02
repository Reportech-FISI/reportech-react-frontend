import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { ModalContent } from "../../styles/modalContent"
import { style } from "../../styles/style"
import { useEffect, useState } from "react";
import { Trabajador } from "../../models/trabajador/Trabajador";
import mergeSort from "../../algorithms/mergeSort";
import SortButtons from "../sortButtons/SortButtons";

const ManualAssignModal = ({registerId}: {registerId: number}) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };  

  const [trabajadores, setTrabajadores] = useState<Set<Trabajador> >(new Set());

  const fetchTrabajadores = async () => {
    const response = await fetch('http://localhost:8080/api/trabajadores');
    const data: Set<Trabajador> = await response.json();
    const tecnicos = Array.from(data).filter(trabajador => trabajador.rol! === 'TECNICO');
    setTrabajadores(new Set(tecnicos));
    //setTrabajadores(data);
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

  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<keyof Trabajador>('id'); 

  const toggleSort = (field: string, isAscending: boolean) => {
    setSortDirection(isAscending ? 'asc' : 'desc');
    setSortField(field as keyof Trabajador);
  };

  const sortedTrabajadores = mergeSort([...trabajadores], sortField, sortDirection);

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

    // Envio por correo de notificacion de la asignación

    const subject = "Nueva asignación de reporte";
    const message = `Se le ha asignado el reporte ${registro.titulo}.\nAcceder al sistema para ver los detalles.`;

    try {
      const response = await fetch(`http://localhost:8080/api/mail/send/assigned/${trabajadorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({subject, message})
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos a /api/mail');
      }

    } catch (error) {
      console.error('Error:', error);
    }

    setTimeout(() => {console.log("Enviando...")}, 3000)
    location.reload();
  }

  return (
    <div>
      <Button sx={{backgroundColor: 'white', padding: 1.5, borderRadius: 2}} onClick={handleOpen}>
        Asignación manual
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{height: '80%', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
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
                      <SortButtons field='id' onSort={toggleSort} />
                    </TableCell>
                    <TableCell>
                      Nombre
                      <SortButtons field='id' onSort={toggleSort} />
                    </TableCell>
                    <TableCell>
                      Apellido
                      <SortButtons field='id' onSort={toggleSort} />
                    </TableCell>
                    <TableCell>
                      Cargo
                      <SortButtons field='id' onSort={toggleSort} />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from(sortedTrabajadores)
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
                      <TableCell>{Array.isArray(trabajador.cargo) ? trabajador.cargo.join(' / ') : trabajador.cargo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
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