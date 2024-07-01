import React, { useEffect, useMemo, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableContainer,
  makeStyles,
} from "@mui/material";
import Table from "@mui/material/Table";
import quickSort from "../../algorithms/quickSort";
import SortButtons from "../sortButtons/SortButtons";
import { Reporte } from "../../models/Reporte_Fila";
import { useNavigate } from "react-router-dom";
import RegistersDeleteModal from "./RegistersDeleteModal";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
      borderRadius: 15,
      margin: '10px 10px',
      maxWidth: 950
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
}));

const RegistersTable = () => {

  const classes = useStyles();

  const navigate = useNavigate();

  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState("asc"); // Ascendente por defecto
  const [sortField, setSortField] = useState<keyof Reporte>("fechaPublicacion"); // Por defecto se ordena por fecha de publicación

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
      <TableContainer component={Paper} sx={{ width: "90%" }}>
        <Table>
          <TableHead>
            <TableRow sx={{}}>
              <TableCell sx={{ width: "10%", textAlign: "center" }} className={classes.tableHeaderCell}>
                Id
                <SortButtons field="id" onSort={toggleSort} />
              </TableCell>
              <TableCell sx={{ width: "20%", textAlign: "center" }}>
                Titulo
                <SortButtons field="titulo" onSort={toggleSort} />
              </TableCell>
              <TableCell sx={{ width: "20%", textAlign: "center" }}>
                Estado
                <SortButtons field="estado" onSort={toggleSort} />
              </TableCell>
              <TableCell sx={{ width: "20%", textAlign: "center" }}>
                Prioridad
                <SortButtons field="prioridad" onSort={toggleSort} />
              </TableCell>
              <TableCell sx={{ width: "20%", textAlign: "center" }}>
                Fecha de Publicación
                <SortButtons field="fechaPublicacion" onSort={toggleSort} />
              </TableCell>
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
                      {reporte.estado}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center" }}
                      onClick={() => navigate(`/details/${reporte.id}`)}
                    >
                      {reporte.prioridad}
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
      </TableContainer>
    </div>
  );
};

export default RegistersTable;
