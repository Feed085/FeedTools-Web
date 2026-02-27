import React, { useState, useEffect, Suspense, lazy } from 'react';
import ModernButton from './ModernButton';
import CompassIcon from './CompassIcon';
import PackagesIcon from './PackagesIcon';
import { useLanguage } from '../LanguageContext';

const videos = [
    '/videos/rdr2.mp4',
    '/videos/tlou.mp4',
    '/videos/gow.mp4'
];

// Lazy load heavy components
const PromotionSection = lazy(() => import('./PromotionSection'));
const PackageComparison = lazy(() => import('./PackageComparison'));
const AppShowcase = lazy(() => import('./AppShowcase'));
const Testimonials = lazy(() => import('./Testimonials'));
const FAQ = lazy(() => import('./FAQ'));

// Simple loading component
const LoadingFallback = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px', color: 'white' }}>
        Yükleniyor...
    </div>
);

const TypingBadge = () => {
    const { t, lang } = useLanguage();
    const titles = t('hero', 'badge');
    const [currentText, setCurrentText] = useState('');
    const [titleIndex, setTitleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

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
    }, [currentText, isDeleting, titleIndex, titles]);

    return (
        <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span className="hero-badge-text">{currentText}</span>
        </div>
    );
};

const Home = () => {
    const { t, lang } = useLanguage();
    const videoRef = React.useRef(null);
    const heroRef = React.useRef(null);
    const [videoIndex, setVideoIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const savedTimeRef = React.useRef(0);

    useEffect(() => {
        const options = {
            root: null, // use the viewport
            threshold: 0.1 // 10% visibility is enough to play
        };

        const callback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    if (videoRef.current) {
                        savedTimeRef.current = videoRef.current.currentTime;
                    }
                    setIsVisible(false);
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
    }, [videoIndex]); // Re-observe when video element changes

    // Restore time when video mounts
    useEffect(() => {
        if (isVisible && videoRef.current) {
            videoRef.current.currentTime = savedTimeRef.current;
            videoRef.current.play().catch(err => console.log("Video play failed:", err));
        }
    }, [isVisible]);

    const handleVideoEnd = () => {
        setVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };


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
                    {isVisible && (
                        <video
                            ref={videoRef}
                            key={videos[videoIndex]}
                            autoPlay
                            muted
                            playsInline
                            onEnded={handleVideoEnd}
                            className="bg-video"
                            onLoadedMetadata={(e) => {
                                // Restore time immediately when metadata is ready
                                e.target.currentTime = savedTimeRef.current;
                            }}
                            width="100%"
                            height="100%"
                            preload="auto"
                        >
                            <source src={videos[videoIndex]} type="video/mp4" />
                        </video>
                    )}
                    <div className="video-overlay"></div>
                </div>

                <div className="hero-section">
                    <TypingBadge key={lang} />
                    <h1 className="hero-title">{t('hero', 'title1')}<br /><span className="highlight">{t('hero', 'title2')}</span> {t('hero', 'title3')}</h1>
                    <p className="hero-subtitle">
                        {t('hero', 'subtitle')}
                    </p>
                    <div className="hero-actions">
                        <ModernButton
                            text={t('hero', 'action1')}
                            variant="primary"
                            icon={<CompassIcon size={24} color="white" strokeWidth={1} style={{ transform: 'translateY(1.7px)' }} />}
                            onClick={() => window.open('https://feedtools.app/download', '_blank')}
                        />
                        <ModernButton
                            text={t('hero', 'action2')}
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
                <FAQ />
            </Suspense>
        </>
    );
};

export default Home;
