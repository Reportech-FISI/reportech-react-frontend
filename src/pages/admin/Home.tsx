import { useNavigate } from "react-router-dom";
import registerIcon from "../../assets/registro.svg";
import userIcon from "../../assets/usuario.svg";
import Appbar from "../../components/appbar/Appbar";
import { useAuth } from "../../AuthProvider";

export const Home = () => {

  const {rol} = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Appbar />
      <div className="pt-16 flex justify-evenly items-center h-screen">
        <div className="flex flex-col items-center w-1/5">
          <button className="size-full" onClick={ () => navigate(`/registers`) }>
            <img src={registerIcon} alt="registro" className="size-full" />
          </button>
          <h2 className="text-4xl"> Registros </h2>
        </div>
        {rol === 'ADMIN' && (
          <div className="flex flex-col items-center w-1/5">
            <button className="size-full" onClick={ () => navigate('/users')}>
              <img src={userIcon} alt="usuario" className="size-full" />
            </button>
            <h2 className="text-4xl"> Usuarios </h2>
          </div>
        )}
        {/* <div className="flex flex-col items-center w-1/5">
          <button className="size-full" onClick={ () => navigate('/users')}>
            <img src={userIcon} alt="user" className="size-full" />
          </button>
          <h2 className="text-4xl"> Usuarios </h2>
        </div> */}

        <div className="flex flex-col items-center w-1/5">
          <button className="size-full" onClick={ () =>  navigate('/assign')}>
            <img src={userIcon} alt="user" className="size-full" />
          </button>
          <h2 className="text-4xl"> Asignación </h2>
        </div>
      </div>
    </>
  );
};
