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

const sliderData = [
    { img: spidermanImg, colors: ['rgba(239, 68, 68, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(14, 165, 233, 0.6)'] }, // Spiderman: Vibrant Red, Deep Blue, Light Blue
    { img: gtaImg, colors: ['rgba(34, 197, 94, 0.75)', 'rgba(59, 130, 246, 0.75)', 'rgba(245, 158, 11, 0.65)'] }, // GTA V: Bright Green, Sky Blue, Sunset Orange
    { img: tlouImg, colors: ['rgba(22, 101, 52, 0.7)', 'rgba(100, 116, 139, 0.7)', 'rgba(255, 255, 255, 0.4)'] }, // TLOU2: Forest Green, Muted Gray, White Fog
    { img: re4Img, colors: ['rgba(234, 88, 12, 0.8)', 'rgba(153, 27, 27, 0.75)', 'rgba(202, 138, 4, 0.6)'] }, // RE4: Fire Orange, Blood Red, Eerie Yellow
    { img: unchartedImg, colors: ['rgba(14, 116, 144, 0.8)', 'rgba(30, 58, 138, 0.8)', 'rgba(245, 158, 11, 0.6)'] }, // Uncharted: Bright Ocean Teal, Deep Blue, Sunlight Gold
    { img: fifaImg, colors: ['rgba(34, 197, 94, 0.8)', 'rgba(2, 132, 199, 0.8)', 'rgba(255, 255, 255, 0.5)'] } // FIFA: Pitch Green, Electric Blue, Stadium White
];

const ForgotPassword = ({ setCurrentView }) => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState(1);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [alertConfig, setAlertConfig] = useState({ isOpen: false, type: 'success', title: '', message: '', onClose: null });

    const showAlert = (type, title, message, onClose = null) => {
        setAlertConfig({ isOpen: true, type, title, message, onClose });
    };

    const closeAlert = () => {
        const { onClose } = alertConfig;
        setAlertConfig({ ...alertConfig, isOpen: false });
        if (onClose) onClose();
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleReset = (e) => {
        e.preventDefault();
        if (email) {
            setStep(2);
        } else {
            showAlert('error', 'Hata', 'Lütfen e-posta adresinizi girin.');
        }
    };

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        if (code.length === 6) {
            setStep(3);
        } else {
            showAlert('error', 'Hata', 'Lütfen 6 haneli kodu eksiksiz girin.');
        }
    };

    const handlePasswordReset = (e) => {
        e.preventDefault();
        if (newPassword && confirmPassword) {
            if (newPassword === confirmPassword) {
                showAlert('success', 'Başarılı!', 'Şifreniz başarıyla değiştirildi! Yeni şifrenizle giriş yapabilirsiniz.', () => {
                    setCurrentView('login');
                });
            } else {
                showAlert('error', 'Hata', 'Girdiğiniz şifreler eşleşmiyor!');
            }
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

                {/* Right Side: Forgot Password Form */}
                <div className="auth-form-container">

                    <h2 className="auth-form-title">Şifremi Unuttum</h2>

                    {step === 1 && (
                        <div key="step1" className="step-container">
                            <p className="auth-form-subtitle">Parolanızı sıfırlamak için hesabınıza kayıtlı e-posta adresini girin.</p>
                            <form onSubmit={handleReset}>
                                <div className="auth-form-group">
                                    <label>E-posta Adresi</label>
                                    <input
                                        type="email"
                                        className="auth-input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="ornek@email.com"
                                        required
                                    />
                                </div>

                                <button type="submit" className="auth-submit-btn">
                                    KOD GÖNDER
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <div key="step2" className="step-container">
                            <p className="auth-form-subtitle">Lütfen <strong>{email}</strong> adresine gönderdiğimiz 6 haneli doğrulama kodunu girin.</p>
                            <form onSubmit={handleCodeSubmit}>
                                <div className="auth-form-group">
                                    <label>Doğrulama Kodu</label>
                                    <input
                                        type="text"
                                        className="auth-input"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                        placeholder="000000"
                                        maxLength={6}
                                        style={{ letterSpacing: '12px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}
                                        required
                                    />
                                </div>

                                <button type="submit" className="auth-submit-btn">
                                    KODU ONAYLA
                                </button>
                            </form>
                            <div style={{ textAlign: 'center', marginTop: '15px' }}>
                                <span className="auth-switch-link" style={{ fontSize: '13px', fontWeight: 'normal', color: 'var(--text-secondary)', marginRight: '12px' }} onClick={() => showAlert('success', 'Kod Gönderildi', 'Yeni doğrulama kodu kayıtlı e-posta adresinize gönderildi.')}>
                                    Yeniden kod gönder
                                </span>
                                <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '13px' }}>|</span>
                                <span className="auth-switch-link" style={{ fontSize: '13px', fontWeight: 'normal', color: 'var(--text-secondary)', marginLeft: '12px' }} onClick={() => setStep(1)}>
                                    E-posta değiştir
                                </span>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div key="step3" className="step-container">
                            <p className="auth-form-subtitle">Lütfen hesabınız için yeni bir şifre belirleyin.</p>
                            <form onSubmit={handlePasswordReset}>
                                <div className="auth-form-group">
                                    <label>Yeni Şifre</label>
                                    <input
                                        type="password"
                                        className="auth-input"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                        required
                                    />
                                </div>
                                <div className="auth-form-group">
                                    <label>Yeni Şifre (Tekrar)</label>
                                    <input
                                        type="password"
                                        className="auth-input"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                        required
                                    />
                                </div>

                                <button type="submit" className="auth-submit-btn">
                                    ŞİFREYİ YENİLE
                                </button>
                            </form>
                        </div>
                    )}

                    <p className="auth-switch-text">
                        Şifrenizi hatırladınız mı?
                        <span className="auth-switch-link" onClick={() => setCurrentView('login')}>
                            Giriş Yap
                        </span>
                    </p>
                </div>
            </div>

            {/* Custom Alert Modal */}
            {alertConfig.isOpen && (
                <div className="auth-custom-alert-overlay">
                    <div className="auth-custom-alert-box">
                        <div className={`auth-alert-icon ${alertConfig.type}`}>
                            {alertConfig.type === 'success' ? (
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            ) : (
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            )}
                        </div>
                        <h3 className="auth-custom-alert-title">{alertConfig.title}</h3>
                        <p className="auth-custom-alert-message">{alertConfig.message}</p>
                        <button className="auth-custom-alert-btn" onClick={closeAlert}>
                            Tamam
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
