import Login from "./Components/Login"
import { Route, Routes, BrowserRouter } from "react-router"
import NovedadesPage from "./Components/NovedadesPage"
import Novedades from "./Components/Novedades"
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NovedadesPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Novedades" element={<Novedades/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
