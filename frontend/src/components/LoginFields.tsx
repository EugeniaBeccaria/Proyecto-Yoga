import './LoginFields.css'

function LoginFields() {
  return (
  <>
  <div className="input-contenedor-is">
      <label htmlFor="email">Dirección de Correo Electrónico</label>
      <input id="email" type="email" placeholder="you@example.com"/>
  </div>
  <div className="input-contenedor-is">
    <label htmlFor="contraseña">Contraseña</label>
    <input id="contraseña" type="password" placeholder="********"/>
    <div className="olvidar">
      <a href="#">¿Olvidaste tu contraseña?</a>
    </div>
    <div className="recordar">
      <input type="checkbox" id="checkbox"/>
      <label htmlFor="checkbox">Recordar</label>
    </div>    
  </div>
  <button>Iniciar Sesión</button>
  </>
  );
}

export default LoginFields;