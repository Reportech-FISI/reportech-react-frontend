import adminfoto from "../../assets/adminfoto.png";
import registerIcon from "../../assets/registro.png";
import userIcon from "../../assets/usuario.png";

import "../../css/home.css"
export const Home = () => {
  return (
    <>
        <div>
            <div className="encabezado">
              <div> <img src={adminfoto} alt="adminfoto" /> </div>
              <div className="btnvolver"> <button> volver </button> </div>
            </div>

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
