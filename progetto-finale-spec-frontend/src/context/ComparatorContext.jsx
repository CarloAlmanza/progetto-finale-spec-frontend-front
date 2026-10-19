import { createContext, useContext, useState } from 'react'

// 1. Creiamo il Context
const ComparatorContext = createContext()

// 2. Creiamo il Provider (il "contenitore" dello stato)
export function ComparatorProvider({ children }) {
    // Array di 2 città selezionate (max 2)
    const [comparatorCities, setComparatorCities] = useState([])

    // Aggiunge una città al comparatore (max 2)
    function addToComparator(city) {
        setComparatorCities(prev => {
            // Se già presente, non aggiungo
            if (prev.some(c => c.id === city.id)) return prev
            // Se ho già 2, sostituisco il secondo (o blocco?)
            if (prev.length >= 2) {
                // Opzione: sostituisci il primo (FIFO)
                return [prev[1], city]
            }
            return [...prev, city]
        })
    }

    // Rimuove una città dal comparatore
    function removeFromComparator(cityId) {
        setComparatorCities(prev => prev.filter(c => c.id !== cityId))
    }

    // Svuota il comparatore
    function clearComparator() {
        setComparatorCities([])
    }

    // Verifica se una città è già nel comparatore
    function isInComparator(cityId) {
        return comparatorCities.some(c => c.id === cityId)
    }

    // Valore esposto a tutti i componenti
    const value = {
        comparatorCities,
        addToComparator,
        removeFromComparator,
        clearComparator,
        isInComparator,
    }

    return (
        <ComparatorContext.Provider value={value}>
            {children}
        </ComparatorContext.Provider>
    )
}

// 3. Hook personalizzato per usare il Context
export function useComparator() {
    const context = useContext(ComparatorContext)
    if (!context) {
        throw new Error('useComparator deve essere usato dentro ComparatorProvider')
    }
    return context
}