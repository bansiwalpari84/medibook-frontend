import { useEffect, useState } from "react"
import "./AdminPanel.css"
function AdminPanel() {
  const [doctors, setDoctors] = useState([])
  const [name, setName] = useState("")
const [specialization, setSpecialization] = useState("")
const [experience, setExperience] = useState("")
const [fees, setFees] = useState("")
const [image, setImage] = useState("")

const addDoctor = () => {
  fetch("https://medibook-backend-4vub.onrender.com/api/doctors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      specialization,
      experience,
      fees,
      image
    })
  })
    .then(res => res.json())
    .then(newDoctor => {
      setDoctors(prev => [...prev, newDoctor])

      // reset fields
      setName("")
      setSpecialization("")
      setExperience("")
      setFees("")
      setImage("")
    })
    .catch(err => console.log(err))
}

const deleteDoctor = (id) => {
  fetch(`https://medibook-backend-4vub.onrender.com/api/doctors/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(() => {
      setDoctors(prev => prev.filter(doc => doc._id !== id))
    })
    .catch(err => console.log(err))
}

const role = localStorage.getItem("role")

if (role !== "admin") {
  return <h2 style={{ padding: "40px" }}>Access Denied</h2>
}

  useEffect(() => {
    fetch("https://medibook-backend-4vub.onrender.com/api/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.log(err))
  }, [])

  return (
  <div className="admin-container">

    <h2 className="admin-title">Admin Panel</h2>

    <div className="admin-form">
      <h3>Add Doctor</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      />

      <input
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <input
        placeholder="Fees"
        value={fees}
        onChange={(e) => setFees(e.target.value)}
      />

      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button onClick={addDoctor}>Add Doctor</button>
    </div>
    <div className="alldoc">
<h3>All Doctors </h3>
</div>
    {doctors.map((doc) => (
      <div key={doc._id} className="admin-card">
        <p>{doc.name} - {doc.specialization}</p>

        <button
          className="delete-btn"
          onClick={() => deleteDoctor(doc._id)}
        >
          Delete
        </button>
      </div>
    ))}

  </div>
)
}

export default AdminPanel