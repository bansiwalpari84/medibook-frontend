import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT SECTION */}
        <div className="footer-brand">

          <img src="/logo.jpg" alt="MediBook Logo" />

          <p>
            MediBook helps patients connect with trusted doctors
            and book appointments easily from anywhere.
          </p>

        </div>


        {/* CENTER LINKS */}
        <div className="footer-links">

          <h3>Company</h3>

          <a href="/">Home</a>
          <a href="/">Doctors</a>
          <a href="/">About Us</a>
          <a href="/">Contact</a>

        </div>


        {/* CONTACT */}
        <div className="footer-contact">

          <h3>Get in Touch</h3>

          <p>+91 9876543210</p>
          <p>contact@medibook.com</p>

        </div>

      </div>


      {/* BOTTOM LINE */}
      <div className="footer-bottom">

        <p>© 2026 MediBook — All Rights Reserved.</p>

      </div>

    </footer>
  )
}

export default Footer