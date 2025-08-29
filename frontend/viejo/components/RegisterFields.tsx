import './RegisterFields.css'

function RegisterFields() {
  return (
    <>
      <h2 className="titulo-registro">Registrate</h2>
      <div className="input-contenedor-is">
          <label htmlFor="email">Dirección de Correo Electrónico</label>
          <input id="email" type="email" placeholder="you@example.com"/>
      </div>

      <div className="input-contenedor-is">
          <label htmlFor="contraseña">Contraseña</label>
          <input id="contraseña" type="password" placeholder="********"/>
          <label className="label-repetir" htmlFor="contraseña">Repite tu contraseña</label>
          <input type="password" placeholder="********"/>
      </div>
      <button className="boton-registro">Registrarse</button>
    </>
    );
}

export default RegisterFields;