
import { useInView } from 'react-intersection-observer';

const SomaZone = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <section id="guidance" className={`content-section reveal-on-scroll ${inView ? 'is-visible' : ''}`} ref={ref}>
            <div className="glass-card tilt-card moon-shadow-card">
                <h2 className="gradient-text">The Soma Zone: Tools for Calm & Balance</h2>

                <p className="theme-explanation" style={{ marginBottom: '2rem' }}>
                    In Ayurveda, "Soma" is the cooling, lunar energy that brings peace, calm, and rest. This zone is
                    your source for 'Soma'—a library of expert-guided tools to help you heal, relax, and find
                    restorative peace.
                </p>

                <div className="guidance-content-sections" style={{ borderBottom: 'none' }}>
                    <h3 className="subsection-title">A Holistic Path to Your Well-being</h3>
                    <div className="guidance-grid">
                        <div className="guidance-card">
                            <span className="guidance-icon">🌙</span>
                            <h3>Find Your "Soma" (Calm)</h3>
                            <p>Inspired by the Ayurvedic concept of 'Soma', explore our library of guided meditations,
                                sleep guides, and relaxation tools.</p>
                            <a href="#guidance" className="card-link">Explore Guidance →</a>
                        </div>
                        <div className="guidance-card">
                            <span className="guidance-icon">🌸</span>
                            <h3>Nurture Your "Fragrance" (Practice)</h3>
                            <p>Like a flower, your good habits spread positivity. Use our "My Aura" dashboard to track
                                your mood and routines.</p>
                            <a href="#tracker" className="card-link">View My Aura →</a>
                        </div>
                        <div className="guidance-card">
                            <span className="guidance-icon">📖</span>
                            <h3>Understand the Source</h3>
                            <p>Learn about our mission and the core philosophy behind Digital Ayurveda—the single,
                                holistic source of true well-being.</p>
                            <a href="#about" className="card-link">Read Our Mission →</a>
                        </div>
                    </div>
                </div>

                <div className="guidance-content-sections" style={{ marginTop: '1rem' }}>
                    <h3 className="subsection-title">Featured Moon Mode & Content Hub</h3>
                    <div className="mind-zone-layout">
                        <div className="breathing-card">
                            <span className="breathing-icon">🧘‍♀️</span>
                            <h3>Featured: Moon Mode</h3>
                            <p>Our guided collection to help you disconnect. Based on principles for sleep (Nidra),
                                these tools help you wind down and prepare for deep rest.</p>
                            <div className="breathing-gif-placeholder">[Sleep Story/Calm Audio Placeholder]</div>
                        </div>

                        <div className="prompt-card">
                            <div className="guidance-grid" style={{ gap: '1rem' }}>
                                <div className="guidance-card">
                                    <span className="guidance-icon">🧠</span>
                                    <h3>Mental Hub</h3>
                                    <p>Guided programs for managing anxiety and stress.</p>
                                </div>
                                <div className="guidance-card">
                                    <span className="guidance-icon">🌿</span>
                                    <h3>Physical Health</h3>
                                    <p>Resources on nutrition (Ahar) and mindful movement (Vihar).</p>
                                </div>
                            </div>
                            <h3 className="quote" style={{ marginTop: '1rem' }}>"Shivoham. I am Consciousness and Bliss."</h3>
                            <p className="prompt-source">- Motivational Quote of the Day</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SomaZone;
