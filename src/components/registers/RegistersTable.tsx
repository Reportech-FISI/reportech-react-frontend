import React, { useEffect, useMemo, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer,
  Typography
} from "@mui/material";
import Table from "@mui/material/Table";
import quickSort from "../../algorithms/quickSort";
import SortButtons from "../sortButtons/SortButtons";
import { Reporte } from "../../models/Reporte_Fila";
import { useNavigate } from "react-router-dom";
import RegistersDeleteModal from "./RegistersDeleteModal";
import { styled } from '@mui/material/styles';


const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 15,
  margin: '10px 10px',
}));

const TitleTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: ' #446aea ',
  color: theme.palette.getContrastText(theme.palette.primary.dark),
}));

const StatusTypography = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '0.75rem',
  color: 'white',
  backgroundColor: 'grey',
  borderRadius: 8,
  padding: '3px 10px',
  display: 'inline-block'
}));

const RegistersTable = () => {

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortField, setSortField] = useState<keyof Reporte>("fechaPublicacion"); 

  const toggleSort = (field: keyof Reporte, isAscending: boolean) => {
    const direction: "asc" | "desc" | undefined = isAscending ? "asc" : "desc";
    setSortDirection(direction);
    setSortField(field);
  };

  const fetchReportes = async () => {
    const response = await fetch("http://localhost:8080/api/reportes");
    const data: Reporte[] = await response.json();
    setReportes(data);
  };

  useEffect(() => {
    fetchReportes();
  }, []);

  // 1/5 Algoritmos.
  const sortedReportes = useMemo(() => {
    return quickSort([...reportes], sortField, sortDirection);
  }, [reportes, sortField, sortDirection]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  return (
    <div className="flex items-center justify-center ">
      <StyledTableContainer  sx={{ width: "90%" }}>
        <Table>
          <TableHead>
            <TableRow sx={{}}>
              <TitleTableCell  sx={{ width: "10%", textAlign: "center" }} >
                Id
                <SortButtons field="id" onSort={toggleSort} />
              </TitleTableCell >
              <TitleTableCell sx={{ width: "20%", textAlign: "center" }}>
                Titulo
                <SortButtons field="titulo" onSort={toggleSort} />
              </TitleTableCell>
              <TitleTableCell sx={{ width: "20%", textAlign: "center" }}>
                Estado
                <SortButtons field="estado" onSort={toggleSort} />
              </TitleTableCell>
              <TitleTableCell sx={{ width: "20%", textAlign: "center" }}>
                Prioridad
                <SortButtons field="prioridad" onSort={toggleSort} />
              </TitleTableCell>
              <TitleTableCell sx={{ width: "20%", textAlign: "center" }}>
                Fecha de Publicación
                <SortButtons field="fechaPublicacion" onSort={toggleSort} />
              </TitleTableCell>
              <TitleTableCell></TitleTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedReportes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((reporte: Reporte) => {
                const fecha = new Date(reporte.fechaPublicacion);
                const fechaFormateada = `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;

                return (
                  <TableRow key={reporte.id}>
                    <TableCell
                      sx={{ textAlign: "center" }}
                      onClick={() => navigate(`/details/${reporte.id}`)}
                    >
                      {reporte.id}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center" }}
                      onClick={() => navigate(`/details/${reporte.id}`)}
                    >
                      {reporte.titulo}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center" }}
                      onClick={() => navigate(`/details/${reporte.id}`)}
                    >
                      <StatusTypography
                        style={{
                          backgroundColor: 
                          ((reporte.estado === "TECNICO_ASIGNADO" && '  #1966f6 ') ||
                          (reporte.estado === "TECNICO_POR_ASIGNAR" && '  #eca01a ') ||
                          (reporte.estado === "TECNICO_NO_NECESARIO" && ' #b5ada1 ')) ||
                          undefined
                        }}
                      >
                        {reporte.estado}
                      </StatusTypography>
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center" }}
                      onClick={() => navigate(`/details/${reporte.id}`)}
                    >
                      <Typography
                        style={{
                          color: 
                          ((reporte.prioridad === "URGENTE" && 'red') ||
                          (reporte.prioridad === "NO_URGENTE" && ' #198ef6 ')) ||
                          undefined
                        }}
                      >
                        {reporte.prioridad}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center" }}
                      onClick={() => navigate(`/details/${reporte.id}`)}
                    >
                      {fechaFormateada}
                    </TableCell>
                    <TableCell>
                      <RegistersDeleteModal reporteId={reporte.id} />
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
      </StyledTableContainer>
    </div>
  );
};

export default RegistersTable;
