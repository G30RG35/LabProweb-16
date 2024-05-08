import { Outlet } from 'react-router-dom'
import { Header } from '../Componentes/Header/Header'
import Footer from '../Componentes/Footer/Footer'

const MainLayout = () => {
  return (
    <>
        <Header />
          <main className='m-0'>
              <Outlet />
          </main>
        <Footer />
    </>
  )
}

export default MainLayout