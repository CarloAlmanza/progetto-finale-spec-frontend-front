import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import { useComparator } from '../context/ComparatorContext'

function Comparator() {
    // Lista completa di città (per i dropdown)
    const [allCities, setAllCities] = useState([])
    // Dettagli delle 2 città selezionate (con tutte le proprietà)
    const [cityA, setCityA] = useState(null)
    const [cityB, setCityB] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Context del comparatore
    const { comparatorCities, addToComparator, removeFromComparator, clearComparator } = useComparator()

    // Carica la lista città all'avvio
    useEffect(() => {
        async function fetchCities() {
            try {
                setLoading(true)
                const res = await fetch(`${API_URL}/cities`)
                if (!res.ok) throw new Error('Errore nel caricamento')
                const data = await res.json()
                setAllCities(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCities()
    }, [])

    // Quando cambiano le 2 città nel context, carico i dettagli
    useEffect(() => {
        async function loadCityDetails() {
            // Se ce ne sono 2, carico entrambe
            if (comparatorCities.length === 2) {
                try {
                    const [a, b] = comparatorCities
                    const [resA, resB] = await Promise.all([
                        fetch(`${API_URL}/cities/${a.id}`),
                        fetch(`${API_URL}/cities/${b.id}`),
                    ])
                    const dataA = await resA.json()
                    const dataB = await resB.json()
                    setCityA(dataA.city)
                    setCityB(dataB.city)
                } catch (err) {
                    setError(err.message)
                }
            } else {
                setCityA(null)
                setCityB(null)
            }
        }
        loadCityDetails()
    }, [comparatorCities])

    // Handler: seleziona città dallo slot 1 o 2
    function handleSelectCity(slot, cityId) {
        // Rimuovi la città precedente dello slot
        if (slot === 0 && comparatorCities[0]) {
            removeFromComparator(comparatorCities[0].id)
        }
        if (slot === 1 && comparatorCities[1]) {
            removeFromComparator(comparatorCities[1].id)
        }
        // Se l'utente ha scelto "--", non aggiungo nulla
        if (!cityId) return
        const city = allCities.find(c => c.id === Number(cityId))
        if (city) addToComparator(city)
    }

    // Trova l'id di una città nel comparatore
    const cityAId = comparatorCities[0]?.id || ''
    const cityBId = comparatorCities[1]?.id || ''

    if (loading) return <div className="text-center py-5">⏳ Caricamento…</div>
    if (error) return <div className="alert alert-danger">❌ {error}</div>

    // Lista delle proprietà da confrontare (stessa per entrambe)
    const fieldsToCompare = [
        { key: 'country', label: 'Paese' },
        { key: 'population', label: 'Popolazione', format: v => v.toLocaleString('it-IT') + ' abitanti' },
        { key: 'area', label: 'Area', format: v => v.toLocaleString('it-IT') + ' km²' },
        { key: 'language', label: 'Lingua' },
        { key: 'currency', label: 'Valuta' },
        { key: 'timezone', label: 'Fuso orario' },
        { key: 'climate', label: 'Clima' },
        { key: 'costOfLiving', label: 'Costo della vita', format: v => v + '/100' },
        { key: 'famousFor', label: 'Famosa per' },
    ]

    return (
        <div>
            <h1 className="mb-4">⚖️ Comparatore</h1>
            <p className="text-muted">
                Seleziona due città dai menu qui sotto per confrontarle affiancate.
            </p>

            {/* Selettori */}
            <div className="row g-3 mb-4">
                <div className="col-md-6">
                    <label className="form-label fw-bold">Città A</label>
                    <select
                        className="form-select"
                        value={cityAId}
                        onChange={e => handleSelectCity(0, e.target.value)}
                    >
                        <option value="">— Seleziona una città —</option>
                        {allCities.map(city => (
                            <option key={city.id} value={city.id}>
                                {city.title} ({city.category})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label fw-bold">Città B</label>
                    <select
                        className="form-select"
                        value={cityBId}
                        onChange={e => handleSelectCity(1, e.target.value)}
                    >
                        <option value="">— Seleziona una città —</option>
                        {allCities.map(city => (
                            <option key={city.id} value={city.id}>
                                {city.title} ({city.category})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Bottone svuota */}
            {comparatorCities.length > 0 && (
                <button className="btn btn-outline-danger mb-4" onClick={clearComparator}>
                    🗑️ Svuota comparatore
                </button>
            )}

            {/* Tabella di confronto (solo se ho 2 città) */}
            {cityA && cityB ? (
                <div className="card shadow-sm">
                    <div className="card-body">
                        <table className="table table-bordered mb-0">
                            <thead>
                                <tr>
                                    <th style={{ width: '30%' }}>Caratteristica</th>
                                    <th className="text-center" style={{ width: '35%' }}>
                                        <h5 className="mb-0">{cityA.title}</h5>
                                        <span className="badge bg-primary">{cityA.category}</span>
                                    </th>
                                    <th className="text-center" style={{ width: '35%' }}>
                                        <h5 className="mb-0">{cityB.title}</h5>
                                        <span className="badge bg-primary">{cityB.category}</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {fieldsToCompare.map(field => {
                                    const valueA = cityA[field.key]
                                    const valueB = cityB[field.key]
                                    const isDifferent = valueA !== valueB
                                    const formattedA = field.format ? field.format(valueA) : valueA
                                    const formattedB = field.format ? field.format(valueB) : valueB

                                    return (
                                        <tr key={field.key}>
                                            <th scope="row">{field.label}</th>
                                            <td
                                                className={`text-center ${isDifferent ? 'table-warning' : ''}`}
                                            >
                                                {formattedA}
                                            </td>
                                            <td
                                                className={`text-center ${isDifferent ? 'table-warning' : ''}`}
                                            >
                                                {formattedB}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="alert alert-info">
                    👆 Seleziona <strong>due città</strong> per iniziare il confronto.
                </div>
            )}
        </div>
    )
}

export default Comparator