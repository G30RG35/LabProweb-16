import { Link } from 'react-router-dom';
import styles from './Footer.module.css'

function Footer() {
  return (
    <div className={`${styles.footerBg}`}>
      <div className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-md-6">
              <h5>Navegación</h5>
              <ul className="nav flex-column">
                <li className={`nav-item mb-1`}><Link to="/" className={`nav-link p-0 text-light`}>Inicio</Link></li>
                <li className={`nav-item mb-1`}><Link to="/eventos" className={`nav-link p-0 text-light`}>Eventos</Link></li>
                <li className={`nav-item mb-1`}><Link to="/nosotros" className={`nav-link p-0 text-light`}>Nosotros</Link></li>
              </ul>
            </div>

            <div className="col-md-6 d-flex flex-column align-items-end">
              <h2 className='mb-3'>¿Donde nos encontramos?</h2>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28742.917606154933!2d-100.25222000789354!3d25.77503215191548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smx!4v1715135392057!5m2!1sen!2smx" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

          </div>
        </footer>
      </div>
    </div>
  )
}

export default Footer;
