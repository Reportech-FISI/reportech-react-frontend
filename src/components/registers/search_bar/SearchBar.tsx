import React, { useEffect, useState } from "react";
import { InputAdornment, InputBase, Modal } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ModalContent } from "../../../styles/modalContent";
import { style } from "../../../styles/style";
import { handleReportSearch } from "../../../algorithms/handleReportSearch";
import { useNavigate } from "react-router-dom";

interface Reporte {
  id: number;
  titulo: string;
  estado: string;
  fechaPublicacion: string;
  prioridad: string;
}

const SearchBar = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reportesMap, setReportesMap] = useState<Map<string, Reporte>>(
    new Map(),
  );
  const [searchResults, setSearchResults] = useState<Reporte[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  // 2/5 Algoritmos
  const searchHandler = handleReportSearch(reportesMap, setSearchResults);

  useEffect(() => {
    const fetchReportes = async () => {
      const response = await fetch("http://localhost:8080/api/reportes");
      const data: Reporte[] = await response.json();
      setReportes(data);

      const map = new Map<string, Reporte>();
      data.forEach((reporte) => map.set(reporte.titulo, reporte));
      setReportesMap(map);
      console.log(map);
    };

    fetchReportes();
  }, []);

  return (
    <div>
      <InputBase
        placeholder="Buscar"
        type="search"
        className="bg-white border border-slate-400 pt-1 pb-0.5 px-2 rounded outline-none focus:ring-4 focus:ring-blue-200 flex-row height-10"
        value={searchTerm}
        onClick={handleOpen}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(event.target.value);
          searchHandler(event);
        }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon style={{ color: "blue" }} />
          </InputAdornment>
        }
      />

      <Modal open={open} onClose={handleClose}>
        <ModalContent sx={style}>
          <InputBase
            placeholder="Buscar"
            type="search"
            className="bg-white border border-slate-400 p-1 rounded outline-none focus:ring-4 focus:ring-blue-200"
            value={searchTerm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(event.target.value);
              searchHandler(event);
            }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon style={{ color: "blue" }} />
              </InputAdornment>
            }
          />
          {searchResults.length > 0 && (
            <div className=" mb-2 h-96 overflow-y-auto bg-slate-100 z-10 rounded shadow">
              {searchResults.map((reporte) => (
                <div
                  key={reporte.titulo}
                  className="p-2 m-1 border border-gray-800 rounded mb-2"
                  onClick={() => navigate(`/details/${reporte.id}`)}
                >
                  {reporte.titulo}
                </div>
              ))}
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SearchBar;
