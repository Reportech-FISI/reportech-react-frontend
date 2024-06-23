import { useState } from 'react';
import { useAuth } from '../../AuthProvider';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setId, setNombres, setApellidos, setRol } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Lógica para hacer login
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error en el login');
      }

      const { id, nombres, apellidos, rol } = await response.json();

      setId(id);
      setNombres(nombres);
      setApellidos(apellidos);
      setRol(rol);
      // Redirigir al usuario o mostrar mensaje de éxito
    } catch (error) {
      console.error('Error al hacer login:', error);
      // Manejar el error (mostrar mensaje al usuario, etc.)
    }
    navigate('/home');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-lg flex items-center space-x-12">
        <img src="./src/pages/login/fisi.webp" alt="FISI" className="w-64 h-64 object-contain"/>
        <div className="max-w-lg w-full ">
          <form onSubmit={handleLogin}>
            <h1 className="text-2xl font-bold mb-4 text-center">INICIAR SESIÓN</h1>
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Usuario" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="w-80 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-6">
              <input 
                type="password" 
                placeholder="Contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="w-80 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button 
              type="submit" 
              className="w-80 bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};
