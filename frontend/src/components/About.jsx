
import { useInView } from 'react-intersection-observer';

const About = () => {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="about" className={`content-section reveal-on-scroll ${inView ? 'is-visible' : ''}`} ref={ref}>
            <div className="glass-card tilt-card">
                <h2 className="gradient-text">About Us: The Source of Our Mission</h2>
                <div className="shloka-header-theme">
                    <blockquote>
                        "परात्मानमेकं जगद्बीजमाद्यं निरीहं निराकारमोंकारवेद्यम्।
                        यतो जायते पाल्यते येन विश्वं तमीशं भजे लीयते यत्र विश्वम्।|"
                    </blockquote>
                    <p className="theme-explanation">
                        "I worship that supreme soul, the one, the primordial seed of the universe... From whom the
                        universe originates, by whom it is sustained, and into whom it dissolves."
                    </p>
                </div>

                <h3 className="subsection-title">Our Philosophy</h3>
                <p>This ancient wisdom is the heart of Digital Ayurveda. We believe true health is not a collection of
                    parts, but a single, interconnected system. Our philosophy is rooted in the Ayurvedic understanding
                    that well-being arises from restoring the natural balance of mind, body, and spirit.</p>

                <h3 className="subsection-title" style={{ marginTop: '2rem' }}>Our Commitment</h3>
                <p>Digital Ayurveda is built by a team of certified Ayurvedic practitioners, psychologists, and
                    technologists dedicated to accessible, holistic care. We blend timeless wisdom with modern,
                    evidence-based practices to create a platform you can trust.</p>

                <div className="disclaimer">
                    <h3 className="subsection-title">Medical Disclaimer</h3>
                    <p><strong>Medical Disclaimer:</strong> The information and tools provided by Digital Ayurveda are
                        for supportive and educational purposes. They are not a substitute for professional medical
                        advice, diagnosis, or treatment. Always consult your physician.</p>
                </div>
            </div>
        </section>
    );
};

export default About;
