import React, { useState } from 'react';

// Inline Icons
const IconZoomIn = ({ size = 24, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <line x1="11" y1="8" x2="11" y2="14"></line>
        <line x1="8" y1="11" x2="14" y2="11"></line>
    </svg>
);

const IconX = ({ size = 24, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const AppShowcase = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const showcaseData = [
        {
            id: 1,
            title: "Anasayfa",
            desc: "FeedTools'un modern ve kullanıcı dostu arayüzü sizi karşılıyor. Tüm oyunları kolaylıkla keşfedebilir, favorilerinize ekleyebilirsiniz.",
            // Using placeholder images that look like UI screenshots
            image: "https://placehold.co/800x500/0f172a/3b82f6?text=Anasayfa+Arayuz"
        },
        {
            id: 2,
            title: "Kütüphane",
            desc: "Eklediğiniz tüm oyunları bir yerde görüntüleyin. İstediğiniz oyunu direkt oynatabilir, istemediklerinizi gizleyebilirsiniz.",
            image: "https://placehold.co/800x500/0f172a/3b82f6?text=Kutuphane"
        },
        {
            id: 3,
            title: "Oyun Detayları",
            desc: "Her oyunun detaylı bilgilerine bakın. DLC'leri ekleyip düzenleyebilir, online oyunlar için otomatik yama kurabilirsiniz.",
            image: "https://placehold.co/800x500/0f172a/3b82f6?text=Oyun+Detaylari"
        },
        {
            id: 4,
            title: "Bypass Sistemi",
            desc: "Aynı launcher ile açılan oyunların launcher'larını bypass'layarak sorunsuz oynayın. Tek tıkla otomatik işlem.",
            image: "https://placehold.co/800x500/0f172a/3b82f6?text=Bypass+Sistemi"
        }
    ];

    const openModal = (item) => {
        setSelectedImage(item);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    return (
        <div className="app-showcase-section">
            <div className="showcase-container">
                <div className="showcase-header">
                    <h2 className="showcase-title">Uygulamayı <span className="highlight">Keşfet</span></h2>
                    <p className="showcase-subtitle">FeedTools'un güçlü arayüzünü yakından tanıyın</p>
                </div>

                <div className="showcase-grid">
                    {showcaseData.map((item) => (
                        <div key={item.id} className="showcase-card" onClick={() => openModal(item)}>
                            <div className="card-image-wrapper">
                                <img src={item.image} alt={item.title} className="card-image" />
                                <div className="card-overlay">
                                    <IconZoomIn size={32} className="zoom-icon" />
                                </div>
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{item.title}</h3>
                                <p className="card-desc">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox-overlay" onClick={closeModal}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeModal}>
                            <IconX size={24} />
                        </button>
                        <img src={selectedImage.image} alt={selectedImage.title} className="lightbox-image" />
                        <div className="lightbox-details">
                            <h3>{selectedImage.title}</h3>
                            <p>{selectedImage.desc}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppShowcase;
