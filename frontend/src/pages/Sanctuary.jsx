
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Wind, Volume2 } from 'lucide-react';

const Sanctuary = () => {
    // --- Breathing Tool State ---
    const [isBreathing, setIsBreathing] = useState(false);
    const [breathPhase, setBreathPhase] = useState('Ready'); // Inhale, Hold, Exhale

    useEffect(() => {
        let interval;
        if (isBreathing) {
            //Simple 4-7-8 pattern or 4-4-4
            // Let's do 4-4-4 for visual simplicity
            const cycle = async () => {
                setBreathPhase('Inhale');
                await new Promise(r => setTimeout(r, 4000));
                setBreathPhase('Hold');
                await new Promise(r => setTimeout(r, 4000));
                setBreathPhase('Exhale');
                await new Promise(r => setTimeout(r, 4000));
            };

            // Initial call
            cycle();
            interval = setInterval(cycle, 12000);
        } else {
            setBreathPhase('Ready');
        }
        return () => clearInterval(interval);
    }, [isBreathing]);

    // --- Audio Player State ---
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTrack, setActiveTrack] = useState(null);
    const audioRef = useRef(null);

    const tracks = [
        { id: 1, name: 'Rainfall', icon: '🌧️', src: 'https://cdn.pixabay.com/download/audio/2022/05/23/audio_370a273e97.mp3?filename=rain-and-nostalgia-115084.mp3' }, // Free placeholder
        { id: 2, name: 'Forest', icon: '🌲', src: 'https://cdn.pixabay.com/download/audio/2022/02/10/audio_fc8c8590cb.mp3?filename=forest-lullaby-110624.mp3' },
        { id: 3, name: 'Om Chant', icon: '🕉️', src: 'https://cdn.pixabay.com/download/audio/2019/08/02/audio_145b23e200.mp3?filename=meditation-bowl-16785.mp3' } // Actually a bowl sound for placeholder
    ];

    const togglePlay = (track) => {
        if (activeTrack?.id === track.id && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setActiveTrack(track);
            // Wait for render if ref needs update, but ref is stable
            if (audioRef.current) {
                audioRef.current.src = track.src;
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <motion.div
            className="content-section"
            style={{ paddingTop: '120px', minHeight: '100vh', display: 'block' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="glass-card full-page-card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Soma Zone</h2>
                <p className="theme-explanation">Your digital sanctuary for restoration and peace.</p>

                <div className="sanctuary-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '3rem' }}>

                    {/* Breathing Tool */}
                    <div className="tool-card frosted-card" style={{ textAlign: 'center', padding: '2rem', position: 'relative' }}>
                        <h3 className="subsection-title"><Wind size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />Pranayama Circle</h3>

                        <div className="breath-circle-container" style={{ margin: '2rem auto', width: '200px', height: '200px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/* Animated Circle */}
                            <motion.div
                                style={{
                                    width: '100%', height: '100%',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle, var(--accent-primary), transparent 70%)',
                                    border: '2px solid var(--accent-glow)',
                                    opacity: 0.3,
                                    position: 'absolute'
                                }}
                                animate={{
                                    scale: breathPhase === 'Inhale' ? 1.5 : (breathPhase === 'Hold' ? 1.5 : 1),
                                    opacity: breathPhase === 'Inhale' ? 0.6 : 0.3
                                }}
                                transition={{ duration: 4, ease: "easeInOut" }}
                            />

                            <div style={{ zIndex: 10, fontSize: '1.2rem', fontWeight: 'bold' }}>{breathPhase}</div>
                        </div>

                        <button
                            className={`btn-solid ${isBreathing ? 'active' : ''}`}
                            onClick={() => setIsBreathing(!isBreathing)}
                            style={{ marginTop: '1rem' }}
                        >
                            {isBreathing ? 'Stop Practice' : 'Start Breathing'}
                        </button>
                    </div>

                    {/* Audio Player */}
                    <div className="tool-card frosted-card" style={{ padding: '2rem', position: 'relative' }}>
                        <h3 className="subsection-title"><Volume2 size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />Sonic Therapy</h3>

                        <div className="track-list" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {tracks.map(track => (
                                <div key={track.id}
                                    onClick={() => togglePlay(track)}
                                    style={{
                                        display: 'flex', alignItems: 'center', padding: '1rem',
                                        background: activeTrack?.id === track.id ? 'rgba(112, 214, 255, 0.1)' : 'transparent',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '12px', cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>{track.icon}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '500' }}>{track.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Soothing Ambience</div>
                                    </div>
                                    <button style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}>
                                        {activeTrack?.id === track.id && isPlaying ? <Pause size={24} /> : <Play size={24} />}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <audio ref={audioRef} loop style={{ display: 'none' }} />
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default Sanctuary;
