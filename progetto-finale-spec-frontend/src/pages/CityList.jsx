import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import CityCard from '../components/CityCard'

function CityList() {
    // Stato per le città prese dal backend
    const [cities, setCities] = useState([])

    // Stato per la ricerca e i filtri
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sortBy, setSortBy] = useState('') // '', 'title-asc', 'title-desc', 'category-asc', 'category-desc'

    // Stato per caricamento ed errori
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch iniziale al mount del componente
    useEffect(() => {
        async function fetchCities() {
            try {
                setLoading(true)
                const res = await fetch(`${API_URL}/cities`)
                if (!res.ok) throw new Error('Errore nel caricamento')
                const data = await res.json()
                setCities(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCities()
    }, [])

    // Ricaviamo la lista di categorie uniche dalle città caricate
    // (semplice con Set, per non ripetere "Capitale", "Moderna", ecc.)
    const categories = [...new Set(cities.map(c => c.category))].sort()

    // Applica ricerca, filtro e ordinamento (senza mutare l'array originale)
    const filteredCities = cities
        .filter(city =>
            city.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(city =>
            selectedCategory === '' || city.category === selectedCategory
        )
        .sort((a, b) => {
            if (sortBy === 'title-asc') return a.title.localeCompare(b.title)
            if (sortBy === 'title-desc') return b.title.localeCompare(a.title)
            if (sortBy === 'category-asc') return a.category.localeCompare(b.category)
            if (sortBy === 'category-desc') return b.category.localeCompare(a.category)
            return 0
        })

    // Reset dei filtri
    function resetFilters() {
        setSearchTerm('')
        setSelectedCategory('')
        setSortBy('')
    }

    // Stati di caricamento/errore
    if (loading) return <div className="text-center py-5">⏳ Caricamento…</div>
    if (error) return <div className="alert alert-danger">❌ {error}</div>

    return (
        <div>
            <h1 className="mb-4">📋 Città</h1>

            {/* Controlli: ricerca, filtro categoria, ordinamento */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Cerca per nome…"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Tutte le categorie</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <option value="">Ordina per…</option>
                        <option value="title-asc">Titolo A → Z</option>
                        <option value="title-desc">Titolo Z → A</option>
                        <option value="category-asc">Categoria A → Z</option>
                        <option value="category-desc">Categoria Z → A</option>
                    </select>
                </div>

                <div className="col-md-2">
                    <button
                        className="btn btn-outline-secondary w-100"
                        onClick={resetFilters}
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Contatore risultati */}
            <p className="text-muted">
                {filteredCities.length} risultat{filteredCities.length === 1 ? 'o' : 'i'}
            </p>

            {/* Griglia delle card */}
            {filteredCities.length === 0 ? (
                <div className="alert alert-warning text-center">
                    <h5>🔎 Nessuna città trovata</h5>
                    <p className="mb-2">Prova a cambiare i filtri o la ricerca.</p>
                    <button className="btn btn-sm btn-outline-secondary" onClick={resetFilters}>
                        Reset filtri
                    </button>
                </div>
            ) : (
                <div className="row g-3">
                    {filteredCities.map(city => (
                        <div key={city.id} className="col-sm-6 col-md-4 col-lg-3">
                            <CityCard city={city} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CityList