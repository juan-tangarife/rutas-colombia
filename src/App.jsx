import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import es_ES from 'antd/lib/locale/es_ES';
import './App.css';
const HomePage = lazy(() => import('./pages/HomePage'));
const RoutePage = lazy(() => import('./pages/RoutePage'));
function App() {
  return (
    <Router>
      <Suspense fallback={<div style={{ display: 'flex', justifyContent:
      'center', alignItems: 'center', height: '100vh' }}><Spin size="large"
      /></div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/route" element={<RoutePage />} />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
