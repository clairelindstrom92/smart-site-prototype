export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">
          Smart<span>Site</span>
        </div>
        <ul className="navbar-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <span className="navbar-badge">VOICE AI</span>
          </li>
        </ul>
      </div>
    </nav>
  )
}
