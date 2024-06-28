import { Box } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";

const Appbar = () => {
  const navigate = useNavigate();

  const { nombres, apellidos, rol } = useAuth();

  return (
    <div className="flex justify-between bg-slate-100 p-2 w-full px-16">
      <div className="flex items-center">
        <Box sx={{ flexGrow: 0 }}>
          <AdminPanelSettingsIcon fontSize="large" color="primary" />
        </Box>
        <div className="ml-2">
          <h3>
            {nombres} {apellidos}
          </h3>
          <h3 className="text-xs text-gray-500">{rol}</h3>
        </div>
      </div>

      <div className="flex items-center">
        <ul className="flex list-none m-0 p-0">
          <li><button onClick={() => navigate("/home")} className="text-blue-500 hover:text-blue-700">Inicio</button></li>
          <li className="mx-6 text-blue-300">|</li>
          <li><button onClick={() => navigate("/registers")} className="text-blue-500 hover:text-blue-700">Registros</button></li>
          <li className="mx-6 text-blue-300">|</li>
          <li><button onClick={() => navigate("/users")} className="text-blue-500 hover:text-blue-700">Usuarios</button></li>
          <li className="mx-6 text-blue-300">|</li>
          <li><button onClick={() => navigate("/assign")} className="text-blue-500 hover:text-blue-700">Asignacion</button></li>
        </ul>
      </div>

    {/* <div className="flex items-center " id="navbar-default">
        <ul className="font-medium flex flex-col p-10 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-400 dark:border-gray-700">
          <li>
            <a onClick={() => navigate("/home")} href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
              Inicio
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/registers")} href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Registros
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/users")} href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Usuarios
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/assign")} href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Asignacion
            </a>
          </li>
        </ul>
      </div> */}

      <div className="flex items-center">
        <button
          onClick={() => navigate("/")}
          className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-zinc-100"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Appbar;
