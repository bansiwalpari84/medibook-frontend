import { BrowserRouter, Routes, Route } from "react-router-dom"
import Appointments from "./pages/Appointments"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Doctors from "./pages/Doctors"
import Footer from "./components/Footer"
import DoctorProfile from "./pages/DoctorProfile"
import DoctorDashboard from "./pages/DoctorDashboard"
import Home from "./pages/home"
import AdminPanel from "./pages/AdminPanel"
import AuthPage from "./pages/AuthPage"
import BookingPage from "./pages/BookingPage"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  return (
 <div>

  <BrowserRouter>
  <ScrollToTop />

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/doctor/:id" element={<DoctorProfile />} />


<Route path="/doctors" element={<Doctors />} />
<Route path="/About" element={<About />} />
<Route path="/Contact" element={<Contact />} />
<Route path="/appointments" element={<Appointments />} />
<Route path="/doctor-dashboard" element={<DoctorDashboard />} />
<Route path="/doctor-dashboard/:id" element={<DoctorDashboard />} />
<Route path="/admin" element={<AdminPanel />} />
<Route path="/auth" element={<AuthPage />} />
<Route path="/book" element={<BookingPage />} />

  </Routes>
  </BrowserRouter>
  <Footer />

</div>
  )
}

export default App