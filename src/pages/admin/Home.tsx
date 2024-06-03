import adminfoto from "../../assets/adminfoto.png";
import "../../css/home.css"
export const Home = () => {
  return (
    <>
        <div>
            <div className="encabezado">
              <div> <img src={adminfoto} alt="adminfoto" /> </div>
              <div className="btnvolver"> <button> volver </button> </div>
            </div>

            <div className="menu">
              <h1>Menu</h1>
            </div>

            <div></div>

        </div>
    </>
  )
};
