import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Logout from "./components/Logout"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import Connections from "./components/Connections"

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/" >
          <Routes>
            <Route path="/" element={<> <Body /> </>} >
              <Route path="/" element={<> <Feed /> </>} />
              <Route path="/login" element={<> <Login /> </>} />
              <Route path="/logout" element={<> <Logout /> </>} />
              <Route path="/connectons" element={<> <Connections /></>} />
              <Route path="/profile" element={<> <Profile /> </>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
