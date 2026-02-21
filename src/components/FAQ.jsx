import React, { useState } from 'react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className={`faq-card ${isOpen ? 'active' : ''}`} onClick={onClick}>
            <div className="faq-card-header">
                <span className="faq-card-number">?</span>
                <h3 className="faq-card-question">{question}</h3>
                <div className="faq-card-trigger">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>
            </div>
            <div className="faq-card-body">
                <div className="faq-card-content">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqData = [
        {
            question: "Hesabım yasaklanır mı (Ban riski var mı)?",
            answer: "FeedTools, Steam servisleriyle legal bir şekilde etkileşime giren manifest bazlı bir sistem kullanır. Dosya bütünlüğüne veya hile karşıtı (Anti-Cheat) sistemlere müdahale etmediği için güvenle kullanılabilir. Kullanıcı güvenliği bizim en büyük önceliğimizdir."
        },
        {
            question: "FeedTools nedir ve ne işe yarar?",
            answer: "FeedTools, Steam kütüphanenizi yönetmenizi, eksik DLC'leri tamamlamanızı ve oyunları en verimli şekilde kütüphanenize eklemenizi sağlayan profesyonel bir araçtır. Tamamen kullanıcı dostu bir arayüzle kütüphane deneyiminizi üst seviyeye taşır."
        },
        {
            question: "Birden fazla Steam hesabında kullanabilir miyim?",
            answer: "Abonelik paketlerimiz hesap bazlı değil, uygulama lisansı bazlıdır. Satın aldığınız lisans süresi boyunca uygulamayı kendi belirlediğiniz Steam hesapları üzerinde dilediğinizce kullanabilirsiniz."
        },
        {
            question: "Oyunlar tüm DLC paketleri ile birlikte mi gelir?",
            answer: "Evet, FeedTools aracılığıyla kütüphanenize dahil edilen oyunlar, o oyun için mevcut olan tüm indirilebilir içerikleri (DLC) kapsar. Tek tıkla eksiksiz bir deneyim yaşayabilirsiniz."
        },
        {
            question: "FeedTools kullanmak için VPN gerekli mi?",
            answer: "Hayır, FeedTools yerel ağınız üzerinden doğrudan Steam sunucuları ile haberleşir. VPN kullanmanıza gerek kalmadan, en yüksek indirme hızlarıyla kütüphanenizi güncelleyebilirsiniz."
        },
        {
            question: "Teknik destek ve güncellemeler nasıl sağlanıyor?",
            answer: "Uygulamamız otomatik güncelleme sistemine sahiptir; Steam güncellemelerine göre sistem saniyeler içinde kendini yeniler. Herhangi bir sorunda Discord sunucumuz üzerinden 7/24 aktif destek ekibimize ulaşabilirsiniz."
        }
    ];

    return (
        <section id="faq-section" className="faq-section">
            <div className="faq-container">
                <div className="pkg-header">
                    <span className="pkg-badge">MERAK EDİLENLER</span>
                    <h2 className="pkg-title">Sıkça Sorulan <span className="highlight">Sorular</span></h2>
                    <p className="pkg-subtitle">Aklınıza takılan tüm sorulara şeffaf ve detaylı yanıtlar</p>
                </div>

                <div className="faq-grid">
                    {faqData.map((item, index) => (
                        <FAQItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
