import { useEffect, useState } from 'react';
import { Reporte } from '../../../models/Reporte_Fila';
import ArbolBusquedaBinaria from '../../../algorithms/binarySearchTree';
import { LineChart } from "@mui/x-charts";

const RegistersLineChart = () => {
   const [reportes, setReportes] = useState<Reporte[]>([]);
   const [registersData, setRegistersData] = useState<number[]>([]);

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

      const reportesPorMes = arbol.reportesPorMes();
      setRegistersData(reportesPorMes);
   }, [reportes]);

   return (
      <LineChart
         xAxis={[{ data: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], scaleType: 'point' }]}
         series={[
            {
               data: registersData,
               color: '#3f51b5'

            }
         ]}
      />
   );
}

export default RegistersLineChart;