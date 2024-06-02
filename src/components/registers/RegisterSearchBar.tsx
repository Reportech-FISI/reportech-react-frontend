import { Toolbar, InputBase, Paper } from '@mui/material'
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { handleReportSearch } from '../../algorithms/handleReportSearch';

interface Reporte {
  id: number;
  titulo: string;
  estado: string;
  fechaPublicacion: string;
  prioridad: string
}

const RegisterSearchBar = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [reportesMap, setReportesMap] = useState<Map<string, Reporte>>(new Map());
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Reporte[]>([]);

  useEffect(() => {
    const fetchReportes = async () => {
      const response = await fetch('http://localhost:8080/api/reportes');
      const data: Reporte[] = await response.json();
      setReportes(data);

      const map = new Map<string, Reporte>();
      data.forEach(reporte => map.set(reporte.titulo, reporte));
      setReportesMap(map);
    };

    fetchReportes();
  }, []);

  // 2/5 Algoritmos
  const searchHandler = handleReportSearch(reportesMap, setSearchResults);

  return ( 

    <div className='p-0 flex flex-col items-center justify-end '>
      <Toolbar 
        sx={{ 
          width: '80%',
          '@media (min-width: 600px)': {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }} 
        className='justify-end mb-2 flex-col'
      >
        <div className='flex justify-end w-full'>
          <InputBase 
            placeholder='Buscar' 
            type='search'
            className='bg-white border border-slate-400 p-1 rounded outline-none focus:ring-4 focus:ring-blue-200'
            value={searchTerm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(event.target.value);
              searchHandler(event);
            }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon style={{ color: 'blue' }} />
              </InputAdornment>
            }
          />
        </div>
        
        {searchResults.length > 0 && (
          <div
            className='flex justify-end w-full mt-2'
          >
            <div className=" mb-2 w-1/2 h-36 overflow-y-auto bg-slate-100 z-10 rounded shadow">
              {searchResults.map(reporte => (
                <div
                  key={reporte.titulo}
                  className="p-2 m-1 border border-gray-800 rounded mb-2"
                  onClick={() => alert(`Reporte seleccionado: ${reporte.titulo}`)}
                >
                  {reporte.titulo}
                </div>
              ))}
            </div>
            
          </div>
        )}
      </Toolbar>
      
    </div>

  )
}

export default RegisterSearchBar