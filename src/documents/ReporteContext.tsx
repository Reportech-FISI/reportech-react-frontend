import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Registro } from '../models/registro/Registro';
import { Equipo } from '../models/equipo/Equipo';

interface ReporteContextType {
  reporteC: Registro;
  equipoC: Equipo;
  setReporteC: (reporteC: Registro) => void;
  setEquipoC: (equipoC: Equipo) => void;
}

const ReporteContext = createContext<ReporteContextType | undefined>(undefined);

export const ReporteProvider= ({ children }) => {
  // const [reporteC, setReporteC] = useState<Registro>({
  //   id: 0,
  //   userReporterNombre: '',
  //   titulo: '',
  //   estado: '',
  //   fechaPublicacion: '',
  //   prioridad: '',
  //   userDesignado: null,
  //   clasificacion: '',
  //   ubicacion: '',
  //   equipo: { id: 0 },
  //   trabajador: { id: 0 }
  // });

  // const [equipoC, setEquipoC] = useState<Equipo>({
  //   id: 0,
  //   estadoReparacion: '',
  //   descripcion: '',
  //   foto: { id: 0 },
  //   nombre: ''
  // });

  const [reporteC, setReporteC] = useState(() => {
    const savedReporteC = localStorage.getItem('reporteC');
    return savedReporteC ? JSON.parse(savedReporteC) : {
      id: 0,
      userReporterNombre: '',
      titulo: '',
      estado: '',
      fechaPublicacion: '',
      prioridad: '',
      userDesignado: null,
      clasificacion: '',
      ubicacion: '',
      equipo: { id: 0 },
      trabajador: { id: 0 }
    };
  });

  const [equipoC, setEquipoC] = useState(() => {
    const savedEquipoC = localStorage.getItem('equipoC');
    return savedEquipoC ? JSON.parse(savedEquipoC) : {
      id: 0,
      estadoReparacion: '',
      descripcion: '',
      foto: { id: 0 },
      nombre: ''
    };
  });

  useEffect(() => {
    localStorage.setItem('reporteC', JSON.stringify(reporteC));
  }, [reporteC]);

  useEffect(() => {
    localStorage.setItem('equipoC', JSON.stringify(equipoC));
  }, [equipoC]);  

  return (
    <ReporteContext.Provider value={{ 
      reporteC, setReporteC,
      equipoC, setEquipoC 
    }}>
      {children}
    </ReporteContext.Provider>
  );
};

export const useReporte = () => {
  const context = useContext(ReporteContext);
  console.log("useReporte context:", context); 
  if (context === undefined) {
    throw new Error('useReporte must be used within a ReporteProvider');
  }
  return context;
};