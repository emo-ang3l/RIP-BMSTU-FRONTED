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
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/insulators" element={<InsulatorsList />} />
          <Route path="/insulators/:id" element={<InsulatorDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;