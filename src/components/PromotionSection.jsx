import React from 'react';
import { LibraryIcon, SupportIcon, SecurityIcon } from './FeatureIcons';
import VideoCameraIcon from './VideoCameraIcon';

const PromotionSection = () => {
    return (
        <div className="promotion-section" id="promotion-section">
            <div className="promo-container">
                <div className="promo-header">
                    <span className="promo-badge">
                        <VideoCameraIcon size={20} color="white" style={{ marginRight: '4px' }} />
                        PLATFORM TANITIMI
                    </span>
                    <h2 className="promo-title">FeedTools'un <span className="highlight">Gücünü Keşfet</span></h2>
                    <p className="promo-subtitle">
                        FeedTools platformunun nasıl çalıştığını ve tüm harika özelliklerini video aracılığıyla öğrenin
                    </p>
                </div>

                <div className="promo-content">
                    <div className="promo-video-wrapper">
                        <div className="video-card">
                            <div className="video-overlay-play">
                                <div className="play-button">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="video-background-placeholder">
                                {/* Gradient or subtle animation */}
                                <div className="animated-shapes"></div>
                            </div>
                        </div>
                    </div>

                    <div className="promo-features">
                        <FeatureItem
                            icon={<LibraryIcon size={24} color="#60a5fa" />}
                            title="Geniş Steam Kütüphanesi"
                            desc="35.000+ oyunla Steam'in en geniş koleksiyonuna erişim sağla. Her türden oyun bulabilirsin."
                            color="blue"
                        />
                        <FeatureItem
                            icon={<SupportIcon size={24} color="#34d399" />}
                            title="7/24 Destek"
                            desc="Sorun mu yaşadın? 24 saat çalışan destek ekibimiz her zaman sana yardımcı olmaya hazır."
                            color="green"

                        />
                        <FeatureItem
                            icon={<SecurityIcon size={24} color="#fbbf24" />}
                            title="Hızlı ve Güvenli"
                            desc="Oyunları saniyeler içinde indir ve oynat. Güvenli sunucularımız tüm verilerinizi korur."
                            color="yellow"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureItem = ({ icon, title, desc, color }) => (
    <div className={`feature-item feature-${color}`}>
        <div className="feature-icon-wrapper">
            {icon}
        </div>
        <div className="feature-text">
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    </div>
);

export default PromotionSection;
