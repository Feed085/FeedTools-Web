import React, { useState } from 'react';
import './index.css';
import logo from './assets/logo.png';
import Home from './components/Home';
import Packages from './components/Packages';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleScroll = (e) => {
    if (e.target.scrollTop > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <Home />;
      case 'packages': return <Packages />;
      case 'gallery': return <Gallery />;
      case 'login': return <Login setIsLoggedIn={setIsLoggedIn} setCurrentView={setCurrentView} />;
      case 'register': return <Register setCurrentView={setCurrentView} />;
      case 'forgotPassword': return <ForgotPassword setCurrentView={setCurrentView} />;
      default: return <Home />;
    }
  };

  const isAuthView = currentView === 'login' || currentView === 'register' || currentView === 'forgotPassword';

  return (
    <div className="app-container">
      {!isAuthView && (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <div className="nav-left">
            <img src={logo} alt="Logo" className="nav-logo" />
            <span className="nav-brand">FEEDTOOLS</span>
          </div>
          <div className="nav-center">
            <button className={`nav-link ${currentView === 'home' ? 'active' : ''}`} onClick={() => setCurrentView('home')}>ANASAYFA</button>
            <button className="nav-link" onClick={() => {
              if (currentView !== 'home') setCurrentView('home');
              setTimeout(() => { document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' }); }, 100);
            }}>PAKETLER</button>
            <button className={`nav-link ${currentView === 'gallery' ? 'active' : ''}`} onClick={() => setCurrentView('gallery')}>GALERİ</button>
            <button className="nav-link" onClick={() => window.open('https://discord.gg/feedtools', '_blank')}>DESTEK</button>
          </div>
          <div className="nav-right" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <button className="modern-button primary-button" style={{ padding: '10px 20px', fontSize: '14px' }} onClick={() => window.open('https://feedtools.app/download', '_blank')}>
                  UYGULAMAYI İNDİR
                </button>
                <button className="modern-button secondary-button" style={{ padding: '10px 20px', fontSize: '14px', background: 'transparent', border: '1px solid var(--border-color)', color: 'white' }} onClick={() => setIsLoggedIn(false)}>
                  ÇIKIŞ YAP
                </button>
              </>
            ) : (
              <>
                <button className="nav-link" onClick={() => setCurrentView('login')} style={{ padding: '10px 20px', fontSize: '14px', margin: 0 }}>
                  GİRİŞ YAP
                </button>
                <button className="modern-button primary-button" style={{ padding: '10px 20px', fontSize: '14px' }} onClick={() => setCurrentView('register')}>
                  KAYIT OL
                </button>
              </>
            )}
          </div>
        </nav>
      )}

      <div
        className="main-content-scroll"
        onScroll={handleScroll}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', scrollBehavior: 'smooth' }}
      >
        {renderContent()}
        {!isAuthView && <Footer />}
      </div>
    </div>
  );
}

export default App;
