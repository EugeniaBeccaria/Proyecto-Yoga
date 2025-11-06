import '../styles/Footer.css';

function Footer() {
    return (
    <footer className="footer">
        
        <div className="footer-top">
            <img src="/public/LogoBlanco.png" alt="Shanti Yoga Logo" className="footer-logo"/>
            <h3 className="footer-title">Shanti Yoga</h3>
            {/*<p className="footer-subtitle">Respirá, conectá, equilibrá tu energía</p>*/}
        </div>
        
        <div className="footer-bottom-sections">
            <div className="footer-section">
                <h4>Contacto</h4>
                <ul>
                    <li>
                        <img src="/telefonoTransparente.png" className="footer-icon" />
                        <span>+54 3464 693288</span>
                    </li>
                    <li>
                        <img src="/emailTransparente.png" className="footer-icon" />
                        <span>betianasebben@gmail.com</span>
                    </li>
                    <li>
                        <img src="/locacionTransparente.png" className="footer-icon" />
                        <span>Rosario, Santa Fe, Argentina</span>
                    </li>
                </ul>
            </div>

            <div className="footer-section">
                <h4>Navegación</h4>
                <ul>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/nosotros">Sobre Nosotros</a></li>
                    <li><a href="/class">Clases</a></li>
                    <li><a href="/talleres">Talleres</a></li>
                    
                </ul>
            </div>

            <div className="footer-section">
                <h4>Seguinos</h4>
                <div className="footer-socials">
                    <a href="#"> <img src="/instagramIcon.png" alt="Instagram" className="footer-icon"/></a>
                    <a href="#"> <img src="/facebookIcon.png" alt="Facebook" className="footer-icon"/></a>
                    <a href="#"><img src="/whatsappIcon.png" alt="Whatsapp" className="footer-icon"/></a>
                </div>
            </div>
        </div>

        <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Alumnos UTN - Shanti Yoga</p>
        </div>
    </footer>
    );
}

export default Footer;