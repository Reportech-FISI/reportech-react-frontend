import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, TableBody, TableCell, TableHead, TableRow, Paper, TablePagination, TableContainer } from '@mui/material'
import Table from '@mui/material/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import quickSort from '../../algorithms/quickSort';
import SortButtons from '../sortButtons/SortButtons';


interface Reporte {
  id: number;
  titulo: string;
  estado: string;
  fechaPublicacion: string;
  prioridad: string
}

const RegistersTable = () => {

  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState('asc'); // Ascendente por defecto
  const [sortField, setSortField] = useState<keyof Reporte>('fechaPublicacion'); // Por defecto se ordena por fecha de publicación
  
  const toggleSort = (field: keyof Reporte, isAscending: boolean) => {
    setSortDirection(isAscending ? 'asc' : 'desc');
    setSortField(field);
  };
  
  const fetchReportes = async () => {
    const response = await fetch('http://localhost:8080/api/reportes');
    const data: Reporte[] = await response.json();
    const sortedData = quickSort([...data], (a: Reporte, b: Reporte) => {
      const comparison = String(a[sortField]).localeCompare(String(b[sortField]));
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    setReportes(sortedData);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };  
  
  useEffect(() => {
    fetchReportes();
  }, [sortField, sortDirection]);

  return (
    <div className='flex items-center justify-center ' >
      <TableContainer component={Paper} sx={{ width: '80%' }} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Id
                <SortButtons field="id" onSort={toggleSort} />
              </TableCell>
              <TableCell>
                Titulo
                <SortButtons field="titulo" onSort={toggleSort} />
              </TableCell>
              <TableCell>
                Estado
                <SortButtons field="estado" onSort={toggleSort} />
              </TableCell>
              <TableCell>
                Prioridad
                <SortButtons field="prioridad" onSort={toggleSort} />
              </TableCell>
              <TableCell>
                Fecha de Publicación
                <SortButtons field="fechaPublicacion" onSort={toggleSort} />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reportes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((reporte : Reporte) => {

              const fecha = new Date(reporte.fechaPublicacion);
              const fechaFormateada = `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;

              return (
                <TableRow key={reporte.id}>
                  <TableCell>{reporte.id}</TableCell>
                  <TableCell>{reporte.titulo}</TableCell>
                  <TableCell>{reporte.estado}</TableCell>
                  <TableCell>{reporte.prioridad}</TableCell>
                  <TableCell>{fechaFormateada}</TableCell>
                  <TableCell>
                    <button>
                      <DeleteIcon color='error' />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={reportes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      
    </div>
  )
}

export default RegistersTable