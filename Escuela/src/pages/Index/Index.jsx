import styles from './Index.module.css';
import Carousel from '../../Componentes/Carousel/Carousel'

const Index = () => {
  return (
    <div>
      <Carousel />

      <div className='container'>
        <div className='row'>
          <div className='col p-5'>
            <div>
              <h2>Lorem Ipsum</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores corporis consequuntur modi tempore sed nisi, provident veritatis deleniti omnis soluta aliquam itaque incidunt laboriosam reiciendis inventore facilis possimus! Nostrum, ducimus?</p>
            </div>
          </div>

          <div className='col'>

          </div>
        </div>
      </div>

      <div className={`${styles.infoBg}`}>
        <div className={`${styles.bgBlur}`}>
          <div className={`container ${styles.infoBgText}`}>
            <h2>Lorem ipsum</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, dolore deleniti. Labore harum, perferendis at dicta voluptates quisquam? Excepturi itaque cum ducimus sed aperiam id! Tenetur maxime distinctio aperiam ad?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quo at odio voluptate, ipsum sed blanditiis nesciunt dicta ipsam cumque. Molestias nostrum ipsa ullam repellat numquam dicta tempore dolorem ex.</p>
          </div> 
        </div>
        
      </div>
    </div>
  )
}

export default Index