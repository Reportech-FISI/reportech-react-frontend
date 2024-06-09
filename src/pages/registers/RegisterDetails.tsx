import Appbar from '../../components/appbar/Appbar';
import './RegisterDetails.css';
export const RegisterDetails = () => {
  return (
    <>
    <Appbar/>
    <div className="container">
      <h1>Detalles</h1>
      <div>
        <div className="section-title">Datos del registro:</div>
        <table>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>Título:</td>
            </tr>
            <tr>
              <td>Fecha:</td>
              <td>Estado:</td>
            </tr>
            <tr>
              <td>Prioridad:</td>
              <td>Ubicación:</td>
            </tr>
            <tr>
              <td colSpan={2}>Usuario reportador:</td>
            </tr>
            <tr>
              <td colSpan={2}>Encargado asignado:</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div className="section-title">Datos del equipo:</div>
        <table>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>Nombre:</td>
              <td rowSpan={3} className="photo">Foto:</td>
            </tr>
            <tr>
              <td colSpan={2}>Descripción del problema:</td>
            </tr>
            <tr>
              <td colSpan={2}>Estado de reparación:</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

