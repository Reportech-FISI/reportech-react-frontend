import './RegisterDetails.css';
export const RegisterDetails = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="profile">
          <img src="profile-placeholder.png" alt="Profile Picture" />
          <div>
            <p>Nombre1 Apellido1</p>
            <p>(Tipo de cuenta)</p>
          </div>
        </div>
        <button> ← Volver</button>
      </div>
      <h1>Detalles</h1>
      <div>
        <div className="section-title">Datos del registro:</div>
        <table>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>Título:</td>
            </tr>s
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
  );
};

