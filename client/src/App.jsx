import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./pages/About"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./components/Header"
import FooterComp from "./components/Footer"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import PrivateRoutes from "./components/PrivateRoutes"
import Dashboard from "./pages/Dashboard"
import ThemeProvider from "./components/ThemeProvider"
import IsAdminRoutes from "./components/IsAdminRoutes"
import UpdateTransaction from "./pages/UpdateTransaction"

function App() {
  
  const { theme } = useSelector((state) => state.theme);

    useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <BrowserRouter>
    <ThemeProvider>
      <Header />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/updatetransaction/:trxnId" element={<UpdateTransaction />} />
        </Route>
        <Route element={<IsAdminRoutes />}>
          
        </Route>
      </Routes>
      <FooterComp />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
