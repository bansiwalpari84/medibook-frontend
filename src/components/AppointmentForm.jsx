import { useState, useEffect } from "react"
import "./AppointmentForm.css"
function AppointmentForm({ selectedDoctor, doctors, onClose }) {
  const [booked, setBooked] = useState(false)
  const [patientName, setPatientName] = useState("")
const [email, setEmail] = useState("")
const [date, setDate] = useState("")
const [time, setTime] = useState("")
const [doctorId, setDoctorId] = useState("")

useEffect(() => {
  if (selectedDoctor) {
    setDoctorId(selectedDoctor)
  }
}, [selectedDoctor])


useEffect(() => {
  if (booked) {
    const timer = setTimeout(() => {
      setBooked(false)
    }, 2000) // 2 seconds

    return () => clearTimeout(timer)
  }
}, [booked])
 
  return (
    <div id="appointment-form" className="appointment-section">
      <div className="appointment-form">

        <h2>Book an Appointment</h2>
        <p className="appointment-subtitle">
          Schedule your consultation with our trusted doctors
        </p>

       <form onSubmit={async (e) => {
  e.preventDefault()

if (!doctorId) {
  alert("Please select a doctor first")
  return
}

  try {
    const res = await fetch("https://medibook-backend-4vub.onrender.com/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       doctorId: doctorId, 
        patientName,
        date,
        time
      })
    })

    const data = await res.json()
    console.log("Appointment booked:", data)

    setBooked(true)
    
    // reset fields
    setDoctorId("");
    setPatientName("")
    setEmail("")
    setDate("")
    setTime("")

  } catch (error) {
    console.log(error)
  }
}}>

  <select 
  value={doctorId}
  onChange={(e) => setDoctorId(e.target.value)}
  required
>
  <option value="">Select Doctor</option>

  {doctors.map((doc) => (
    <option key={doc._id} value={doc._id}>
      {doc.name} ({doc.specialization})
    </option>
  ))}
</select>

         <input
  type="text"
  placeholder="Patient Name"
  value={patientName}
  onChange={(e) => setPatientName(e.target.value)}
  required
/>

<input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

<input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  required
/>

<input
  type="text"
  placeholder="Time (e.g. 10:00 AM)"
  value={time}
  onChange={(e) => setTime(e.target.value)}
  required
/>




          <button type="submit">Confirm Appointment</button>
          {booked && <p className="success">Appointment booked successfully!</p>}



        </form>

      </div>
    </div>

  )

}

export default AppointmentForm