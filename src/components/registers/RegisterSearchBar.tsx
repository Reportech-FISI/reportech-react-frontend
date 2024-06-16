import { Toolbar, InputBase, Paper, Modal } from '@mui/material'
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { handleReportSearch } from '../../algorithms/handleReportSearch';
import { useNavigate } from 'react-router-dom';
import RegistersModal from './RegistersModal';
import { styled, css } from '@mui/system';
import { grey } from '@mui/material/colors';

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
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportes = async () => {
      const response = await fetch('http://localhost:8080/api/reportes');
      const data: Reporte[] = await response.json();
      setReportes(data);

      const map = new Map<string, Reporte>();
      data.forEach(reporte => map.set(reporte.titulo, reporte));
      setReportesMap(map);
      console.log(map);
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
        
        
        <div className='flex justify-end w-full mt-2'>
          <div>
            <RegistersModal/>
          </div>

          <InputBase 
            placeholder='Buscar' 
            type='search'
            className='bg-white border border-slate-400 p-1 rounded outline-none focus:ring-4 focus:ring-blue-200'
            value={searchTerm}
            onClick={handleOpen}
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
        <div className=' flex justify-start w-full'>
          <button 
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => navigate('/registers/estadisticas')}
          >
            Ver estadisticas
          </button>
        </div>
      </Toolbar>
      
      <Modal
        open={open}
        onClose={handleClose}
      >
        <ModalContent sx={style}>
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
          {searchResults.length > 0 && (
            <div className=" mb-2 h-96 overflow-y-auto bg-slate-100 z-10 rounded shadow">
              {searchResults.map(reporte => (
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

  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
};

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

export default RegisterSearchBar