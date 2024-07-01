import { useEffect, useState } from 'react'
import { Trabajador } from '../../models/trabajador/Trabajador';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import mergeSort from '../../algorithms/mergeSort';
import SortButtons from '../sortButtons/SortButtons';
import UsersDeleteModal from './UsersDeleteModal';

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
      <TableContainer component={Paper} sx={{ width: "90%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "10%", textAlign: "center" }}>
                Id
                <SortButtons field='id' onSort={toggleSort} />
              </TableCell>
              <TableCell sx={{ width: "20%", textAlign: "center" }}>
                Nombre
                <SortButtons field='nombres' onSort={toggleSort} />
              </TableCell>
              <TableCell sx={{ width: "20%", textAlign: "center" }}>
                Apellido
                <SortButtons field='apellidos' onSort={toggleSort} />
              </TableCell>
              <TableCell sx={{ width: "30%", textAlign: "center" }}>
                Correo
                <SortButtons field='email' onSort={toggleSort} />
              </TableCell>
              <TableCell sx={{ width: "30%", textAlign: "center" }}>
                Cargo
                <SortButtons field='cargo' onSort={toggleSort} />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTrabajadores
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((trabajador: Trabajador) => (
              <TableRow key={trabajador.id}>
                <TableCell>{trabajador.id}</TableCell>
                <TableCell>{trabajador.nombres}</TableCell>
                <TableCell>{trabajador.apellidos}</TableCell>
                <TableCell>{trabajador.email}</TableCell>
                <TableCell>{Array.isArray(trabajador.cargo) ? trabajador.cargo.join(' / ') : trabajador.cargo}</TableCell>
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