import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Componente che riporta lo scroll in cima ad ogni cambio di rotta.
 * Non renderizza nulla (ritorna null).
 */
function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

export default ScrollToTop