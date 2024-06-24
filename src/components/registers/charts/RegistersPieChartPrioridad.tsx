import { useEffect, useState } from 'react';
import { Reporte } from '../../../models/Reporte_Fila';
import ArbolBusquedaBinaria from '../../../algorithms/binarySearchTree';
import { PieChart } from "@mui/x-charts";

const RegistersPieChartPrioridad = () => {
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
      const reportesPorPrioridad = arbol.reportesPorPrioridad();
      const arr = [
         { id: 0, value: reportesPorPrioridad[0], label: 'Urgente' },
         { id: 1, value: reportesPorPrioridad[1], label: 'No urgente' },
      ];
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
export default RegistersPieChartPrioridad;