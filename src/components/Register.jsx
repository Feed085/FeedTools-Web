import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import './Auth.css';

// Import local images from the application
import fifaImg from '../assets/loginheroslider/FIFA 26.jpg';
import gtaImg from '../assets/loginheroslider/GtaV.jpg';
import re4Img from '../assets/loginheroslider/RE4.jpg';
import spidermanImg from '../assets/loginheroslider/Spiderman2.jpeg';
import tlouImg from '../assets/loginheroslider/TLOU2.jpg';
import unchartedImg from '../assets/loginheroslider/Uncharted.jpg';
import { register } from '../api/auth';

const sliderData = [
    { img: tlouImg, colors: ['rgba(22, 101, 52, 0.7)', 'rgba(100, 116, 139, 0.7)', 'rgba(255, 255, 255, 0.4)'] }, // TLOU2: Forest Green, Muted Gray, White Fog
    { img: re4Img, colors: ['rgba(234, 88, 12, 0.8)', 'rgba(153, 27, 27, 0.75)', 'rgba(202, 138, 4, 0.6)'] }, // RE4: Fire Orange, Blood Red, Eerie Yellow
    { img: unchartedImg, colors: ['rgba(14, 116, 144, 0.8)', 'rgba(30, 58, 138, 0.8)', 'rgba(245, 158, 11, 0.6)'] }, // Uncharted: Bright Ocean Teal, Deep Blue, Sunlight Gold
    { img: fifaImg, colors: ['rgba(34, 197, 94, 0.8)', 'rgba(2, 132, 199, 0.8)', 'rgba(255, 255, 255, 0.5)'] }, // FIFA: Pitch Green, Electric Blue, Stadium White
    { img: gtaImg, colors: ['rgba(34, 197, 94, 0.75)', 'rgba(59, 130, 246, 0.75)', 'rgba(245, 158, 11, 0.65)'] }, // GTA V: Bright Green, Sky Blue, Sunset Orange
    { img: spidermanImg, colors: ['rgba(239, 68, 68, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(14, 165, 233, 0.6)'] } // Spiderman: Vibrant Red, Deep Blue, Light Blue
];

const Register = ({ setCurrentView }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register({ username, email, password });
            alert("Kayıt başarılı! Lütfen giriş yapın.");
            setCurrentView('login');
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.error || err.response?.data?.message || 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-container" style={{
            '--color1': sliderData[currentSlide].colors[0],
            '--color2': sliderData[currentSlide].colors[1],
            '--color3': sliderData[currentSlide].colors[2]
        }}>
            {/* Neon Background Effects */}
            <div className="auth-neon-bg">
                <div className="auth-neon-blob blue"></div>
                <div className="auth-neon-blob cyan"></div>
                <div className="auth-neon-blob purple"></div>
            </div>

            <button className="auth-back-btn" onClick={() => setCurrentView('home')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                Ana Sayfaya Dön
            </button>

            <div className="auth-box">
                {/* Left Side: Hero Slider */}
                <div className="auth-slider">
                    {sliderData.map((item, idx) => (
                        <img
                            key={idx}
                            src={item.img}
                            alt="FeedTools Showcase"
                            className={`auth-slider-img ${idx === currentSlide ? 'active' : ''}`}
                        />
                    ))}
                    <div className="auth-slider-overlay">
                    </div>
                </div>

                {/* Right Side: Register Form */}
                <div className="auth-form-container">
                    {/* Logo Removed */}

                    <h2 className="auth-form-title">Kayıt Ol</h2>
                    <p className="auth-form-subtitle">Aramıza katıl ve ayrıcalıklardan hemen faydalanmaya başla!</p>

                    <form onSubmit={handleRegister}>
                        {error && <div className="auth-error-message" style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
                        <div className="auth-form-group">
                            <label>Kullanıcı Adı</label>
                            <input
                                type="text"
                                className="auth-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="kullanici_adi"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="auth-form-group">
                            <label>E-posta Adresi</label>
                            <input
                                type="email"
                                className="auth-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ornek@email.com"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="auth-form-group">
                            <label>Şifre</label>
                            <input
                                type="password"
                                className="auth-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                required
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? 'KAYDEDİLİYOR...' : 'KAYIT OL'}
                        </button>
                    </form>

                    <p className="auth-switch-text">
                        Zaten hesabınız var mı?
                        <span className="auth-switch-link" onClick={() => setCurrentView('login')}>
                            Giriş Yap
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
