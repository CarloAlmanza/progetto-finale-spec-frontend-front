import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

// Chiave per localStorage (evita typo in giro)
const STORAGE_KEY = 'citycompare_favorites'

export function FavoritesProvider({ children }) {
    // 1. Stato iniziale: leggo da localStorage (se c'è)
    // Uso una funzione in useState per evitare di leggere localStorage a ogni render
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            return saved ? JSON.parse(saved) : []
        } catch (err) {
            console.error('Errore lettura preferiti:', err)
            return []
        }
    })

    // 2. Ogni volta che favorites cambia, salvo in localStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
        } catch (err) {
            console.error('Errore salvataggio preferiti:', err)
        }
    }, [favorites])

    // Aggiunge una città ai preferiti (evita duplicati)
    function addFavorite(city) {
        setFavorites(prev => {
            if (prev.some(c => c.id === city.id)) return prev
            return [...prev, city]
        })
    }

    // Rimuove una città dai preferiti
    function removeFavorite(cityId) {
        setFavorites(prev => prev.filter(c => c.id !== cityId))
    }

    // Toggle: se è già preferito lo rimuove, altrimenti lo aggiunge
    function toggleFavorite(city) {
        if (isFavorite(city.id)) {
            removeFavorite(city.id)
        } else {
            addFavorite(city)
        }
    }

    // Verifica se una città è nei preferiti
    function isFavorite(cityId) {
        return favorites.some(c => c.id === cityId)
    }

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        count: favorites.length,
    }

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error('useFavorites deve essere usato dentro FavoritesProvider')
    }
    return context
}