import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

function CityCard({ city }) {
    const { toggleFavorite, isFavorite } = useFavorites()
    const favorite = isFavorite(city.id)

    return (
        <div className="card h-100 shadow-sm position-relative">
            {/* Bottone cuore in alto a destra */}
            <button
                className={`btn btn-sm position-absolute top-0 end-0 m-2 ${favorite ? 'btn-danger' : 'btn-outline-danger'
                    }`}
                onClick={() => toggleFavorite(city)}
                title={favorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
                style={{ zIndex: 1 }}
            >
                {favorite ? '❤️' : '🤍'}
            </button>

            <div className="card-body d-flex flex-column">
                <h5 className="card-title pe-4">{city.title}</h5>
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