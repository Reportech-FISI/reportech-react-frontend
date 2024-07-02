import { useNavigate } from "react-router-dom";
import registerIcon from "../../assets/registro.svg";
import userIcon from "../../assets/usuario.svg";
import Appbar from "../../components/appbar/Appbar";
import { useAuth } from "../../AuthProvider";
import escudoSM from "../../assets/escudoUNMSM.png";

export const Home = () => {

  const { rol } = useAuth();
  const navigate = useNavigate();
  

  return (
    <>
      <Appbar />
      <div className="pt-8 flex flex-col justify-evenly items-center h-screen">
      <h1 className='text-9xl font-bold italic text-gray-800 relative'>
        <span className='relative z-10 animate-pulse'>REPORTECH</span>
        <span className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-400 blur-md animate-pulse opacity-75'></span>
      </h1>
        <div className="flex justify-evenly items-center h-screen">

        <div className="flex flex-col items-center w-1/2 -mt-8 p-8">
          <button className="size-full" onClick={() => navigate(`/registers`)}>
            <img src={registerIcon} alt="registro" className="size-full" />
          </button>
          <h2 className="text-4xl"> Registros </h2>
          <p className="text-sm text-center mt-2">Este botón sirve para acceder a los registros</p>
        </div>

        {rol === 'ADMIN' && (
          <div className="flex flex-col items-center w-1/2 -mt-8 p-8">
            <button className="size-full" onClick={ () => navigate('/users')}>
              <img src={userIcon} alt="user" className="size-full" />
            </button>
            <h2 className="text-4xl"> Usuarios </h2>
            <p className="text-sm text-center mt-2">Este botón sirve para ver la lista de usuarios</p>
          </div> 
        )}

        <div className="flex flex-col items-center w-1/2 -mt-8 p-8">
          <button className="size-full" onClick={() => navigate('/assign')}>
            <img src={userIcon} alt="user" className="size-full" />
          </button>
          <h2 className="text-4xl"> Asignación </h2>
          <p className="text-sm text-center mt-2">Este botón sirve para realizar asignaciones</p>
        </div>
        </div>
      </div>

      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-center mb-4">
                <img src={escudoSM} alt="Escudo UNMSM" width="64" height="78" />
              </div>
              <div className="mx-auto">
              <h1 className="text-xl font-bold text-center ">Universidad Nacional Mayor de San Marcos</h1>
              <h3 className="text-lg font-bold text-center">Facultad de Ingeniería de Sistemas e Informática</h3>
              </div>
              <hr className="my-4 border-gray-600" />
              <p className="text-sm grid justify-items-stretch justify-self-center">
                <span className="block text-center">Calle Germán Amézaga s/n - Lima</span>
                <span className="block text-center">Teléfono: 619 - 7000 anexo xxxx</span>
                <a href="https://sistemas.unmsm.edu.pe " target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 text-center">https://sistemas.unmsm.edu.pe</a>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold flex justify-center md:justify-center mb-4">Conferencias</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.acm.org/conferences" className="hover:text-gray-300" aria-label="ACM Upcoming Conferences">ACM Upcoming Conferences</a>
                </li>
                <li>
                  <a href="https://waset.org/computer-science-conferences" className="hover:text-gray-300" aria-label="Computer Science Conferences WASET.ORG">Computer Science Conferences WASET.ORG</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-center">Enlaces de interés</h3>
              <ul className="space-y-2">
                <li><a href="https://unmsm.edu.pe" className="hover:text-gray-300">Página Web de la UNMSM</a></li>
                <li><a href="https://sisbib.unmsm.edu.pe" className="hover:text-gray-300">Biblioteca Central de la UNMSM</a></li>
                <li><a href="https://ogbu.unmsm.edu.pe" className="hover:text-gray-300">Oficina General de Bienestar Universitario</a></li>
                <li><a href="http://sum.unmsm.edu.pe" className="hover:text-gray-300 ">Sistema Único de Matrícula</a></li>
                <li><a href="https://vrip.unmsm.edu.pe" className="hover:text-gray-300">Vicerrectorado de Investigación</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-center">Transparencia</h3>
              <ul className="space-y-2">
                <li><a href="https://sistemas.unmsm.edu.pe/site/rd" className="hover:text-gray-300">Actas de Consejo de Facultad</a></li>
                <li><a href="https://sistemas.unmsm.edu.pe/site/resoluciones-decanales" className="hover:text-gray-300">Resoluciones Decanales</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
