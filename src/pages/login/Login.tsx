import './Login.css';

export const Login = () => {
  return (
    <div className='login'>
      <img src="./src/pages/login/fisi.webp" alt="FISI" />
      <div className='card'>
        <form action = "">
            <h1>INICIAR SESION</h1>
            <div className='input-box'>
                <input type="text" placeholder='Usuario' required/>
            </div>
            <div className='input-box'>
                <input type="password" placeholder='Contraseña' required/>
            </div>
            <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  )
};
