import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import CityCard from '../components/CityCard'

function Favorites() {
    const { favorites } = useFavorites()

    return (
        <div>
            <h1 className="mb-4">❤️ I tuoi preferiti</h1>

            {favorites.length === 0 ? (
                <div className="alert alert-info">
                    <p className="mb-2">Non hai ancora aggiunto città ai preferiti.</p>
                    <Link to="/cities" className="btn btn-primary">
                        Vai alla lista città
                    </Link>
                </div>
            ) : (
                <>
                    <p className="text-muted">
                        {favorites.length} {favorites.length === 1 ? 'città' : 'città'} nei preferiti
                    </p>
                    <div className="row g-3">
                        {favorites.map(city => (
                            <div key={city.id} className="col-sm-6 col-md-4 col-lg-3">
                                <CityCard city={city} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Favorites