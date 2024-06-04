import registerIcon from "../../assets/registro.svg";
import userIcon from "../../assets/usuario.svg";
import Appbar from '../../components/appbar/Appbar';

import "../../css/home.css"
export const Home = () => {
  return (
    <>
        <div>
            <Appbar/>

            <div className="menutitle">
              <h1>Menu</h1>
            </div>

            <div className="container">
              <div className="registerSection">
                <div className="registerBTN">
                  <button className="image1Button">
                    <img src={registerIcon} alt="registro" className="buttonRegistro"/>
                  </button>
                </div>
                <div className="registerTXT"> Registros </div>
              </div>
              <div className="userSection">
                <div className="userBTN">
                  <button className="image2Button">
                    <img src={userIcon} alt="user" className="buttonUsuario"/>
                  </button>
                </div>
                <div className="userTXT"> Usuarios </div>
              </div>
        </div>

        </div>
    </>
  )
};
