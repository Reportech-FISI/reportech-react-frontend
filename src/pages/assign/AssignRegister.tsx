import React from 'react'
import Appbar from '../../components/appbar/Appbar'
import RegisterSearchBar from '../../components/registers/RegisterSearchBar'
import AssignTable from '../../components/assign/AssignTable'
import { Button } from '@mui/material'
import AssignModal from '../../components/assign/AssignModal'

const AssignRegister = () => {
  return (
    <div className='bg-white'>
      <Appbar />
      <div className='mt-5 grid grid-cols-2 gap-4'>
        <div className='bg-green-300'>
          <div className='pl-24 pt-5 mb-10'>
            <h1 className='font-semibold text-5xl mb-2'> Registros aceptados </h1>
            <p>Seleccione un registro a asignar.</p>
          </div>
          {/* <RegisterSearchBar/> */}
          <AssignTable />
        </div>

        <div className='bg-blue-300'>
          <div>
            <h1>Información</h1>
            <div>
              TODO: Datos del reporte seleccionado.
            </div>
            <div>
              <AssignModal/>
              <Button sx={{backgroundColor: 'white'}}>Asignacion manual</Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AssignRegister