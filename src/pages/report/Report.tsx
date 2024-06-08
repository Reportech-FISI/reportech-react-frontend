import './Report.css';

export const Report = () => {
    return(
       <div className="Report">
            <h1>Reporte</h1>
            <div className='cardA'>
                <div className='filaA'>
                    <div className="Registro">
                        <form action = "">
                            <h2>Datos del registro</h2>
                            <input type="text" placeholder='Titulo' required/>
                            <input type="text" placeholder='Prioridad' required/>
                            <input type="text" placeholder='Ubicacion' required/>
                            <input type="text" placeholder='Estado' required/>
                            <input type="text" placeholder='Personal asignado' required/>
                        </form>
                    </div>
                    <div className="Equipo">
                        <form action = "">
                            <h2>Datos del equipo</h2>
                            <input type="text" placeholder='Nombre/ID del equipo' required/>
                            <input type="text" placeholder='Descripcion' required/>
                            <input type="text" placeholder='Estado de reparación' required/>
                        </form>
                    </div>
                </div>
                <div className="Imagen">
                    <h2>Foto</h2>
                </div> 
            </div>
            <div className='filaB'>
                <div className='cancelar'>
                    <button type="submit">Cancelar</button>
                </div>
                <div className='guardar'>
                    <button type="submit">Guardar</button>
                </div>
            </div>
            
       </div> 
    )
};