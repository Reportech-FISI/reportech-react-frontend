import { createContext, useContext, useState } from 'react';

//  tipo de datos que se mantendran en el context
interface AuthContextType {
  id: number;
  nombres: string; 
  apellidos: string; 
  rol: string; 
  setId: (id: number) => void;
  setNombres: (nombres: string) => void; 
  setApellidos: (apellidos: string) => void; 
  setRol: (rol: string) => void; 
}
  
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente proveedor que envuelve la app
export const AuthProvider = ({ children }) => {
  // const [id, setId] = useState(0);
  // const [nombres, setNombres] = useState(''); 
  // const [apellidos, setApellidos] = useState(''); 
  // const [rol, setRol] = useState(''); 

  // return (
  //   <AuthContext.Provider value={{ 
  //     id, setId,
  //     nombres, setNombres, 
  //     apellidos, setApellidos, 
  //     rol, setRol 
  //   }}>
  //     {children}
  //   </AuthContext.Provider>
  // );

  const [id, setIdState] = useState<number>(parseInt(localStorage.getItem('id') || '0'));
  const [nombres, setNombresState] = useState<string>(localStorage.getItem('nombres') || '');
  const [apellidos, setApellidosState] = useState<string>(localStorage.getItem('apellidos') || '');
  const [rol, setRolState] = useState<string>(localStorage.getItem('rol') || '');

  // Funciones para actualizar estado y localStorage
  const setId = (newId: number) => {
    setIdState(newId);
    localStorage.setItem('id', newId.toString());
  };

  const setNombres = (newNombres: string) => {
    setNombresState(newNombres);
    localStorage.setItem('nombres', newNombres);
  };

  const setApellidos = (newApellidos: string) => {
    setApellidosState(newApellidos);
    localStorage.setItem('apellidos', newApellidos);
  };

  const setRol = (newRol: string) => {
    setRolState(newRol);
    localStorage.setItem('rol', newRol);
  };

  return (
    <AuthContext.Provider value={{ 
      id, setId,
      nombres, setNombres,
      apellidos, setApellidos,
      rol, setRol,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  //console.log("useAuth: ", context);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};