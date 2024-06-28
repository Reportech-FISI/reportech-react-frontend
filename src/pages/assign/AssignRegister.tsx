import React, { useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import RegisterSearchBar from '../../components/registers/RegisterSearchBar'
import AssignTable from '../../components/assign/AssignTable'
import { Button } from '@mui/material'
import AssignModal from '../../components/assign/AssignModal'
import AssignDetails from '../../components/assign/AssignDetails'
import ManualAssignModal from '../../components/assign/ManualAssignModal'

const AssignRegister = () => {

  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [flag, setFlag] = useState<boolean | null>(false);

  return (
    <div className='h-screen bg-gradient-to-b from-black to-gray-500'>
      <Appbar />
      <div className='my-5 mx-5 grid grid-cols-2 gap-4'>
        <div className='bg-yellow-300 rounded-xl pb-5'>
          <div className='pt-5 mb-10'>
            <h1 className='flex justify-center font-semibold text-5xl mb-2'> Registros aceptados </h1>
            <p className='flex justify-center'>Seleccione un registro a asignar.</p>
          </div>
          {/* <RegisterSearchBar/> */}
          <AssignTable onReportClick={setSelectedReportId} flagReportClickeado={setFlag}/>
        </div>

        <div className='bg-blue-300 rounded-xl'>
          <div>
            <h1 className='flex justify-center p-6 font-semibold text-5xl mb-2'>Información</h1>
            <div>
              <AssignDetails registerId = {selectedReportId!} flag = {flag!}/>
            </div>
            <div className=''>
              <div className='flex justify-center'>
                <AssignModal/>
              </div>
              <div className='mt-2 flex justify-center'>
                <ManualAssignModal registerId={selectedReportId!}/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AssignRegister