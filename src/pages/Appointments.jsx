import { useEffect, useState } from "react"
import "./Appointments.css"

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const userEmail = localStorage.getItem("email")
  useEffect(() => {
    fetch("https://medibook-backend-4vub.onrender.com/api/appointments")
      .then(res => res.json())
      .then(data => {
        console.log("Appointments:", data)
        setAppointments(data)
      })
      .catch(err => console.log(err))
  }, [])


  const filteredAppointments = appointments.filter(
  (appt) => appt.email === userEmail
)
  return (
  <div className="appointments-container">
    <h2 className="appointments-title">My Appointments</h2>
    <div className="appointment-cardcontainer">

    {filteredAppointments.length === 0 ? (
  <p className="no-appointments">
    No appointments booked yet. 
  </p>
) : (
  filteredAppointments.map((appt) => (
        <div key={appt._id} className="appointment-card">

          <img
            src={appt.doctorId.image}
            alt={appt.doctorId.name}
            className="appointment-image"
          />

          <div className="appointment-info">
            <h3>{appt.doctorId.name}</h3>
            <p>{appt.doctorId.specialization}</p>
            <p>Date: {appt.date}</p>
            <p>Time: {appt.time}</p>
            <p>Patient: {appt.patientName}</p>
            <p className={`status ${appt.status?.toLowerCase()}`}>
  Status: {appt.status}
</p>
          </div>

        </div>
       
      ))

    )}
     </div>
  </div>
)
}

export default Appointments