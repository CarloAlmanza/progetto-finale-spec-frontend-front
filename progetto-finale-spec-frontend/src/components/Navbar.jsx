import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">🌍 CityCompare</Link>
                <div className="navbar-nav">
                    <Link className="nav-link" to="/cities">Città</Link>
                    <Link className="nav-link" to="/comparator">Confronta</Link>
                    <Link className="nav-link" to="/favorites">Preferiti</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar