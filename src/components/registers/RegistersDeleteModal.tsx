import React, { useState } from 'react'
import { styled, css } from '@mui/system';
import { grey } from '@mui/material/colors';
import { Fade, Modal } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

const RegistersDeleteModal = ({userId}: {userId: number}) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchDeleteRegister = async () => {
    const response = await fetch(`http://localhost:8080/api/reporte/${userId}`, {
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
                  handleClose()
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


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
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


export default RegistersDeleteModal