import { Link, NavLink } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

function Navbar() {
    const { count } = useFavorites()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">🌍 CityCompare</Link>
                <div className="navbar-nav">
                    <NavLink
                        className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}
                        to="/"
                        end
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}
                        to="/cities"
                    >
                        Città
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}
                        to="/comparator"
                    >
                        Confronta
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}
                        to="/favorites"
                    >
                        ❤️ Preferiti {count > 0 && <span className="badge bg-danger">{count}</span>}
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar