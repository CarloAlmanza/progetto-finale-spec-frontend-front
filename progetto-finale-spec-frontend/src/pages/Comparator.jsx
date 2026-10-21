import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import { useComparator, MAX_COMPARATOR } from '../context/ComparatorContext'

function Comparator() {
    // Lista completa (per il dropdown "aggiungi")
    const [allCities, setAllCities] = useState([])
    // Dettagli completi delle città selezionate
    const [detailedCities, setDetailedCities] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const {
        comparatorCities,
        addToComparator,
        removeFromComparator,
        clearComparator,
        isFull,
        count,
    } = useComparator()

    // Carica lista città all'avvio
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

    // Quando cambia comparatorCities, ricarica i dettagli completi
    useEffect(() => {
        async function loadDetails() {
            if (comparatorCities.length === 0) {
                setDetailedCities([])
                return
            }
            try {
                // Fetch in parallelo di tutti i dettagli
                const results = await Promise.all(
                    comparatorCities.map(c =>
                        fetch(`${API_URL}/cities/${c.id}`).then(r => r.json())
                    )
                )
                setDetailedCities(results.map(r => r.city))
            } catch (err) {
                setError(err.message)
            }
        }
        loadDetails()
    }, [comparatorCities])

    // Handler per aggiungere una città da dropdown
    function handleAdd(cityId) {
        if (!cityId) return
        const city = allCities.find(c => c.id === Number(cityId))
        if (city) addToComparator(city)
    }

    if (loading) return <div className="text-center py-5">⏳ Caricamento…</div>
    if (error) return <div className="alert alert-danger">❌ {error}</div>

    // Lista delle proprietà da confrontare
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
                Seleziona fino a <strong>{MAX_COMPARATOR}</strong> città da confrontare affiancate.
            </p>

            {/* Dropdown "aggiungi città" */}
            <div className="row g-3 mb-4">
                <div className="col-md-6">
                    <label className="form-label fw-bold">Aggiungi una città</label>
                    <select
                        className="form-select"
                        value=""
                        onChange={e => handleAdd(e.target.value)}
                        disabled={isFull}
                    >
                        <option value="">
                            {isFull ? `Massimo ${MAX_COMPARATOR} città raggiunto` : '— Scegli una città —'}
                        </option>
                        {allCities
                            .filter(c => !comparatorCities.some(cc => cc.id === c.id))
                            .map(city => (
                                <option key={city.id} value={city.id}>
                                    {city.title} ({city.category})
                                </option>
                            ))}
                    </select>
                </div>
                <div className="col-md-6 d-flex align-items-end gap-2">
                    <span className="badge bg-info fs-6">
                        {count}/{MAX_COMPARATOR} selezionate
                    </span>
                    {count > 0 && (
                        <button className="btn btn-outline-danger" onClick={clearComparator}>
                            🗑️ Svuota
                        </button>
                    )}
                </div>
            </div>

            {/* Tabella di confronto */}
            {detailedCities.length === 0 ? (
                <div className="alert alert-info text-center">
                    <h5>👆 Nessuna città selezionata</h5>
                    <p className="mb-0">Aggiungi almeno 2 città per confrontarle.</p>
                </div>
            ) : (
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0 align-middle">
                                <thead>
                                    <tr>
                                        <th style={{ width: '20%' }}>Caratteristica</th>
                                        {detailedCities.map(city => (
                                            <th key={city.id} className="text-center">
                                                <div className="d-flex flex-column align-items-center gap-1">
                                                    <h5 className="mb-0">{city.title}</h5>
                                                    <span className="badge bg-primary">{city.category}</span>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger mt-1"
                                                        onClick={() => removeFromComparator(city.id)}
                                                        title="Rimuovi dal comparatore"
                                                    >
                                                        ✕ Rimuovi
                                                    </button>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {fieldsToCompare.map(field => {
                                        // Per ogni riga, controllo se TUTTI i valori sono uguali
                                        const values = detailedCities.map(c => c[field.key])
                                        const allSame = values.every(v => v === values[0])

                                        return (
                                            <tr key={field.key}>
                                                <th scope="row">{field.label}</th>
                                                {detailedCities.map((city, i) => {
                                                    const rawValue = city[field.key]
                                                    const formatted = field.format ? field.format(rawValue) : rawValue
                                                    return (
                                                        <td
                                                            key={city.id}
                                                            className={`text-center ${!allSame ? 'table-warning' : ''}`}
                                                        >
                                                            {formatted}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Suggerimento se ce n'è solo 1 */}
            {detailedCities.length === 1 && (
                <div className="alert alert-secondary mt-3">
                    💡 Aggiungi almeno un'altra città per vedere il confronto completo.
                </div>
            )}
        </div>
    )
}

export default Comparator