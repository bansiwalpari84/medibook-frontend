import { useNavigate } from "react-router-dom"
import "./Speciality.css"

const specialities = [
  { name: "General physician", image: "/general.png" },
  { name: "Gynecologist", image: "/gynecologist.png" },
  { name: "Dermatologist", image: "/dermatologist.png" },
  { name: "Pediatrician", image: "/pediatrician.png" },
  { name: "Neurologist", image: "/neurologist.png" },
  { name: "Gastroenterologist", image: "/gastro.png" },
]

function Speciality() {
  const navigate = useNavigate() 
  return (
    <div className="speciality-section">

      <h2>Find by Speciality</h2>

      <p className="speciality-subtitle">
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      <div className="speciality-grid">

        {specialities.map((item, index) => (
        <div
  key={index}
  className="speciality-card"
  onClick={() => navigate(`/doctors?speciality=${item.name}`)}
>

            <img src={item.image} alt={item.name} />

            <p>{item.name}</p>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Speciality