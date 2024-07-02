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
        console.log('Error en la solicitud:', response.statusText);
        return;
      }

      const data = await response.json();

      // JSON no vacío: usuario encontrado
      if (Object.keys(data).length !== 0) {

        const { id, nombres, apellidos, rol } = data;
        setId(id);
        setNombres(nombres);
        setApellidos(apellidos);
        setRol(rol);

        navigate('/home');
      } else {
        // JSON vacío: backend no devuelve nada
        console.log('Usuario no encontrado');
      }


    } catch (error) {
      console.error('Error al hacer login:', error);
    }
  }

  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(./src/pages/login/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      
      <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white/30">
        <div className="relative z-20 flex items-center justify-center min-h-screen">
          <div className="bg-white p-12 rounded-lg shadow-lg flex items-center space-x-12">
            <img src="./src/pages/login/fisi.webp" alt="FISI" className="w-64 h-64 object-contain"/>
            <div className="max-w-lg w-full">
              <form onSubmit={handleLogin}>
                <h1 className="text-2xl font-bold mb-4 text-center">INICIAR SESIÓN</h1>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Email"
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
      </div>
    </div>
  )
};
