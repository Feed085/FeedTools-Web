import React from 'react';

const IconStar = ({ size = 16, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>
);

const IconVerified = ({ size = 16, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#3b82f6" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
    </svg>
);

const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            user: "b****0",
            date: "20.11.2025",
            rating: 5,
            comment: "Süper uygulama, kesinlikle tavsiye ediyorum."
        },
        {
            id: 2,
            user: "e****n",
            date: "21.11.2025",
            rating: 5,
            comment: "Uygulama güzel ama daha da geliştirilebilir. Bende ufak tefek sorunlar çıktı, hemen destekle çözdük."
        },
        {
            id: 3,
            user: "s*e**",
            date: "29.11.2025",
            rating: 5,
            comment: "Abicim 10 numara mal."
        },
        {
            id: 4,
            user: "g***ü",
            date: "29.11.2025",
            rating: 5,
            comment: "Çok güzel uygulama yapmışsınız. İyi günler"
        },
        {
            id: 5,
            user: "s***e",
            date: "30.11.2025",
            rating: 5,
            comment: "@gamonkStudio RE4 denuvo konusunda yardımcı oldular, adamlar yapıyor bu sporu."
        },
        {
            id: 6,
            user: "m*****z",
            date: "30.11.2025",
            rating: 5,
            comment: "@gamonkStudio Bu adamlar Türk uygulama yapmış, destek verin. Süper!"
        }
    ];

    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <h2 className="testimonials-title">Müşteri <span className="highlight">Yorumları</span></h2>
                    <p className="testimonials-subtitle">Yüzlerce memnun kullanıcının Gamonk hakkındaki gerçek deneyimleri</p>
                </div>

                <div className="testimonials-grid">
                    {reviews.map((review) => (
                        <div key={review.id} className="testimonial-card">
                            <div className="testimonial-card-header">
                                <div className="user-info-row">
                                    <div className="user-name">
                                        {review.user}
                                        <IconVerified className="verified-badge" />
                                    </div>
                                    <div className="star-rating">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <IconStar key={i} className="star-icon" />
                                        ))}
                                    </div>
                                </div>
                                <div className="review-date">{review.date}</div>
                            </div>
                            <div className="testimonial-content">
                                {review.comment.split(' ').map((word, i) => (
                                    word.startsWith('@') ?
                                        <span key={i} className="mention">{word} </span> :
                                        <span key={i}>{word} </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="testimonials-footer">
                    <button className="modern-button secondary-button" onClick={() => window.open('https://discord.gg/gamonk', '_blank')}>
                        TÜM YORUMLARI GÖR
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
