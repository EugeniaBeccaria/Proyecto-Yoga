import '../styles/Footer.css';

function Footer() {
    return (
    <>
    <footer>
        <div className="contenedor-footer">
            <div className="content-footer">
                <h4><img src="/telefonoTransparente.png" alt="" className="icono-footer"/>Teléfono</h4>
                <p>3464693288</p>
            </div>
            <div className="content-footer">
                <h4><img src="/emailTransparente.png" alt="" className="icono-footer"/>Email</h4>
                <p>betisebb@gmail.com</p>
            </div>
            <div className="content-footer">
                <h4><img src="/locacionTransparente.png" alt="" className="icono-footer"/>Location</h4>
                <p>Rosario, Santa Fe, Argentina</p>
            </div>
            <div className="footer-copyright">
                <h2 className="titulo-final">&copy; AlumnosUTN</h2>
            </div>
        </div>
    </footer>
    </>
    )
}
export default Footer;