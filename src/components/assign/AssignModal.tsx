import React, { useState } from 'react'
import { Modal as BaseModal } from '@mui/base/Modal';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Button, Fade, Modal } from '@mui/material';
import { grey } from '@mui/material/colors';
import UserAssignedCard from './UserAssignedCard';



const AssignModal = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showContent, setShowContent] = useState(false);
  const [userAssigned, setUserAssigned] = useState(String);

  const userFetched = [ // Relacionarlo a la API que utilizará el algoritmo
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'juan@unmsm.edu.pe',
      cargo: ['REPARACION_COMPUTADORAS', 'MANTENIMIENTO_SERVIDORES'],
      tiempoExperiencia: 5,
    },
    {
      id: 2,
      nombre: 'Luis',
      apellido: 'Gonzales',
      email: '',
      cargo: ['REPARACION_COMPUTADORAS', 'MANTENIMIENTO_SERVIDORES'],
      tiempoExperiencia: 3,
    },
    {
      id: 3,
      nombre: 'Pedro',
      apellido: 'Torres',
      email: '',
      cargo: ['REPARACION_COMPUTADORAS', 'MANTENIMIENTO_SERVIDORES'],
      tiempoExperiencia: 2,
    },
  ]

  return (
    <div>
      <Button sx={{backgroundColor: 'white'}} onClick={handleOpen}>Autoasignación</Button>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <ModalContent sx={style} >
            <h1 className="modal-title flex justify-center">Autoasignacion</h1>
            <h2>Seleccione uno de los resultados</h2>
            <div className='grid grid-cols-3 gap-4'>
              {
                userFetched.map((user, index) => {
                return (
                  <div
                    key={index}
                    className='bg-cyan-200 flex justify-center p-2' 
                    onClick={
                      () => {setShowContent(true); setUserAssigned(user.nombre)}
                    }>
                    <UserAssignedCard 
                      nombres={user.nombre}
                      apellidos={user.apellido}
                      correo={user.email}
                      cargos={user.cargo}
                      tiempoExperiencia={user.tiempoExperiencia}
                    />
                  </div>
                )
              })}

              
            </div>
            {
              showContent && (
              <div>
                <h1>Desea asignar a {userAssigned} al registro ### ?</h1>
                <Button>Asignar</Button>
                <Button onClick={() => {
                  setShowContent(false);
                  handleClose();
                }}>Cancelar</Button>
              </div>
            )}
            
          </ModalContent>
        </Fade>
      </Modal>
    </div>

  )
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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
};

export default AssignModal