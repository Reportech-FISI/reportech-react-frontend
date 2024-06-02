import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, TableBody, TableCell, TableHead, TableRow, Paper, TablePagination, TableContainer } from '@mui/material'
import Table from '@mui/material/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import quickSort from '../../alghoritms/quickSort';
import SortButtons from '../sortButtons/SortButtons';

const RegistersTable = () => {

  interface Reporte {
    id: number;
    titulo: string;
    estado: string;
    fechaPublicacion: string;
    prioridad: string
  }

  const [reportes, setReportes] = useState([]);
  const [page, setPage] = useState(0);

  // Test: 
  const sortedReportes = quickSort(reportes, (a: Reporte, b: Reporte) => a.titulo.localeCompare(b.titulo));


  const fetchReportes = async () => {
    const response = await fetch('http://localhost:8080/api/reportes');
    const data = await response.json();
    setReportes(data);
  }

  useEffect(() => {
    fetchReportes();
  }, []);

  return (
    <div className='flex items-center justify-center ' >
      {/* <Paper sx={{ width: '80%' }}> */}
      <TableContainer component={Paper} sx={{ width: '80%' }} >
        <Table>

          <TableHead>
            <TableRow>
            <TableCell>
              Id
              <SortButtons />
            </TableCell>
            <TableCell>
              Titulo
              <SortButtons />
            </TableCell>
            <TableCell>
              Estado
              <SortButtons />
            </TableCell>
            <TableCell>
              Prioridad
              <SortButtons />
            </TableCell>
            <TableCell>
              Fecha
              <SortButtons />
            </TableCell>
            <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reportes.map((reporte : Reporte) => {
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
          rowsPerPageOptions={[10, 25, 50]}
          count={reportes.length}
          rowsPerPage={10}
          page={page}
          component="div"
          onPageChange={(event, newPage) => {
            setPage(newPage);
          }}
        ></TablePagination>
      </TableContainer>
      
    </div>
  )
}

export default RegistersTable