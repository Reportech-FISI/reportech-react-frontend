import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from 'react';
import { Trabajador } from '../../models/trabajador/Trabajador';


interface Reporte {
  id: number;
  titulo: string;
  estado: string;
  fechaPublicacion: string;
  prioridad: string;
  clasificacion: string;
}

interface SortButtonsProps {
  field: keyof Reporte | keyof Trabajador;
  onSort: (field: keyof Reporte | keyof Trabajador, isAscending: boolean) => void;
}

const SortButtons = ({ field, onSort }: SortButtonsProps) => {
  const [isAscending, setIsAscending] = useState(true);

  const handleClick = () => {
    setIsAscending(!isAscending);
    onSort(field, isAscending);
  };

  return (
    <IconButton size="small" className="p-1" onClick={handleClick}>
      {isAscending ? <ArrowUpwardIcon fontSize="inherit" /> : <ArrowDownwardIcon fontSize="inherit" />}
    </IconButton>
  );
};

export default SortButtons;