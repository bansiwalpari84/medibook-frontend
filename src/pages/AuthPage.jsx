import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AuthPage.css"
function AuthPage() {
    
  const [role, setRole] = useState("user")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [doctors, setDoctors] = useState([])
  const storedRole = localStorage.getItem("role")
  const doctorId = localStorage.getItem("doctorId")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [selectedDoctorId, setSelectedDoctorId] = useState("")
  const navigate = useNavigate()
  

  useEffect(() => {
  fetch("https://medibook-backend-4vub.onrender.com/api/doctors")
    .then(res => res.json())
    .then(data => setDoctors(data))
    .catch(err => console.log(err))
}, [])

useEffect(() => {
  document.body.style.overflow = "auto"

  return () => {
    document.body.style.overflow = "auto"
  }
}, [])

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!name || !email || !password) {
    alert("Please fill all fields")
    return
  }

  try {
    const url = isLogin
      ? "https://medibook-backend-4vub.onrender.com/api/auth/login"
      : "https://medibook-backend-4vub.onrender.com/api/auth/register"

    const body = isLogin
      ? { email, password }
      : {
          name,
          email,
          password,
          role,
          doctorId: role === "doctor" ? selectedDoctorId : null
        }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message)
      return
    }

    if (!isLogin) {
      alert("Account created! Please login.")
      setIsLogin(true)
      return
    }

    // LOGIN SUCCESS
    localStorage.setItem("role", data.role)

    if (data.role === "doctor") {
      localStorage.setItem("doctorId", data.doctorId)
      navigate(`/doctor-dashboard/${data.doctorId}`)
    } else if (data.role === "admin") {
      navigate("/admin")
    } else {
      navigate("/")
    }

  } catch (err) {
    console.log(err)
    alert("Something went wrong")
  }
}

useEffect(() => {
  if (storedRole === "admin") {
    navigate("/admin", { replace: true })
  } else if (storedRole === "doctor" && doctorId) {
    navigate(`/doctor-dashboard/${doctorId}`, { replace: true })
  } else if (storedRole === "user") {
    navigate("/", { replace: true })
  }
}, [])

if (storedRole && window.location.pathname === "/auth") {
  return null
}


  return (
    <div className="account-card">
      <p style={{ textAlign: "center" }}>
  {isLogin ? "Don't have an account?" : "Already have an account?"}
  <span
    style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
    onClick={() => setIsLogin(!isLogin)}
  >
    {isLogin ? "Register" : "Login"}
  </span>
</p>
        <form onSubmit={handleSubmit}>

      <h2>Login / Create Account</h2>

      <input required
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input required
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

      <input required
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select required
        onChange={(e) => {
          setRole(e.target.value)
        }}
      >
        <option value="user">User</option>
        <option value="doctor">Doctor</option>
        <option value="admin">Admin</option>
      </select>

  {!isLogin && role === "doctor" && (
  <select
    required
    onChange={(e) => setSelectedDoctorId(e.target.value)}
  >
    <option value="">Select Doctor</option>

    {doctors.map((doc) => (
      <option key={doc._id} value={doc._id}>
        {doc.name}
      </option>
    ))}
  </select>
)}

      <button
       type ="submit" className="create-btn"
        
      >
        Continue
      </button>
</form>
    </div>
  )
}

export default AuthPage