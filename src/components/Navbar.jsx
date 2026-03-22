import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom"
import "./Navbar.css"
function Navbar({ onCreateAccount, isLoggedIn }){
  const navigate = useNavigate()
  const role = localStorage.getItem("role")
  return (
    <div className="navbar">

      <div className="navbar-logo">
        <img src="/logo.jpg" alt="MediBook Logo" />
      </div>

   <div className="navbar-links">
  <Link to="/">Home</Link>
  <Link to="/doctors">All Doctors</Link>
  <Link to="/about">About Us</Link>
  <Link to="/contact">Contact</Link>
</div>

     <div className="navbar-actions">

  {!role && (
    <button onClick={() => window.location.href = "/auth"}>
      Create Account
    </button>
  )}

  {role === "user" && (
    <>
      <button onClick={() => navigate("/appointments")}>
        My Appointments
      </button>

      <button
        onClick={() => {
          localStorage.clear()
          navigate("/")
        }}
      >
        Logout
      </button>
    </>
  )}

  {role === "doctor" && (
    <>
      <button
        onClick={() =>
          navigate(`/doctor-dashboard/${localStorage.getItem("doctorId")}`)
        }
      >
        Dashboard
      </button>

      <button
        onClick={() => {
          localStorage.clear()
          navigate("/")
        }}
      >
        Logout
      </button>
    </>
  )}

  {role === "admin" && (
    <>
      <button onClick={() => navigate("/admin")}>
        Admin Panel
      </button>

      <button
        onClick={() => {
          localStorage.clear()
          navigate("/")
        }}
      >
        Logout
      </button>
    </>
  )}

</div>

    </div>
  )
}

export default Navbar