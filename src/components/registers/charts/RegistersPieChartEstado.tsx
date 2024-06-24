import { useEffect, useState } from 'react';
import { Reporte } from '../../../models/Reporte_Fila';
import ArbolBusquedaBinaria from '../../../algorithms/binarySearchTree';
import { PieChart } from "@mui/x-charts";

const RegistersPieChartEstado = () => {
   const [reportes, setReportes] = useState<Reporte[]>([]);
   const [pieData, setPieData] = useState<{ id: number, value: number, label: string }[]>([]);

   const fetchReportes = async () => {
      const response = await fetch('http://localhost:8080/api/reportes');
      const data: Reporte[] = await response.json();
      setReportes(data);
   };

   useEffect(() => {
      fetchReportes();
   }, []);

   useEffect(() => {
      const arbol = new ArbolBusquedaBinaria();
      reportes.forEach(reporte => {
         arbol.agregar(reporte);
      });
      const reportesPorEstado = arbol.reportesPorEstado();
      const arr = [
         { id: 0, value: reportesPorEstado[0], label: 'T. no necesario' },
         { id: 1, value: reportesPorEstado[1], label: 'T. por asginar' },
         { id: 2, value: reportesPorEstado[2], label: 'T. asignado' },
      ];
      console.log(arr);
      setPieData(arr);
   }, [reportes]);

   return(
      <PieChart
         series={[
            {
               arcLabel: (item) => `${item.value}`,
               arcLabelMinAngle: 45,
               data: pieData,
               innerRadius: 30,
               outerRadius: 200,
               paddingAngle: 3,
               cornerRadius: 5,
               highlightScope: { faded: 'global', highlighted: 'item' },
               faded: { innerRadius: 60, additionalRadius: -30, color: 'gray' },
            }
         ]}
         sx={{
            fontWeight: 'bold',
            fontSize: 30,
         }}
         tooltip={{trigger : 'none'}}
      />
   )
}
export default RegistersPieChartEstado;