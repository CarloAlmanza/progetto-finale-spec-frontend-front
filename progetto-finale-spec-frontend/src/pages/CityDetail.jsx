import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_URL } from '../config'

function CityDetail() {
    // Prende l'id dall'URL (es. /cities/10 → id = "10")
    const { id } = useParams()

    const [city, setCity] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch della città ogni volta che cambia l'id nell'URL
    useEffect(() => {
        async function fetchCity() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch(`${API_URL}/cities/${id}`)
                if (!res.ok) throw new Error('Città non trovata')
                const data = await res.json()
                setCity(data.city)   // ← 👈 .city !!
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCity()
    }, [id])

    // Stati di caricamento/errore
    if (loading) return <div className="text-center py-5">⏳ Caricamento…</div>

    if (error) {
        return (
            <div className="alert alert-danger">
                <h4>❌ {error}</h4>
                <p>La città con id <strong>{id}</strong> non esiste.</p>
                <Link to="/cities" className="btn btn-primary">
                    ← Torna alla lista
                </Link>
            </div>
        )
    }

    if (!city) return null

    return (
        <div>
            {/* Bottone torna indietro */}
            <Link to="/cities" className="btn btn-outline-secondary mb-4">
                ← Torna alla lista
            </Link>

            {/* Header con nome e categoria */}
            <div className="mb-4">
                <h1 className="mb-2">{city.title}</h1>
                <span className="badge bg-primary fs-6">{city.category}</span>
            </div>

            {/* Pulsanti azione (placeholder) */}
            <div className="mb-4 d-flex gap-2">
                <button className="btn btn-outline-danger" disabled>
                    ❤️ Aggiungi ai preferiti
                </button>
                <button className="btn btn-outline-success" disabled>
                    ⚖️ Aggiungi al comparatore
                </button>
            </div>

            {/* Tabella chiave-valore */}
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title mb-3">📋 Informazioni</h5>
                    <table className="table table-striped mb-0">
                        <tbody>
                            <tr>
                                <th scope="row" style={{ width: '35%' }}>Paese</th>
                                <td>{city.country}</td>
                            </tr>
                            <tr>
                                <th scope="row">Popolazione</th>
                                <td>{city.population.toLocaleString('it-IT')} abitanti</td>
                            </tr>
                            <tr>
                                <th scope="row">Area</th>
                                <td>{city.area.toLocaleString('it-IT')} km²</td>
                            </tr>
                            <tr>
                                <th scope="row">Lingua</th>
                                <td>{city.language}</td>
                            </tr>
                            <tr>
                                <th scope="row">Valuta</th>
                                <td>{city.currency}</td>
                            </tr>
                            <tr>
                                <th scope="row">Fuso orario</th>
                                <td>{city.timezone}</td>
                            </tr>
                            <tr>
                                <th scope="row">Clima</th>
                                <td>{city.climate}</td>
                            </tr>
                            <tr>
                                <th scope="row">Costo della vita</th>
                                <td>
                                    <div className="d-flex align-items-center gap-2">
                                        <div
                                            className="progress flex-grow-1"
                                            style={{ height: '10px', maxWidth: '200px' }}
                                        >
                                            <div
                                                className="progress-bar bg-info"
                                                style={{ width: `${city.costOfLiving}%` }}
                                            ></div>
                                        </div>
                                        <span className="fw-bold">{city.costOfLiving}/100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Famosa per</th>
                                <td>{city.famousFor}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Descrizione estesa */}
            <div className="card shadow-sm mt-4">
                <div className="card-body">
                    <h5 className="card-title mb-3">📖 Descrizione</h5>
                    <p className="mb-0">{city.description}</p>
                </div>
            </div>
        </div>
    )
}

export default CityDetail