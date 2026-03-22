import { useEffect, useState } from "react"
import "./Doctors.css"
import { useLocation } from "react-router-dom"
import DoctorCard from "../components/DoctorCard"
function Doctors() {
  console.log("Doctors component rendered") ;

    const [doctors, setDoctors] = useState([])
    const [search, setSearch] = useState("")

  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const speciality = params.get("speciality")
useEffect(() => {
  fetch("https://medibook-backend-4vub.onrender.com/api/doctors")
    .then(res => res.json())
    .then(data => {
      console.log("Fetched doctors:", data)
      setDoctors(data)
    })
    .catch(err => console.log(err))
}, [])

  // FILTER LOGIC
  const filteredDoctors = doctors.filter((doc) => {

  const matchesSpeciality = speciality
    ? doc.specialization === speciality
    : true

  const matchesSearch =
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(search.toLowerCase())

  return matchesSpeciality && matchesSearch
})

  return (
  <div className="doctor-page">

    {/*  HEADER SECTION */}
    <div className="doctor-header">

      <h2 className="doctor-title">
        {speciality ? `${speciality} Doctors` : "All Doctors"}
      </h2>

      <div className="filter-buttons">

        <button onClick={() => window.location.href="/doctors"}>
          All
        </button>

        <button onClick={() => window.location.href="/doctors?speciality=Cardiologist"}>
          Cardiologist
        </button>

        <button onClick={() => window.location.href="/doctors?speciality=Dermatologist"}>
          Dermatologist
        </button>

      </div>

      <input
        type="text"
        placeholder="Search doctors or speciality..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

    </div>

    {/* DOCTOR LIST */}
    <div className="doctor-list">
      {filteredDoctors.map((doctor) => (
        <DoctorCard
          key={doctor._id}
          id={doctor._id}
          name={doctor.name}
          specialization={doctor.specialization}
          image={doctor.image}
        />
      ))}
    </div>

    {/* EMPTY STATE */}
    {filteredDoctors.length === 0 && (
      <p className="no-doctors">No doctors found</p>
    )}

  </div>
)
}

export default Doctors