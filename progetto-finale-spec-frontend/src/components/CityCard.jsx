import { Link } from 'react-router-dom'

function CityCard({ city }) {
    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{city.title}</h5>
                <p className="card-text">
                    <span className="badge bg-primary">{city.category}</span>
                </p>
                <Link
                    to={`/cities/${city.id}`}
                    className="btn btn-outline-primary mt-auto"
                >
                    Vedi dettaglio
                </Link>
            </div>
        </div>
    )
}

export default CityCard