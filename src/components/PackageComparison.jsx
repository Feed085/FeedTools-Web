import React from 'react';

// Inline Icons for simplicity and performance without extra dependencies
const IconCheck = ({ size = 20, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const IconMinus = ({ size = 20, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const IconInfo = ({ size = 20, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);

const IconClock = ({ size = 20, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const IconShield = ({ size = 20, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);

const IconStar = ({ size = 20, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

const IconPackage = ({ size = 20, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
);

const PackageComparison = () => {
    // Define plan data
    const plans = [
        {
            id: 1,
            name: "1 AYLIK",
            subbox: "Başlangıç Paketi",
            isPopular: false,
            isPremium: false,
            features: {
                duration: "30 Gün",
                games: true,
                patch: true,
                bypass: false,
                denuvo: false,
                role: true,
                support: false
            }
        },
        {
            id: 2,
            name: "3 AYLIK",
            subbox: "Popüler Seçim",
            isPopular: true,
            isPremium: false,
            features: {
                duration: "90 Gün",
                games: true,
                patch: true,
                bypass: true,
                denuvo: false,
                role: true,
                support: false
            }
        },
        {
            id: 3,
            name: "12 AYLIK",
            subbox: "Uzun Vadeli",
            isPopular: false,
            isPremium: false,
            features: {
                duration: "365 Gün",
                games: true,
                patch: true,
                bypass: true,
                denuvo: true,
                role: true,
                support: false
            }
        },
        {
            id: 4,
            name: "SINIRSIZ",
            subbox: "Ömür Boyu",
            isPopular: false,
            isPremium: true,
            features: {
                duration: "Sınırsız",
                games: true,
                patch: true,
                bypass: true,
                denuvo: true,
                role: true,
                support: true
            }
        }
    ];

    const FeatureRow = ({ label, plans, field, type, hasInfo }) => {
        return (
            <div className="grid-row">
                <div className="grid-cell feature-name">
                    {label}
                    {hasInfo && <IconInfo size={14} className="info-icon" style={{ marginLeft: 6, opacity: 0.5 }} />}
                </div>
                {plans.map(plan => (
                    <div key={plan.id} className={`grid-cell plan-cell ${plan.isPopular ? 'popular-cell' : ''} ${plan.isPremium ? 'premium-cell' : ''}`}>
                        {type === 'check'
                            ? (plan.features[field]
                                ? <IconCheck size={20} className="check-icon" style={{ color: '#06b6d4' }} />
                                : <IconMinus size={20} className="minus-icon" style={{ color: '#ef4444', opacity: 0.5 }} />)
                            : <span className="text-value">{plan.features[field]}</span>
                        }
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div id="packages-section" className="package-comparison-section">
            <div className="pkg-container">
                <div className="pkg-header">
                    <span className="pkg-badge">ABONELİK SEÇENEKLERİ</span>
                    <h2 className="pkg-title">Paket <span className="highlight">Karşılaştırması</span></h2>
                    <p className="pkg-subtitle">İhtiyaçlarınıza en uygun planı seçin ve oyun dünyasının sınırlarını kaldırın.</p>
                </div>

                <div className="comparison-table-wrapper">
                    <div className="comparison-grid">
                        {/* Header Row */}
                        <div className="grid-header-row">
                            <div className="grid-cell feature-header">ÖZELLİKLER</div>
                            {plans.map(plan => (
                                <div key={plan.id} className={`grid-cell plan-header ${plan.isPopular ? 'popular' : ''} ${plan.isPremium ? 'premium' : ''}`}>
                                    <div className="plan-name">{plan.name}</div>
                                    <div className="plan-sub">{plan.subbox}</div>
                                </div>
                            ))}
                        </div>

                        {/* Section: Temel Özellikler */}
                        {/* Using a pseudo-row for section title that spans all columns if grid layout allows, or just a separate block */}

                        <div className="section-divider">
                            <div className="section-title">
                                <IconClock size={16} className="section-icon" style={{ marginRight: 8 }} /> TEMEL ÖZELLİKLER
                            </div>
                        </div>

                        <FeatureRow label="Erişim Süresi" plans={plans} field="duration" />
                        <FeatureRow label="Oyun & DLC Ekleme" plans={plans} field="games" type="check" />
                        <FeatureRow label="Online Yama Desteği" plans={plans} field="patch" type="check" />

                        {/* Section: Özel Erişim */}
                        <div className="section-divider">
                            <div className="section-title">
                                <IconShield size={16} className="section-icon" style={{ marginRight: 8 }} /> ÖZEL ERİŞİM
                            </div>
                        </div>

                        <FeatureRow label="Bypass Desteği" plans={plans} field="bypass" type="check" hasInfo />
                        <FeatureRow label="Denuvo Korumalı Oyun" plans={plans} field="denuvo" type="check" hasInfo />

                        {/* Section: Ayrıcalıklar */}
                        <div className="section-divider">
                            <div className="section-title">
                                <IconStar size={16} className="section-icon" style={{ marginRight: 8 }} /> AYRICALIKLAR
                            </div>
                        </div>

                        <FeatureRow label="Özel Discord Rolü" plans={plans} field="role" type="check" />
                        <FeatureRow label="Sınırsız Destek" plans={plans} field="support" type="check" />

                        {/* Footer Buttons */}
                        <div className="grid-footer-row">
                            <div className="grid-cell feature-col"></div>
                            {plans.map(plan => (
                                <div key={plan.id} className="grid-cell plan-footer">
                                    <button className={`buy-btn ${plan.isPopular ? 'popular-btn' : ''} ${plan.isPremium ? 'premium-btn' : ''}`}>
                                        <IconPackage size={16} className="btn-icon" style={{ marginRight: 6 }} /> SATIN AL
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                <p className="pkg-disclaimer">
                    * Fiyatlandırma ve özellikler değişiklik gösterebilir. Sınırsız paket ömür boyu erişim sağlar.
                </p>
            </div>
        </div>
    );
};

export default PackageComparison;
