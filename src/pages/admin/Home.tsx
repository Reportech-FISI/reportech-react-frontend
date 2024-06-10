import registerIcon from "../../assets/registro.svg";
import userIcon from "../../assets/usuario.svg";
import Appbar from "../../components/appbar/Appbar";

export const Home = () => {
  return (
    <>
      <Appbar />
      <div className="pt-16 flex justify-evenly items-center h-screen">
        <div className="flex flex-col items-center w-1/5">
          <button className="size-full">
            <img src={registerIcon} alt="registro" className="size-full" />
          </button>
          <h2 className="text-4xl"> Registros </h2>
        </div>
        <div className="flex flex-col items-center w-1/5">
          <button className="size-full">
            <img src={userIcon} alt="user" className="size-full" />
          </button>
          <h2 className="text-4xl"> Usuarios </h2>
        </div>
        <div className="flex flex-col items-center w-1/5">
          <button className="size-full">
            <img src={userIcon} alt="user" className="size-full" />
          </button>
          <h2 className="text-4xl"> Usuarios </h2>
        </div>
      </div>
    </>
  );
};
