import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/Navbar"

function App() {

  return (
    <>
      <NavBar />

      <BrowserRouter basename="/" >
        <Routes>
          <Route path="/" element={<div> Base Page </div>} />
          <Route path="/login" element={<div> Login Page </div>} />
          <Route path="/logout" element={<div> Logout Page </div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
