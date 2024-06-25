import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import PDF from "./documents/PDF"

const Test = () => {
  return (
    // <div className="m-2  border border-black">
    //   <div>
    //     <div>
    //       <div className="m-10 flex justify-between">
    //         <div className="text-base">
    //           <h3 className="font-bold">Reporte #ID</h3>
    //           <p className="text-gray-400">Fecha</p>
    //         </div>
    //         <h1 className="text-5xl font-bold">Reportech</h1>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="m-10 text-right">
    //     <h1 className="mb-1 font-bold text-lg">FISI, UNMSM</h1>
    //     <p className="text-gray-400">Av. Amezaga, Lima 5081</p>
    //     <p className="text-gray-400">Lima</p>
    //     <p className="text-gray-400">Perú</p>
    //   </div>

    //   <hr className="m-4 border-gray-200" />

    //   <div className="mx-16 my-12">
    //     <h1 className="font-bold text-2xl">Titulo</h1>
    //     <div className="mt-8 grid grid-cols-2">
    //       <div>
    //         <h1 className="font-bold text-xl">
    //           Reportante
    //         </h1>
    //         <p className="text-gray-400">XXX</p>

    //         <h1 className="mt-6 font-bold text-xl">
    //           Prioridad
    //         </h1>
    //         <p className="text-gray-400">XXX</p>

    //         <h1 className="mt-6 font-bold text-xl">
    //           Ubicación
    //         </h1>
    //         <p className="text-gray-400">XXX</p>
    //       </div>
    //       <div>
    //         <h1 className="font-bold text-xl">
    //           Tecnico asignado
    //         </h1>
    //         <p className="text-gray-400">XXX</p>

    //         <h1 className="mt-6 font-bold text-xl">
    //           Estado
    //         </h1>
    //         <p className="text-gray-400">XXX</p>
    //       </div>
    //     </div>
    //   </div>

    //   <hr className="m-4 border-gray-200" />

    //   <div className="mx-16 my-12">
    //     <h1 className="font-bold text-2xl">Equipo afectado</h1>
    //     <p className="text-gray-400"># ID</p>
    //     <div>
    //       <div className="mt-8 grid grid-cols-2">
    //         <div>
    //           <h1 className="font-bold text-xl">
    //             Nombre
    //           </h1>
    //           <p className="text-gray-400">XXX</p>
    //         </div>
    //         <div>
    //           <h1 className="font-bold text-xl">
    //             Tecnico asignado
    //           </h1>
    //           <p className="text-gray-400">XXX</p>
    //         </div>
    //       </div>

    //       <h1 className="mt-6 font-bold text-xl">
    //         Descripcion
    //       </h1>
    //       <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio recusandae dolorum deserunt, atque aliquam et neque omnis mollitia temporibus repudiandae libero rem quibusdam possimus exercitationem nulla unde quas blanditiis nobis.</p>

    //     </div>
    //   </div>

    //   <hr className="m-4 border-gray-200" />

    //   <p className="text-center my-5 text-gray-400">© Copyright. All rights reserved. Reportech, 2024.  Printed by USER.</p>
    // </div>
    <div className="h-screen">
      <PDFDownloadLink document={<PDF />} fileName="myfirstpdf.pdf">
        {({ loading, url, error, blob }) =>
          loading ? (
            <button>Loading Document ...</button>
          ) : (
            <button>Download now!</button>
          )
        }
      </PDFDownloadLink>

      <PDFViewer
        width="100%"
        height="100%"
      >
        <PDF />
      </PDFViewer>
    </div>
  )
}

export default Test