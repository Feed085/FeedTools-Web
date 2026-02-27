import React from 'react';
import { LibraryIcon, SupportIcon, SecurityIcon } from './FeatureIcons';
import VideoCameraIcon from './VideoCameraIcon';
import { useLanguage } from '../LanguageContext';

const PromotionSection = () => {
    const { t } = useLanguage();
    return (
        <div className="promotion-section" id="promotion-section">
            <div className="promo-container">
                <div className="promo-header">
                    <span className="promo-badge">
                        <VideoCameraIcon size={20} color="white" style={{ marginRight: '4px' }} />
                        {t('promo', 'badge')}
                    </span>
                    <h2 className="promo-title">{t('promo', 'title')}</h2>
                    <p className="promo-subtitle">
                        {t('promo', 'subtitle')}
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
                            title={t('promo', 'feature1')}
                            desc={t('promo', 'feature1_desc')}
                            color="blue"
                        />
                        <FeatureItem
                            icon={<SupportIcon size={24} color="#34d399" />}
                            title={t('promo', 'feature3')}
                            desc={t('promo', 'feature3_desc')}
                            color="green"

                        />
                        <FeatureItem
                            icon={<SecurityIcon size={24} color="#fbbf24" />}
                            title={t('promo', 'feature2')}
                            desc={t('promo', 'feature2_desc')}
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
