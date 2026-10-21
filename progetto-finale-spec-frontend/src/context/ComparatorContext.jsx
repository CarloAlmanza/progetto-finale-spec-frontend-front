import { createContext, useContext, useState } from 'react'

const ComparatorContext = createContext()

// Numero massimo di città nel comparatore
export const MAX_COMPARATOR = 4

export function ComparatorProvider({ children }) {
    const [comparatorCities, setComparatorCities] = useState([])

    // Aggiunge una città al comparatore (max MAX_COMPARATOR)
    function addToComparator(city) {
        setComparatorCities(prev => {
            // Se già presente, non aggiungo
            if (prev.some(c => c.id === city.id)) return prev
            // Se ho già raggiunto il massimo, non aggiungo
            if (prev.length >= MAX_COMPARATOR) return prev
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

    const value = {
        comparatorCities,
        addToComparator,
        removeFromComparator,
        clearComparator,
        isInComparator,
        isFull: comparatorCities.length >= MAX_COMPARATOR,
        count: comparatorCities.length,
    }

    return (
        <ComparatorContext.Provider value={value}>
            {children}
        </ComparatorContext.Provider>
    )
}

export function useComparator() {
    const context = useContext(ComparatorContext)
    if (!context) {
        throw new Error('useComparator deve essere usato dentro ComparatorProvider')
    }
    return context
}