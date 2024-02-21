import Footer from "./Componentes/Footer/Footer";
import { Header } from "./Componentes/Header/Header";
import { Login } from "./Componentes/Login/Login";
import { SelectDeMaterias } from "./Paginas/Selector-de-Materias/SelectDeMaterias";

function App() {
  return (
    <>
    <Header />
      {/* <Login /> */}
      <SelectDeMaterias />
      <Footer />
    </>
  );
}

export default App;
