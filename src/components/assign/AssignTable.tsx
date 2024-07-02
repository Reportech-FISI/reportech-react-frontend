import React, { useEffect, useMemo, useState } from 'react'
import { TableBody, TableCell, TableHead, TableRow, Paper, TablePagination, TableContainer } from '@mui/material'
import Table from '@mui/material/Table';
import quickSort from '../../algorithms/quickSort';
import SortButtons from '../sortButtons/SortButtons';
import { Reporte } from '../../models/Reporte_Fila';
import { styled } from '@mui/material/styles';

type AssignTableProps = {
  onReportClick: (reportId: number) => void;
  flagReportClickeado: (flag: boolean) => void;
};

const TitleTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: '  #f7c56e ',
  color: theme.palette.getContrastText(theme.palette.primary.dark),
}));

const AssignTable: React.FC<AssignTableProps> = ({onReportClick, flagReportClickeado}) => {

  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState('asc'); // Ascendente por defecto
  const [sortField, setSortField] = useState<keyof Reporte>('titulo'); // Por defecto se ordena por fecha de publicación
  
  const toggleSort = (field: keyof Reporte, isAscending: boolean) => {
    const direction: "asc" | "desc" | undefined = isAscending ? "asc" : "desc";
    setSortDirection(direction);
    setSortField(field);
  };
  
  const fetchReportes = async () => {
    const response = await fetch('http://localhost:8080/api/assign/reportes');
    const data: Reporte[] = await response.json();
    setReportes(data);
  };

  useEffect(() => {
    fetchReportes();
  }, []);

  const sortedReportes = useMemo(() => {
    return quickSort([...reportes], sortField, sortDirection);
  }, [reportes, sortField, sortDirection]);


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };  
  
  return (
    <div className='flex items-center justify-center ' >
      <TableContainer component={Paper} sx={{ width: '80%' }} >
        <Table>
          <TableHead>
            <TableRow>
              <TitleTableCell>
                Id
                <SortButtons field="id" onSort={toggleSort} />
              </TitleTableCell>
              <TitleTableCell>
                Titulo
                <SortButtons field="titulo" onSort={toggleSort} />
              </TitleTableCell>
              <TitleTableCell>
                Clasificacion
                <SortButtons field="clasificacion" onSort={toggleSort} />
              </TitleTableCell>
              <TitleTableCell>
                Fecha de Publicación
                <SortButtons field="fechaPublicacion" onSort={toggleSort} />
              </TitleTableCell>
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
                  onClick={() => {
                    //alert(`Reporte seleccionado: ${reporte.titulo}`);
                    onReportClick(reporte.id);
                    flagReportClickeado(true);
                    sessionStorage.setItem("registertoassign", reporte.titulo);
                  }}>
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