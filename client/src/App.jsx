import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./pages/About"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./components/Header"
import FooterComp from "./components/Footer"
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  
  const { theme } = useSelector((state) => state.theme);

    useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

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
