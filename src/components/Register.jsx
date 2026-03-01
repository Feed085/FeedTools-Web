import React, { useState, useEffect } from 'react';
import logo from '../assets/gamonk_logo.png';
import './Auth.css';

// Import local images from the application
import heroImg1 from '../assets/loginheroslider/logHeroSlide1.jpeg';
import heroImg2 from '../assets/loginheroslider/logHeroSlide2.jpeg';
import heroImg3 from '../assets/loginheroslider/logHeroSlide3.jpeg';
import heroImg4 from '../assets/loginheroslider/logHeroSlide4.jpeg';
import heroImg5 from '../assets/loginheroslider/logHeroSlide5.jpeg';
import { register, verifyCode, resendOtpCode } from '../api/auth';

const sliderData = [
    { img: heroImg1, colors: ['rgba(14, 116, 144, 0.8)', 'rgba(30, 58, 138, 0.8)', 'rgba(245, 158, 11, 0.6)'] },
    { img: heroImg2, colors: ['rgba(239, 68, 68, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(14, 165, 233, 0.6)'] },
    { img: heroImg3, colors: ['rgba(34, 197, 94, 0.75)', 'rgba(59, 130, 246, 0.75)', 'rgba(245, 158, 11, 0.65)'] },
    { img: heroImg4, colors: ['rgba(234, 88, 12, 0.8)', 'rgba(153, 27, 27, 0.75)', 'rgba(202, 138, 4, 0.6)'] },
    { img: heroImg5, colors: ['rgba(22, 101, 52, 0.7)', 'rgba(100, 116, 139, 0.7)', 'rgba(255, 255, 255, 0.4)'] }
];

const Register = ({ setCurrentView, showNotification }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState(1); // 1: Register, 2: OTP
    const [otp, setOtp] = useState('');

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
            const data = await register({ username, email, password });
            if (data.success) {
                setStep(2);
                showNotification("Kayıt başarılı! Doğrulama kodu e-postanıza gönderildi.", "success");
            } else {
                setError(data.error || 'Kayıt başarısız.');
                showNotification(data.error || 'Kayıt başarısız.', "error");
            }
        } catch (err) {
            console.error('Registration error:', err);
            const errorMsg = err.response?.data?.error ||
                err.response?.data?.message ||
                (err.response?.data?.errors && err.response?.data?.errors[0]?.msg) ||
                'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.';
            showNotification(errorMsg, "error");
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await verifyCode(email, otp);
            if (data.token) {
                localStorage.setItem('token', data.token);
                // Note: Register usually leads to Login or Home. 
                // Based on Login.jsx, we set token and go to Home.
                alert("E-posta doğrulandı! Hoş geldiniz.");
                window.location.reload(); // Simple way to refresh app state
            } else {
                setError('Geçersiz kod.');
                showNotification('Geçersiz kod.', "error");
            }
        } catch (err) {
            console.error('OTP error:', err);
            const errorMsg = err.response?.data?.error || 'Doğrulama başarısız.';
            setError(errorMsg);
            showNotification(errorMsg, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setError('');
        setLoading(true);
        try {
            const data = await resendOtpCode(email);
            if (data.success) {
                showNotification("Doğrulama kodu tekrar gönderildi.", "success");
            }
        } catch (err) {
            console.error('Resend error:', err);
            const errorMsg = err.response?.data?.error || 'Kod gönderilemedi.';
            setError(errorMsg);
            showNotification(errorMsg, "error");
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
                            alt="Gamonk Showcase"
                            className={`auth-slider-img ${idx === currentSlide ? 'active' : ''}`}
                        />
                    ))}
                    <div className="auth-slider-overlay">
                    </div>
                </div>

                {/* Right Side: Register Form */}
                <div className="auth-form-container">
                    {/* Logo Removed */}

                    <h2 className="auth-form-title">{step === 1 ? 'Kayıt Ol' : 'Kodu Doğrula'}</h2>
                    <p className="auth-form-subtitle">
                        {step === 1
                            ? 'Aramıza katıl ve ayrıcalıklardan hemen faydalanmaya başla!'
                            : `Lütfen ${email} adresine gönderilen 6 haneli doğrulama kodunu girin.`}
                    </p>

                    {step === 1 ? (
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
                    ) : (
                        <form onSubmit={handleVerifyOTP}>
                            {error && <div className="auth-error-message" style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
                            <div className="auth-form-group">
                                <label>Doğrulama Kodu</label>
                                <input
                                    type="text"
                                    className="auth-input"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 6))}
                                    placeholder="000000"
                                    maxLength={6}
                                    style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px', fontWeight: 'bold' }}
                                    required
                                    disabled={loading}
                                />
                                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '8px', textAlign: 'center' }}>
                                    Kodun geçerlilik süresi 10 dakikadır.
                                </p>
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? 'DOĞRULANIYOR...' : 'KODU ONAYLA'}
                            </button>

                            <div style={{ textAlign: 'center', marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <span className="auth-switch-link" style={{ fontSize: '13px', color: 'var(--accent-primary)' }} onClick={handleResendOTP}>
                                    Yeniden Kod Gönder
                                </span>
                                <span className="auth-switch-link" style={{ fontSize: '13px' }} onClick={() => setStep(1)}>
                                    Bilgilerimi Değiştir
                                </span>
                            </div>
                        </form>
                    )}

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
