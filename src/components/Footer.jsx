import React, { useState } from 'react';
import logo from '../assets/logo.png';
import LegalModal from './LegalModal';

const Footer = () => {
    const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', content: null });

    const openPrivacy = (e) => {
        e.preventDefault();
        setModalConfig({
            isOpen: true,
            title: 'Gizlilik Politikası',
            content: (
                <div className="legal-text">
                    <p><strong>Son Güncelleme:</strong> 21 Şubat 2026</p>
                    <p>FeedTools olarak gizliliğinize önem veriyoruz. Bu politika, hizmetlerimizi kullanırken verilerinizin nasıl toplandığını açıklar.</p>

                    <h3>1. Toplanan Veriler</h3>
                    <p>Uygulamamızı kullandığınızda, size daha iyi hizmet sunabilmek adına yalnızca gerekli olan kullanıcı deneyimi verilerini ve gönüllü olarak paylaştığınız Discord bilgilerinizi (destek amaçlı) topluyoruz.</p>

                    <h3>2. Veri Kullanımı</h3>
                    <p>Topladığımız veriler sistem optimizasyonu, güvenlik güncellemeleri ve topluluk desteği sağlamak amacıyla kullanılır. Verileriniz asla üçüncü taraflara satılmaz.</p>

                    <h3>3. Çerezler</h3>
                    <p>Web sitemiz ve uygulamamız, oturum yönetimi ve tercihlerinizi hatırlamak için temel çerezler kullanmaktadır.</p>

                    <h3>4. Güvenlik</h3>
                    <p>Verileriniz endüstri standardı şifreleme yöntemleri ile korunmaktadır. Paylaşılan oyun kütüphaneleri ve bypass çözümleri tamamen şeffaf ve güvenli bir altyapı üzerinden sunulur.</p>
                </div>
            )
        });
    };

    const openTerms = (e) => {
        e.preventDefault();
        setModalConfig({
            isOpen: true,
            title: 'Kullanım Şartları',
            content: (
                <div className="legal-text">
                    <p><strong>Son Güncelleme:</strong> 21 Şubat 2026</p>
                    <p>FeedTools hizmetlerini kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.</p>

                    <h3>1. Hizmet Kullanımı</h3>
                    <p>Sunulan tüm araçlar ve rehberler eğitim ve deneyim paylaşımı amaçlıdır. Yazılımların kötüye kullanımı kullanıcının kendi sorumluluğundadır.</p>

                    <h3>2. Abonelik ve İade</h3>
                    <p>Aylık paketler dijital içerik kapsamına girdiğinden, içeriklere erişim sağlandıktan sonra cayma hakkı kapsamında iade yapılamamaktadır. Ancak teknik sorunlarda destek ekibimiz telafi sağlamaktadır.</p>

                    <h3>3. Hesap Güvenliği ve Cihaz Sınırı</h3>
                    <p>Discord üzerinden sağlanan erişim yetkileri kişiye özeldir ve sistemimiz <strong>yalnızca tek cihaz üzerinden kullanım</strong> prensibiyle çalışmaktadır. Hesapların arkadaşlarla paylaşılması veya aynı anda birden fazla cihazda kullanılması yasaktır. Bu kuralın ihlali durumunda abonelik askıya alınabilir.</p>

                    <h3>4. Sorumluluk Reddi</h3>
                    <p>FeedTools, oyun geliştiricilerinin yaptığı sistem güncellemeleri veya dış etkenlerden kaynaklanan geçici kesintilerden sorumlu tutulamaz. Ekibimiz her zaman en hızlı çözümü üretmek için çalışır.</p>
                </div>
            )
        });
    };

    const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

    return (
        <>
            <footer className="footer-section">
                <div className="footer-container">
                    <div className="footer-main">
                        {/* Brand Info */}
                        <div className="footer-brand-info">
                            <div className="footer-logo-row">
                                <img src={logo} alt="FeedTools Logo" className="footer-logo" />
                                <span className="footer-brand-name">FeedTools</span>
                            </div>
                            <p className="footer-description">
                                Güvenilir ve şeffaf oyun platformu. FeedTools ile en güncel oyun kütüphanelerine,
                                bypass çözümlerine ve topluluk destekli rehberlere saniyeler içinde erişin.
                                Sınırlarını bütçen belirlemesin, gönül rahatlığıyla oyna.
                            </p>
                        </div>


                        {/* Contact/Social */}
                        <div className="footer-links-group">
                            <h4 className="footer-group-title">Bize Ulaş</h4>
                            <div className="footer-social-row">
                                <a href="https://discord.gg/feedtools" target="_blank" rel="noreferrer" className="social-icon-btn discord" aria-label="Discord">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.23 10.23 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                    </svg>
                                </a>
                                <a href="https://youtube.com/@feedtools" target="_blank" rel="noreferrer" className="social-icon-btn youtube" aria-label="Youtube">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                                <div className="social-icon-btn instagram" aria-label="Instagram">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.01 4.01 0 1 1 0-8.02 4.01 4.01 0 0 1 0 8.02zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p className="footer-copyright">© 2026 FeedTools Tüm hakları saklıdır.</p>
                        <div className="footer-bottom-links">
                            <a href="#privacy" onClick={openPrivacy}>Gizlilik</a>
                            <a href="#terms" onClick={openTerms}>Kullanım Şartları</a>
                        </div>
                    </div>
                </div>
            </footer>

            <LegalModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                title={modalConfig.title}
                content={modalConfig.content}
            />
        </>
    );
};

export default Footer;
