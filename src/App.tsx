// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { InsulatorsList } from './pages/InsulatorsList';
import { InsulatorDetail } from './pages/InsulatorDetail';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: '0 20px',  backgroundColor: '#f7f7f7' }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/insulators" element={<InsulatorsList />} />
          <Route path="/insulators/:id" element={<InsulatorDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;