import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./DoctorDashboard.css"

function DoctorDashboard() {
    const { id } = useParams()
    const [appointments, setAppointments] = useState([])




    useEffect(() => {

        fetch(`https://medibook-backend-4vub.onrender.com/api/appointments/doctor/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("Doctor appointments:", data)
                if (Array.isArray(data)) {
  setAppointments(data)
} else {
  console.log("Error:", data)
  setAppointments([])
}
            })
            .catch(err => console.log(err))
    }, [id])

    useEffect(() => {
  const role = localStorage.getItem("role")

  if (role !== "doctor") {
    window.location.href = "/"
  }
}, [])

    const updateStatus = (id, newStatus) => {
        fetch(`https://medibook-backend-4vub.onrender.com/api/appointments/${id}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: newStatus })
        })
            .then(res => res.json())
            .then(updated => {
                setAppointments(prev =>
                    prev.map(appt =>
                        appt._id === id ? updated : appt
                    )
                )
            })
            .catch(err => console.log(err))
    }

    const doctorName =
  appointments.length > 0
    ? appointments[0].doctorId?.name
    : ""
    return (
        <div className="dashboard-container">
           <h2 className="dashboard-title">
  {doctorName
    ? `Appointments for ${doctorName}`
    : `No Appointments yet for You :(`
    }
</h2>

            {appointments.length === 0 ? (
                <p>No appointments yet</p>
            ) : (
                appointments.map((appt) => (
                    <div key={appt._id} className="dashboard-card">

                        <div className="dashboard-info">
                            <p><strong>Patient:</strong> {appt.patientName}</p>
                            <p><strong>Date:</strong> {appt.date}</p>
                            <p><strong>Time:</strong> {appt.time}</p>
                        </div>

                        <div className="dashboard-actions">
                            <p className={`status ${appt.status.toLowerCase()}`}>
                                Status: {appt.status}
                            </p>
                            <button
                                className="approve-btn"
                                disabled={appt.status !== "Pending"}
                                onClick={() => updateStatus(appt._id, "Approved")}
                            >
                                Approve
                            </button>

                            <button
                                className="cancel-btn"
                                disabled={appt.status !== "Pending"}
                                onClick={() => updateStatus(appt._id, "Cancelled")}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default DoctorDashboard