import { Link } from 'react-router-dom';
import styles from './Footer.module.css'

function Footer() {
  return (
    <div className={`${styles.footerBg}`}>
      <div className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-6 col-md-2 mb-3">
              <h5>Navegación</h5>
              <ul className="nav flex-column">
                <li className={`nav-item mb-1`}><Link to="/" className={`nav-link p-0 text-light`}>Inicio</Link></li>
                <li className={`nav-item mb-1`}><Link to="/eventos" className={`nav-link p-0 text-light`}>Eventos</Link></li>
                <li className={`nav-item mb-1`}><Link to="/nosotros" className={`nav-link p-0 text-light`}>Nosotros</Link></li>
              </ul>
            </div>

            {/* ... Rest of the code with "className" instead of "class" ... */}

          </div>
        </footer>
      </div>
    </div>
  )
}

export default Footer;
