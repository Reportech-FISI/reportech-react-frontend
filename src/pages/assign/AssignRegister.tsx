import React, { useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import AssignTable from '../../components/assign/AssignTable'
import AssignModal from '../../components/assign/AssignModal'
import AssignDetails from '../../components/assign/AssignDetails'
import ManualAssignModal from '../../components/assign/ManualAssignModal'

const AssignRegister = () => {

  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [flag, setFlag] = useState<boolean | null>(false);

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
          <AssignTable onReportClick={setSelectedReportId} flagReportClickeado={setFlag}/>
        </div>

        <div className='bg-blue-300'>
          <div>
            <h1 className='flex justify-center p-6 font-semibold text-5xl mb-2'>Información</h1>
            <div>
              <AssignDetails registerId = {selectedReportId!} flag = {flag!}/>
            </div>
            <div className=''>
              <div className='flex justify-center'>
                <AssignModal registerId = {selectedReportId!}/>
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