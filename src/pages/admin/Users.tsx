import Appbar from '../../components/appbar/Appbar'
import UsersTable from '../../components/users/UsersTable'
import CreateUser from '../../components/users/CreateUser'

const Users = () => {
  return (
    <div>
      <Appbar/>
      <h1 className="font-semibold text-5xl flex justify-center p-6 m-4">
        Usuarios
      </h1>
      <div className='flex justify-center'>
        <div className='flex flex-col w-2/3'>
          <CreateUser />
          <UsersTable/>
        </div>
      </div>
    </div>
  )
}

export default Users