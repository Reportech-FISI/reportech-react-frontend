import { useEffect, useState } from 'react'
import { Trabajador } from '../../models/trabajador/Trabajador';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography } from '@mui/material';
import mergeSort from '../../algorithms/mergeSort';
import SortButtons from '../sortButtons/SortButtons';
import UsersDeleteModal from './UsersDeleteModal';
import { styled } from '@mui/material/styles';

const CargoTypography = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '0.75rem',
  color: 'white',
  backgroundColor: 'grey',
  borderRadius: 8,
  padding: '3px 10px',
  display: 'inline-block',
  marginBottom: '3px',
  marginRight: '6px'
}));

const TitleTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: ' #879ff1 ',
  color: theme.palette.getContrastText(theme.palette.primary.dark),
}));

const UsersTable = () => {

  const [trabajadores, setTrabajadores] = useState<Set<Trabajador> >(new Set());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<keyof Trabajador>('id'); 

  const toggleSort = (field: string, isAscending: boolean) => {
    setSortDirection(isAscending ? 'asc' : 'desc');
    setSortField(field as keyof Trabajador);
  };

  const fetchTrabajadores = async () => {
    const response = await fetch('http://localhost:8080/api/trabajadores');
    const data: Set<Trabajador> = await response.json();
    setTrabajadores(data);
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };  

  // 3/5  Algoritmos
  const sortedTrabajadores = mergeSort([...trabajadores], sortField, sortDirection);

  useEffect(() => {
    fetchTrabajadores();
  }, []);

  return (
    <div className='flex items-center justify-center'>
      <TableContainer component={Paper} sx={{ width: "90%", borderRadius: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TitleTableCell sx={{ width: "10%", textAlign: "center" }}>
                Id
                <SortButtons field='id' onSort={toggleSort} />
              </TitleTableCell>
              <TitleTableCell sx={{ width: "10%", textAlign: "center" }}>
                Nombre
                <SortButtons field='nombres' onSort={toggleSort} />
              </TitleTableCell>
              <TitleTableCell sx={{ width: "10%", textAlign: "center" }}>
                Apellido
                <SortButtons field='apellidos' onSort={toggleSort} />
              </TitleTableCell>
              <TitleTableCell sx={{ width: "30%", textAlign: "center" }}>
                Correo
                <SortButtons field='email' onSort={toggleSort} />
              </TitleTableCell>
              <TitleTableCell sx={{ width: "80%", textAlign: "center" }}>
                Cargo
                <SortButtons field='cargo' onSort={toggleSort} />
              </TitleTableCell>
              <TitleTableCell></TitleTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTrabajadores
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((trabajador: Trabajador) => (
              <TableRow key={trabajador.id}>
                <TableCell sx={{ width: "10%", textAlign: "center" }}>{trabajador.id}</TableCell>
                <TableCell sx={{ width: "10%", textAlign: "center" }}>{trabajador.nombres}</TableCell>
                <TableCell sx={{ width: "10%", textAlign: "center" }}>{trabajador.apellidos}</TableCell>
                <TableCell sx={{ width: "30%", textAlign: "center" }}>{trabajador.email}</TableCell>                
                <TableCell sx={{ width: "80%", textAlign: "center" }}>
                  {Array.isArray(trabajador.cargo) ? trabajador.cargo.map((cargo, index) => (
                    <CargoTypography 
                    key={index}
                    style={{
                      backgroundColor:
                        cargo === 'REPARACION_COMPUTADORAS' ? '#FFD700' :
                        cargo === 'CONFIGURACION_REDES' ? '#1E90FF' :
                        cargo === 'SOPORTE_SOFTWARE' ? '#32CD32' :
                        cargo === 'PROGRAMACION' ? '#8A2BE2' :
                        cargo === 'ADMINISTRACION_BASEDATOS' ? '#FF4500' :
                        cargo === 'SEGURIDAD_INFORMATICA' ? '#B22222' :
                        cargo === 'ANALISIS_SISTEMAS' ? '#DAA520' :
                        cargo === 'CAPACITACION_USUARIOS' ? '#20B2AA' :
                        cargo === 'REDACCION_DOCUMENTACION' ? '#778899' :
                        cargo === 'RESOLUCION_PROBLEMAS' ? '#2E8B57' :
                        cargo === 'ATENCION_CLIENTE' ? '#FF69B4' :
                        cargo === 'INSTALACION_CABLEADO' ? '#A52A2A' :
                        cargo === 'MANTENIMIENTO_IMPRESORAS' ? '#DEB887' :
                        cargo === 'CONFIGURACION_TELEFONIA' ? '#5F9EA0' :
                        cargo === 'MANEJO_HERRAMIENTAS' ? '#9ACD32' :
                        'transparent' // Color por defecto si no coincide con ninguno
                    }}
                  >
                    {cargo}
                  </CargoTypography>
                  )) : trabajador.cargo}
                </TableCell>
                <TableCell>
                  <UsersDeleteModal userId={trabajador.id ?? 0}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={Array.from(trabajadores).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      
    </div>
  )
}

export default UsersTable