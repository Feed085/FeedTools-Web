import React, { useState } from 'react';
import './index.css';
import logo from './assets/logo.png';
import Home from './components/Home';
import Packages from './components/Packages';
import Gallery from './components/Gallery';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <Home />;
      case 'packages': return <Packages />;
      case 'gallery': return <Gallery />;
      default: return <Home />;
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="Logo" className="nav-logo" />
          <span className="nav-brand">FEEDTOOLS</span>
        </div>
        <div className="nav-center">
          <button className={`nav-link ${currentView === 'home' ? 'active' : ''}`} onClick={() => setCurrentView('home')}>ANASAYFA</button>
          <button className={`nav-link ${currentView === 'packages' ? 'active' : ''}`} onClick={() => setCurrentView('packages')}>PAKETLER</button>
          <button className={`nav-link ${currentView === 'gallery' ? 'active' : ''}`} onClick={() => setCurrentView('gallery')}>GALERİ</button>
          <button className="nav-link" onClick={() => window.open('https://discord.gg/feedtools', '_blank')}>DESTEK</button>
        </div>
        <div className="nav-right">
          <button className="modern-button primary-button" style={{ padding: '10px 20px', fontSize: '14px' }} onClick={() => alert('Download App')}>
            UYGULAMAYI İNDİR
          </button>
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
