import { Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import SearchBar from './search_bar/SearchBar';
import RegistersModal from './RegistersModal';

const RegisterSearchBar = () => {

  const navigate = useNavigate();

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
          <RegistersModal/>
          <SearchBar/>
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
       
    </div>

  )
}

export default RegisterSearchBar