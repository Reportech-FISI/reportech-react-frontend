import React, { useEffect, useState } from 'react'
import { TableBody, TableCell, TableHead, TableRow, Paper, TablePagination, TableContainer } from '@mui/material'
import Table from '@mui/material/Table';
import quickSort from '../../algorithms/quickSort';
import SortButtons from '../sortButtons/SortButtons';
import { Reporte } from '../../models/Reporte_Fila';

// TODO: Crear mockup de reporte

const AssignTable = () => {

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
    setReportes(data);
  };

  const sortedReportes = quickSort([...reportes], (a: Reporte, b: Reporte) => {
    const comparison = String(a[sortField]).localeCompare(String(b[sortField]));
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };  
  
  useEffect(() => {
    fetchReportes();
  }, []);

  useEffect(() => {
    const sortedData = quickSort([...reportes], (a: Reporte, b: Reporte) => {
      const comparison = String(a[sortField]).localeCompare(String(b[sortField]));
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    setReportes(sortedData);
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
                Clasificacion
                <SortButtons field="clasificacion" onSort={toggleSort} />
              </TableCell>
              <TableCell>
                Fecha de Publicación
                <SortButtons field="fechaPublicacion" onSort={toggleSort} />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedReportes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((reporte : Reporte) => {

              const fecha = new Date(reporte.fechaPublicacion);
              const fechaFormateada = `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;

              return (
                <TableRow 
                key={reporte.id} 
                onClick={() => alert(`Reporte seleccionado: ${reporte.titulo}`)}>
                  <TableCell>{reporte.id}</TableCell>
                  <TableCell>{reporte.titulo}</TableCell>
                  <TableCell>{reporte.clasificacion}</TableCell>
                  <TableCell>{fechaFormateada}</TableCell>
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

export default AssignTable