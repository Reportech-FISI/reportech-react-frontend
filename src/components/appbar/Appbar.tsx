import { Box } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
const Appbar = () => {

  const navigate = useNavigate();

  const { nombres, apellidos, rol } = useAuth();
  

  return (
    <div className='flex justify-between bg-slate-100 p-2  w-full'>
      <div className='flex items-center'>
        <Box sx={{flexGrow: 0}}>
          <AdminPanelSettingsIcon fontSize='large' color='primary'/>
        </Box>
        <div className="ml-2">
          <h3>{nombres} {apellidos}</h3>
          <h3 className="text-xs text-gray-500">{rol}</h3>
        </div>
      </div>
      <div className="flex items-center">
        <button onClick={() => navigate('/home')} className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-zinc-100">
          Atrás
        </button>
      </div>
    </div>
  );
};

export default Appbar;
