import Footer from "./Componentes/Footer/Footer";
import { Header } from "./Componentes/Header/Header";
import { Login } from "./Paginas/Login/Login";
import { SelectDe } from "./Componentes/Selector de/SelectDeMaterias";
import { Eventos } from "./Paginas/Eventos/Eventos";

function App() {
  return (
    <>
    <Header />
      {/* <Login /> */}
      {/* <SelectDe /> */}
      <Eventos />
      <Footer />
    </>
  );
}

export default App;
