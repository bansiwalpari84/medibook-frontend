
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import "./DoctorProfile.css"
import { useParams } from "react-router-dom"


function DoctorProfile() {
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState(null)

  const { id } = useParams()


useEffect(() => {
  fetch(`https://medibook-backend-4vub.onrender.com/api/doctors/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log("Doctor fetched:", data)
      setDoctor(data)
    })
    .catch(err => console.log(err))
}, [id])



  if (!doctor) {
    return <h2>Loading...</h2>
  }

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

const timeSlots = [
  "10:00 AM",
  "11:30 AM",
  "2:00 PM",
  "4:30 PM"
]

  return (

    <div className="doctor-profile-container">

      <div className="doctor-profile-card">


        <img
          src={doctor.image}
          alt={doctor.name}
          className="doctor-profile-image"
        />


        <div className="doctor-profile-info">

          <h2>{doctor.name}</h2>

          <p className="doctor-speciality">
            {doctor.specialization}
          </p>

          <span className="doctor-experience">
            {doctor.experience}

          </span>

          <p className="doctor-about">
            {doctor.name} is a highly experienced specialist dedicated
            to providing the best healthcare solutions for patients.
            Book a consultation to receive expert medical guidance.
          </p>

          <p className="doctor-fee">
            Consultation Fee: ₹{doctor.fees}
          </p>

         <button
  className="doctor-book-btn"
 onClick={() => {
  const role = localStorage.getItem("role")

  if (!role) {
    navigate("/auth")
  } else {
   navigate(`/book?doctor=${doctor._id}`)
  }
}}
>
  Book Appointment
</button>

          <div className="slots-section">

  <h3>Available Slots</h3>

  <div className="days-row">
    {days.map((day, index) => (
      <div key={index} className="day">
        {day}
      </div>
    ))}
  </div>

  <div className="slots-row">
    {timeSlots.map((slot, index) => (
      <div key={index} className="slot">
        {slot}
      </div>
    ))}
  </div>

</div>

        </div>

      </div>

    </div>

  )
}

export default DoctorProfile