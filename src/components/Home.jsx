import React, { useState, useEffect, Suspense, lazy } from 'react';
import ModernButton from './ModernButton';
import CompassIcon from './CompassIcon';
import PackagesIcon from './PackagesIcon';

// Lazy load heavy components
const PromotionSection = lazy(() => import('./PromotionSection'));
const PackageComparison = lazy(() => import('./PackageComparison'));
const AppShowcase = lazy(() => import('./AppShowcase'));
const Testimonials = lazy(() => import('./Testimonials'));

// Simple loading component
const LoadingFallback = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px', color: 'white' }}>
        Yükleniyor...
    </div>
);

const Home = () => {
    const videoRef = React.useRef(null);
    const heroRef = React.useRef(null);
    const [videoIndex, setVideoIndex] = useState(0);
    const videos = [
        '/videos/rdr2.mp4',
        '/videos/tlou.mp4',
        '/videos/gow.mp4'
    ];

    useEffect(() => {
        const options = {
            root: null, // use the viewport
            threshold: 0.1 // 10% visibility is enough to play
        };

        const callback = (entries) => {
            entries.forEach(entry => {
                if (videoRef.current) {
                    if (entry.isIntersecting) {
                        videoRef.current.play().catch(err => console.log("Video play failed:", err));
                    } else {
                        videoRef.current.pause();
                    }
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
        };
    }, [videoIndex]); // Re-observe when video element changes due to key

    const handleVideoEnd = () => {
        setVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const [currentText, setCurrentText] = useState('');
    const [titleIndex, setTitleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const titles = ["Sınırsız Eğlence", "Hızlı Kurulum", "Geniş Kütüphane", "FeedTools Güvencesiyle"];

    useEffect(() => {
        const type = () => {
            const currentTitle = titles[titleIndex];

            if (!isDeleting && currentText === currentTitle) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setTitleIndex((prev) => (prev + 1) % titles.length);
            } else {
                const nextText = isDeleting
                    ? currentTitle.substring(0, currentText.length - 1)
                    : currentTitle.substring(0, currentText.length + 1);
                setCurrentText(nextText);
            }
        };

        const timer = setTimeout(type, isDeleting ? 50 : 150);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, titleIndex]);

    const scrollToPromotion = () => {
        const element = document.getElementById('promotion-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="landing-page" ref={heroRef}>
                <div className="video-background">
                    <video
                        ref={videoRef}
                        key={videos[videoIndex]}
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoEnd}
                        className="bg-video"
                        onCanPlay={(e) => {
                            // Only play if the element is currently visible
                            const isVisible = heroRef.current &&
                                heroRef.current.getBoundingClientRect().bottom > 0 &&
                                heroRef.current.getBoundingClientRect().top < window.innerHeight;
                            if (isVisible) {
                                e.target.play().catch(err => console.log("Video auto-play failed:", err));
                            } else {
                                e.target.pause();
                            }
                        }}
                        width="100%"
                        height="100%"
                        preload="auto"
                    >
                        <source src={videos[videoIndex]} type="video/mp4" />
                    </video>
                    <div className="video-overlay"></div>
                </div>

                <div className="hero-section">
                    <div className="hero-badge">
                        <span className="hero-badge-dot"></span>
                        <span className="hero-badge-text">{currentText}</span>
                    </div>
                    <h1 className="hero-title">Oyun Dünyasına<br /><span className="highlight">FeedTools</span> ile Adım At</h1>
                    <p className="hero-subtitle">
                        Steam kütüphanenizi en verimli şekilde yönetin. Aylık özel abonelik paketlerimizle
                        geniş oyun arşivlerine düşük maliyetle erişin. Favori oyunlarınıza anında ulaşın,
                        kütüphanenizi tek bir tıkla zenginleştirmenin ve sınırsız eğlencenin tadını çıkarın.
                    </p>
                    <div className="hero-actions">
                        <ModernButton
                            text="Hemen Keşfet"
                            variant="primary"
                            icon={<CompassIcon size={24} color="white" strokeWidth={1} style={{ transform: 'translateY(1.7px)' }} />}
                            onClick={() => window.open('https://feedtools.app/download', '_blank')}
                        />
                        <ModernButton
                            text="Paketleri İncele"
                            variant="secondary"
                            icon={<PackagesIcon size={24} color="var(--accent-secondary)" strokeWidth={1} style={{ transform: 'translateY(1.7px)' }} />}
                            onClick={() => document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' })}
                        />
                    </div>
                </div>

                <div className="scroll-indicator" onClick={scrollToPromotion} style={{ cursor: 'pointer' }}>
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                    <div className="arrow">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            <Suspense fallback={<LoadingFallback />}>
                <PromotionSection />
                <PackageComparison />
                <AppShowcase />
                <Testimonials />
            </Suspense>
        </>
    );
};

export default Home;
