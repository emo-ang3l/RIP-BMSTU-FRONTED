// src/App.tsx — ФИНАЛЬНАЯ РАБОЧАЯ ВЕРСИЯ ПОД ТВОЮ СТРУКТУРУ
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Header/index';
import { Home } from './pages/HomePage/index';
import { InsulatorsList } from './pages/UnitsListPage/index';
import { InsulatorDetail } from './pages/UnitPage/index';

function App() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '0 20px', backgroundColor: '#f7f7f7' }}>
        <Routes>
          <Route path="/RIP-BMSTU-FRONTED" element={<Navigate to="/RIP-BMSTU-FRONTED/home" replace />} />
          <Route path="/RIP-BMSTU-FRONTED/home" element={<Home />} />
          <Route path="/RIP-BMSTU-FRONTED/insulators" element={<InsulatorsList />} />
          <Route path="/RIP-BMSTU-FRONTED/insulators/:id" element={<InsulatorDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;