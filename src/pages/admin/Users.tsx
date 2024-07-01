import Appbar from '../../components/appbar/Appbar'
import UsersTable from '../../components/users/UsersTable'
import CreateUser from '../../components/users/CreateUser'

const Users = () => {
  return (
    <div className="bg-white" >
      <Appbar/>
      <h1 className="flex font-semibold text-5xl justify-center p-3 pt-5">
        Usuarios
      </h1>
        <CreateUser />
        <UsersTable/>
      </div>
  )
}

export default Users