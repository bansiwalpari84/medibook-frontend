import { useNavigate } from "react-router-dom"
import "./DoctorCard.css"

function DoctorCard({ id, name, specialization, image }) {

  const navigate = useNavigate()

  return (

    <div
      className="doctor-card"
      onClick={() => navigate(`/doctor/${id}`)}
    >

 

<div className="doctor-image">
      <img src={image} alt={name} />
</div>

      <div className="doctor-info">
    <h3>{name}</h3>
    <p>{specialization}</p>
  </div>

 

    </div>

    

  )
}

export default DoctorCard