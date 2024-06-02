import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from 'react';

const SortButtons = () => {
  const [isAscending, setIsAscending] = useState(true);

  const handleClick = () => {
    setIsAscending(!isAscending);
  };

  return (
    <IconButton size="small" className="p-1" onClick={handleClick}>
      {isAscending ? <ArrowUpwardIcon fontSize="inherit" /> : <ArrowDownwardIcon fontSize="inherit" />}
    </IconButton>
  );
};

export default SortButtons;