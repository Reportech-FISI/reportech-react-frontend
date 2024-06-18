import { useState } from 'react'
import { ModalContent } from '../../styles/modalContent'
import { style } from '../../styles/style'
import { Fade, Modal } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

const UsersDeleteModal = ({userId}: {userId: number}) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchDeleteUser = async () => {
    const response = await fetch(`http://localhost:8080/api/trabajador/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al enviar los datos a /api/trabajadores');
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
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <ModalContent sx={style}>
            <h2>¿Estás seguro de que quieres eliminar a este usuario?</h2>
            <div className='flex justify-end mt-4'>
              <button 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" 
                onClick={fetchDeleteUser}
              >Confirmar</button>
              <button 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
                onClick={handleClose}
              >Cancelar</button>
            </div>
            
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  )
}

export default UsersDeleteModal