import { useState, useEffect } from 'react'

/**
 * Hook che restituisce un valore "ritardato" (debounced).
 * Il valore restituito si aggiorna solo dopo `delay` ms dall'ultimo cambio.
 * 
 * @param {any} value - Il valore da debouncare
 * @param {number} delay - Millisecondi di attesa (default: 300)
 * @returns {any} Il valore debounced
 */
export function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        // Imposta un timer che aggiorna il valore dopo `delay` ms
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        // Cleanup: se `value` cambia prima del delay, cancella il timer precedente
        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
}