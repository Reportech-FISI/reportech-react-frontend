import { useState } from 'react'
import { ModalContent } from '../../styles/modalContent'
import { style } from '../../styles/style'
import { Fade, Modal } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const RegistersDeleteModal = ({reporteId}: {reporteId: number}) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const fetchDeleteRegister = async () => {
    const response = await fetch(`http://localhost:8080/api/reporte/${reporteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al enviar los datos a /api/reporte');
    }

    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <button onClick={handleOpen}>
        <DeleteIcon color='error' />
      </button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <ModalContent sx={style}>
            <h2>Seguro que desea eliminar el registro?</h2>
            <div className='flex justify-end mt-4'>
              <button 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" 
                onClick={() => {
                  fetchDeleteRegister();
                  navigate('/registers');
                  location.reload()
                }}
              >
                Si
              </button>
              <button 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
                type="button" 
                onClick={handleClose}
              >
                No
              </button>
            </div>
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  )
}


export default RegistersDeleteModal