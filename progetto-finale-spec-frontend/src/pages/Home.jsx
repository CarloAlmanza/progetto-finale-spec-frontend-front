import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            {/* Hero section */}
            <div className="text-center py-5 mb-4 bg-light rounded shadow-sm">
                <h1 className="display-4 fw-bold">🌍 CityCompare</h1>
                <p className="lead text-muted mt-3">
                    Esplora, confronta e salva le tue città preferite.
                </p>
                <Link to="/cities" className="btn btn-primary btn-lg mt-3">
                    Inizia a esplorare →
                </Link>
            </div>

            {/* 3 card funzionalità */}
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card h-100 shadow-sm text-center">
                        <div className="card-body d-flex flex-column">
                            <div className="fs-1 mb-3">📋</div>
                            <h5 className="card-title">Sfoglia le città</h5>
                            <p className="card-text text-muted">
                                Cerca, filtra per categoria e ordina 18 città da tutto il mondo.
                            </p>
                            <Link to="/cities" className="btn btn-outline-primary mt-auto">
                                Vai alla lista
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 shadow-sm text-center">
                        <div className="card-body d-flex flex-column">
                            <div className="fs-1 mb-3">⚖️</div>
                            <h5 className="card-title">Confronta 2 città</h5>
                            <p className="card-text text-muted">
                                Metti due città una accanto all'altra e scopri le differenze a colpo d'occhio.
                            </p>
                            <Link to="/comparator" className="btn btn-outline-primary mt-auto">
                                Apri il comparatore
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 shadow-sm text-center">
                        <div className="card-body d-flex flex-column">
                            <div className="fs-1 mb-3">❤️</div>
                            <h5 className="card-title">Salva i preferiti</h5>
                            <p className="card-text text-muted">
                                Aggiungi le tue città preferite con un click.
                            </p>
                            <Link to="/favorites" className="btn btn-outline-primary mt-auto">
                                Vedi i preferiti
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer info */}
            <div className="text-center mt-5 text-muted small">
                <p>Progetto finale Boolean</p>
            </div>
        </div>
    )
}

export default Home