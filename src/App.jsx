import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Logout from "./components/Logout"

function App() {

  return (
    <>

      <BrowserRouter basename="/" >
        <Routes>
          <Route path="/" element={<> <Body /> </>} >
            <Route path="/login" element={<> <Login /> </>} />
            <Route path="/logout" element={<> <Logout /> </>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
