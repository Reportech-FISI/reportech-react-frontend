import { useEffect, useState } from 'react'
import { Trabajador } from '../../models/trabajador/Trabajador';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import mergeSort from '../../algorithms/mergeSort';
import SortButtons from '../sortButtons/SortButtons';

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

  // 3/5  Algoritmos
  const sortedTrabajadores = mergeSort([...trabajadores], sortField, sortDirection);

  useEffect(() => {
    fetchTrabajadores();
  }, []);

  return (
    <div className='flex justify-center'>
      <TableContainer component={Paper} sx={{width: '70%'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Id
                <SortButtons field='id' onSort={toggleSort} />
              </TableCell>
              <TableCell>
                Nombre
                <SortButtons field='nombres' onSort={toggleSort} />
              </TableCell>
              <TableCell>
                Apellido
                <SortButtons field='apellidos' onSort={toggleSort} />
              </TableCell>
              <TableCell>
                Correo
                <SortButtons field='email' onSort={toggleSort} />
              </TableCell>
              <TableCell>
                Cargo
                <SortButtons field='cargo' onSort={toggleSort} />
              </TableCell>
              {/* Agrega aquí más celdas de encabezado si tus usuarios tienen más campos */}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTrabajadores.map((trabajador: Trabajador) => (
              <TableRow key={trabajador.id}>
                <TableCell>{trabajador.id}</TableCell>
                <TableCell>{trabajador.nombres}</TableCell>
                <TableCell>{trabajador.apellidos}</TableCell>
                <TableCell>{trabajador.email}</TableCell>
                <TableCell>{trabajador.cargo}</TableCell>
                {/* Agrega aquí más celdas si tus usuarios tienen más campos */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  )
}

export default UsersTable