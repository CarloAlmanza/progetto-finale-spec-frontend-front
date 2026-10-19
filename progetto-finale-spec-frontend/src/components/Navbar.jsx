import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

function Navbar() {
    const { count } = useFavorites()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">🌍 CityCompare</Link>
                <div className="navbar-nav">
                    <Link className="nav-link" to="/cities">Città</Link>
                    <Link className="nav-link" to="/comparator">Confronta</Link>
                    <Link className="nav-link" to="/favorites">
                        ❤️ Preferiti {count > 0 && <span className="badge bg-danger">{count}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar