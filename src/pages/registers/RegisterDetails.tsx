import Appbar from '../../components/appbar/Appbar';
export const RegisterDetails = () => {
  return (
    <>
    <Appbar/>
    <div className="container mx-auto my-5 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-5">Detalles</h1>
      <div>
        <div className="text-lg font-semibold mb-2">Datos del registro:</div>
        <table className="w-full border-collapse table-auto">
          <tbody>
            <tr>
              <td className="border p-2">ID:</td>
              <td className="border p-2">Título:</td>
            </tr>
            <tr>
              <td className="border p-2">Fecha:</td>
              <td className="border p-2">Estado:</td>
            </tr>
            <tr>
              <td className="border p-2">Prioridad:</td>
              <td className="border p-2">Ubicación:</td>
            </tr>
            <tr>
              <td className="border p-2" colSpan={2}>Usuario reportador:</td>
            </tr>
            <tr>
              <td className="border p-2" colSpan={2}>Encargado asignado:</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div className="text-lg font-semibold mt-5 mb-2">Datos del equipo:</div>
        <table className="w-full border-collapse table-auto">
          <tbody>
            <tr>
              <td className="border p-2">ID:</td>
              <td className="border p-2 w-2/4 whitespace-normal break-words">Nombre:</td>
              <td className="border p-2 align-text-top" rowSpan={3}>Foto:</td>
            </tr>
            <tr>
              <td className="border p-2 w-3/4 whitespace-normal break-words" colSpan={2}>Descripción del problema: </td>
            </tr>
            <tr>
              <td className="border p-2" colSpan={2}>Estado de reparación:</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

