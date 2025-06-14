import Login from "./Components/Login"
import { Route, Routes, BrowserRouter } from "react-router"
import NovedadesPage from "./Components/NovedadesPage"
import Novedades from "./Components/Novedades"
import MisNovedades from "./Components/MisNovedades"
import CrearNovedad from "./Components/CrearNovedad"
import CrearNovedadS from "./Components/CrearNovedadS"
import Legajos from "./Components/Legajos"
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NovedadesPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Novedades" element={<Novedades/>}/>
          <Route path="/Misnovedades" element={<MisNovedades/>}/>
          <Route path="/Nueva" element={<CrearNovedad/>}/>
          <Route path="/Crear" element={<CrearNovedadS/>}/>
          <Route path="/Legajos" element={<Legajos/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
