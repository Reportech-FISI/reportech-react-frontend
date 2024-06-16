import React from 'react'
import Appbar from '../../components/appbar/Appbar'
import UsersTable from '../../components/users/UsersTable'

const Users = () => {
  return (
    <div>
      <Appbar/>
      <h1 className="font-semibold text-5xl flex justify-center p-6 m-4">
        Usuarios
      </h1>
      <UsersTable/>
    </div>
  )
}

export default Users