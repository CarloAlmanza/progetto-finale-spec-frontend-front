import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CityList from './pages/CityList'
import CityDetail from './pages/CityDetail'
import Comparator from './pages/Comparator'
import Favorites from './pages/Favorites'

function App() {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cities" element={<CityList />} />
          <Route path="/cities/:id" element={<CityDetail />} />
          <Route path="/comparator" element={<Comparator />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </>
  )
}

export default App

