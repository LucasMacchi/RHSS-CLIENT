import Login from "./Components/Login"
import { Route, Routes, BrowserRouter } from "react-router"
import NovedadesPage from "./Components/NovedadesPage"
import Novedades from "./Components/Novedades"
import MisNovedades from "./Components/MisNovedades"
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NovedadesPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Novedades" element={<Novedades/>}/>
          <Route path="/Misnovedades" element={<MisNovedades/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
