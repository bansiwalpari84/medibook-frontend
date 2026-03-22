import Speciality from "../components/Speciality"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DoctorCard from "../components/DoctorCard"
import { useNavigate } from "react-router-dom"
import AppointmentForm from "../components/AppointmentForm"

import "./home.css"

function Home() {
  const [showAll, setShowAll] = useState(false)
  const [doctors, setDoctors] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
 
  useEffect(() => {
  fetch("https://medibook-backend-4vub.onrender.com/api/doctors")
    .then(res => res.json())
    .then(data => {
      console.log("Home doctors:", data)
      setDoctors(data)
    })
    .catch(err => console.log(err))
}, [])

  return (

    <div>
<Navbar />

      {/* HERO SECTION */}
      <div className="hero">

        <div className="hero-text">
          <h1>Book Doctor Appointments Online</h1>

          <p>
            MediBook helps patients connect with trusted doctors
            and book appointments easily from home.
          </p>

          <button
            className="hero-btn"
        onClick={() => {
  const role = localStorage.getItem("role")

  if (!role) {
    navigate("/auth")
  } else {
    navigate("/book")
  }
}}
          >
            Book Appointment
          </button>

        </div>

        <div>
          <img src="/doctorimage.png" alt="doctor" />
        </div>

      </div>




{/* FIND BY SPECIALITY */}
<Speciality />



      {/* DOCTOR SECTION */}
      <div className="doctor-section">

        <h2>Our Doctors</h2>

        <div className="doctor-list">

         {(showAll ? doctors : doctors.slice(0, 8)).map((doctor) => (
  <DoctorCard
    key={doctor._id}
    id={doctor._id}
    name={doctor.name}
    specialization={doctor.specialization}
    image={doctor.image}
  />
))}
</div>

    {doctors.length > 8 && (
  <div className="view-more-container">
    <button
      className="view-more-btn"
      onClick={() => {
  if (showAll) {
    const section = document.querySelector(".doctor-section")

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    }
  }

  setShowAll(!showAll)
}}
    >
      {showAll ? "View Less" : "View More Doctors"}
    </button>
  </div>
)}

  </div>


      {/* BOOKING BANNER */}
      <div className="booking-banner">

        

        <div className="banner-content">

          <h2>Need to consult a doctor today?</h2>

          <p>
            Book appointments with experienced doctors quickly
            and easily through MediBook.
          </p>

          <button
            className="banner-btn"
         onClick={() => {
  const role = localStorage.getItem("role")

  if (!role) {
    navigate("/auth")
  } else {
    navigate("/book")
  }
}}
          >
            Book Appointment
          </button>

        </div>
        <img src="/doctorbanner.png" alt="Doctors" />

      </div>

    </div>

  )
}

export default Home