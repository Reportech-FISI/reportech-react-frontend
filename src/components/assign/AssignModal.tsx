import { useEffect, useState } from 'react'
import { styled, css } from '@mui/system';
import { Button, Fade, Modal } from '@mui/material';
import { grey } from '@mui/material/colors';
import UserAssignedCard from './UserAssignedCard';
import { Trabajador } from '../../models/trabajador/Trabajador';



const AssignModal = ({registerId}: {registerId: number}) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showContent, setShowContent] = useState(false);
  const [userAssigned, setUserAssigned] = useState(String);

  const [userFetched, setUserFetched] = useState([]);

  useEffect(() => {
    if (open) {
      fetch(`http://localhost:8080/api/autoassign/${registerId}`)
        .then(res => res.json())
        //.then(data => setUserFetched(data));
        .then(data => {
          // Asegurarse de que data no sea nulo antes de asignarlo a userFetched
          if (data) {
            setUserFetched(data);
          } else {
            setUserFetched([]); // Asignar un arreglo vacío si data es nulo
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setUserFetched([]); // Asignar un arreglo vacío en caso de error
        });
      console.log(userFetched);
    }
  }, [open, registerId])

  const registerTitle = sessionStorage.getItem("registertoassign");

  const [trabajadorId, setTrabajadorId] = useState(0);

  const handleSetUserDesignado = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const data = {
      userAssigned
      // estado
    }

    const response = await fetch(`http://localhost:8080/api/reporte/${registerId}/${trabajadorId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Error al enviar los datos a /api/reporte/registerId/trabajadorId');
    }

    console.log(response.json())

    setTimeout(() => {console.log("Enviando...")}, 1000)
    location.reload();
  }


  return (
    <div>
      <Button sx={{backgroundColor: 'white', padding: 1.5, borderRadius: 2}} onClick={handleOpen}>
        Autoasignación
      </Button>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <ModalContent sx={style} >
            <h1 className="modal-title flex justify-center font-bold text-3xl my-3">Autoasignación</h1>
            <h2 className='text-center mb-4'>Seleccione uno de los resultados obtenidos del algoritmo</h2>
            <div className='grid grid-cols-3 gap-4'>
              { 
                userFetched.map((user: Trabajador) => {
                return (
                  <div 
                    key={user.id}
                    className='bg-cyan-200 flex justify-center p-2' 
                    onClick={
                      () => {
                        setShowContent(true); 
                        setUserAssigned(user.nombres);
                        setTrabajadorId(user.id!);
                      }
                    }>
                    <UserAssignedCard 
                      nombres={user.nombres}
                      apellidos={user.apellidos}
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
              <div className=''>
                <h1 className='text-center text-lg my-2'>Desea asignar a {userAssigned} a {registerTitle} ?</h1>
                <div className='flex justify-center'>
                  <Button
                    onClick={ handleSetUserDesignado }
                  >
                    Asignar
                  </Button>
                  <Button onClick={() => {
                    setShowContent(false);
                    handleClose();
                  }}>Cancelar</Button>
                </div>

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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
};

export default AssignModal