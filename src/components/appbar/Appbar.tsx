import { Box } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";

const Appbar = () => {
  const navigate = useNavigate();

  const { nombres, apellidos, rol } = useAuth();

  return (
    <div className="flex justify-between bg-slate-100 p-2 w-full px-16 shadow">
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

          {rol === "ADMIN" && (
            <>
              <li className="mx-6 text-blue-300">|</li>
              <li><button onClick={() => navigate("/users")} className="text-blue-500 hover:text-blue-700">Usuarios</button></li>
            </>
          )}
          
          <li className="mx-6 text-blue-300">|</li>
          <li><button onClick={() => navigate("/assign")} className="text-blue-500 hover:text-blue-700">Asignacion</button></li>
          <li className="mx-6 text-blue-300">|</li>
          <li><button onClick={() => navigate("/registers/estadisticas")} className="text-blue-500 hover:text-blue-700">Estadisticas</button></li>
        </ul>
      </div>

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
