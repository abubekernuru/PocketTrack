import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./pages/About"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./components/Header"
import FooterComp from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <FooterComp />
    </BrowserRouter>
  )
}

export default App
