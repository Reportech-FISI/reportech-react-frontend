import 'tailwindcss/tailwind.css';

export const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-lg flex items-center space-x-12">
        <img src="./src/pages/login/fisi.webp" alt="FISI" className="w-64 h-64 object-contain"/>
        <div className="max-w-lg w-full ">
          <form action="">
            <h1 className="text-2xl font-bold mb-4 text-center">INICIAR SESIÓN</h1>
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Usuario" 
                required 
                className="w-80 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-6">
              <input 
                type="password" 
                placeholder="Contraseña" 
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
