import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import logo from './assets/logo.png';
import Home from './components/Home';
import Packages from './components/Packages';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import { getMe } from './api/auth';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Navbar indicator state
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navCenterRef = useRef(null);
  const linksRef = useRef({});

  // Tab mapping for indicator
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await getMe();
          setIsLoggedIn(true);
        } catch (err) {
          console.error('Session persistence error:', err);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const activeLink = linksRef.current[activeTab];
    if (activeLink && navCenterRef.current) {
      const { offsetLeft, offsetWidth } = activeLink;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
        opacity: 1
      });
    }
  }, [activeTab, currentView]);

  const handleScroll = (e) => {
    const scrollPos = e.target.scrollTop;

    // Scrolled state for navbar styling
    const isScrolled = scrollPos > 50;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }

    // Scroll spy logic for Home view
    if (currentView === 'home') {
      const sections = [
        { id: 'packages-section', tab: 'packages' },
        { id: 'faq-section', tab: 'faq' }
      ];

      let currentTab = 'home';

      // Check sections from bottom to top to find the active one
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offset = element.offsetTop - 200; // Activation threshold
          if (scrollPos >= offset) {
            currentTab = section.tab;
          }
        }
      }

      if (currentTab !== activeTab && activeTab !== 'support') {
        setActiveTab(currentTab);
      }
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
          <div className="nav-center" ref={navCenterRef} style={{ position: 'relative' }}>
            <div className="nav-indicator" style={indicatorStyle}></div>
            <button
              ref={el => linksRef.current['home'] = el}
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => {
                setCurrentView('home');
                setActiveTab('home');
                document.querySelector('.main-content-scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              ANASAYFA
            </button>
            <button
              ref={el => linksRef.current['packages'] = el}
              className={`nav-link ${activeTab === 'packages' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('packages');
                if (currentView !== 'home') setCurrentView('home');
                setTimeout(() => { document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' }); }, 100);
              }}
            >
              PAKETLER
            </button>
            <button
              ref={el => linksRef.current['faq'] = el}
              className={`nav-link ${activeTab === 'faq' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('faq');
                if (currentView !== 'home') setCurrentView('home');
                setTimeout(() => { document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' }); }, 100);
              }}
            >
              SSS
            </button>
            <button
              ref={el => linksRef.current['support'] = el}
              className={`nav-link ${activeTab === 'support' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('support');
                window.open('https://discord.gg/feedtools', '_blank');
              }}
            >
              DESTEK
            </button>
          </div>
          <div className="nav-right" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <button className="modern-button primary-button" style={{ padding: '10px 20px', fontSize: '14px' }} onClick={() => window.open('https://feedtools.app/download', '_blank')}>
                  UYGULAMAYI İNDİR
                </button>
                <button
                  className="modern-button secondary-button"
                  style={{ padding: '10px 20px', fontSize: '14px', background: 'transparent', border: '1px solid var(--border-color)', color: 'white' }}
                  onClick={() => {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    setCurrentView('home');
                  }}
                >
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
        <div key={currentView} className="page-transition-wrapper">
          {renderContent()}
        </div>
        {!isAuthView && <Footer />}
      </div>
    </div>
  );
}

export default App;
