import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import AppointmentForm from "../components/AppointmentForm"
import "./BookingPage.css"

function BookingPage() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const selectedDoctor = params.get("doctor")

  const [doctors, setDoctors] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://medibook-backend-4vub.onrender.com/api/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.log(err))
  }, [])

  

useEffect(() => {
  const role = localStorage.getItem("role")

  if (!role) {
    navigate("/auth", { replace: true })
  }
}, [])

  return (
    <div 
    >
      <div className="heading">
      <h2>Book your Appointment Now :)</h2>
</div>
      <AppointmentForm
        selectedDoctor={selectedDoctor}
        doctors={doctors}
      />
    </div>
  )
}

export default BookingPage