import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeView from './components/home/HomeView.jsx'
import CatalogoView from './components/catalogo/CatalogoView.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/productos" element={<CatalogoView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
