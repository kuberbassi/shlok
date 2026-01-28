
import { useEffect, useRef } from 'react';

const Hero = () => {
    const heroRef = useRef(null);
    const dotFieldRef = useRef(null);
    const planetContainerRef = useRef(null);

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        // --- Parallax Mouse Move ---
        const handleMouseMove = (e) => {
            const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

            const parallaxElements = hero.querySelectorAll('[data-parallax]');
            parallaxElements.forEach(el => {
                const strength = parseFloat(el.getAttribute('data-parallax-strength') || '20');
                el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
        };

        hero.addEventListener('mousemove', handleMouseMove);

        // --- Interactive Dot Field ---
        const dotField = dotFieldRef.current;
        let dots = [];
        if (dotField) {
            const numDots = 150;
            dotField.innerHTML = ''; // Clear existing

            for (let i = 0; i < numDots; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot-particle');
                dot.style.left = `${Math.random() * 100}%`;
                dot.style.top = `${Math.random() * 100}%`;
                dotField.appendChild(dot);
                dots.push(dot);
            }
        }

        // Dot interaction logic reuse handleMouseMove logic via closure or add another listener?
        // The original script added a listener to 'hero' specifically for dots.
        const handleDotHover = (e) => {
            const heroRect = hero.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            dots.forEach(dot => {
                const dotRect = dot.getBoundingClientRect();
                const dotX = dotRect.left + dotRect.width / 2;
                const dotY = dotRect.top + dotRect.height / 2;

                const dx = mouseX - dotX;
                const dy = mouseY - dotY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const maxDistance = 150;
                if (distance < maxDistance) {
                    const repulsion = (1 - (distance / maxDistance)) * 10;

                    const newX = dotX - (dx / distance) * repulsion - heroRect.left;
                    const newY = dotY - (dy / distance) * repulsion - heroRect.top;

                    dot.style.transition = 'transform 0.5s ease-out';
                    dot.style.transform = `translate(${newX}px, ${newY}px)`;
                    dot.style.backgroundColor = 'var(--accent-primary)';
                } else {
                    dot.style.transition = 'transform 2s ease-out, background-color 0.5s ease';
                    // Revert to initial centering?
                    // Original script: `dot.style.transform = 'translate(0, 0)'` 
                    // WAIT. The original script's ELSE block: `translate(0, 0)`.
                    // This implies normally it sits at (0,0) offset from its `left/top%`.
                    // But `dot-particle` CSS has `translate(-50%, -50%)`.
                    // So `translate(0,0)` REMOVES the centering? causing a slight shift?
                    // Maybe that's intended or unnoticed.
                    // I will respect the JS.

                    // Wait, checking script.js lines 227 and 236:
                    // 227: dot.style.transform = `translate(${newX}px, ${newY}px)`;
                    // 236: dot.style.transform = 'translate(0, 0)';

                    // So when hovering stops, it goes to (0,0) offset.
                    // Which removes the CSS `translate(-50%, -50%)` (if inline style overrides class).
                    // Yes, inline overrides class.
                    // So it shifts by half its width/height (1px). Not noticeable.

                    dot.style.transform = 'translate(0, 0)';
                    dot.style.backgroundColor = 'var(--accent-secondary)';
                }
            });
        };

        hero.addEventListener('mousemove', handleDotHover);
        hero.addEventListener('mouseleave', () => {
            dots.forEach(dot => {
                dot.style.transition = 'transform 1s ease-out, background-color 0.5s ease';
                dot.style.transform = 'translate(0, 0)';
                dot.style.backgroundColor = 'var(--accent-secondary)';
            });
        });

        // --- Planet Generation ---
        const planetContainer = planetContainerRef.current;
        if (planetContainer) {
            planetContainer.innerHTML = ''; // clear
            const colors = ['#A998FF', '#70D6FF', '#E0F7FA'];
            const numPlanets = 10;

            for (let i = 0; i < numPlanets; i++) {
                const planet = document.createElement('div');
                planet.classList.add('planet-element');

                const size = Math.random() * 8 + 4;
                planet.style.width = `${size}px`;
                planet.style.height = `${size}px`;

                planet.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                planet.style.opacity = Math.random() * 0.6 + 0.2;
                planet.style.left = `${Math.random() * 100}%`;
                planet.style.top = `${Math.random() * 100}%`;

                planet.style.animationName = 'float-planet';
                planet.style.animationDuration = `${Math.random() * 40 + 20}s`;
                planet.style.animationTimingFunction = 'ease-in-out';
                planet.style.animationIterationCount = 'infinite';
                planet.style.animationDirection = 'alternate';
                planet.style.transformOrigin = `${Math.random() * 100}% ${Math.random() * 100}%`;

                planetContainer.appendChild(planet);
            }

            // Add dynamic keyframes style if not exists
            if (!document.getElementById('planet-keyframes')) {
                const style = document.createElement('style');
                style.id = 'planet-keyframes';
                // Using a generic floating animation because dynamic random per planet is hard with one keyframe block.
                // Original script generated NEW keyframes per page load? 
                // line 283: styleSheet.innerText = `... translate(${Math.random()...}) ...`
                // It generated ONE keyframe definition for ALL planets? 
                // Yes. "float-planet" was defined once with random values.
                // So all planets moved to the SAME random destination? 
                // Yes, technically.
                // I'll replicate that.
                style.innerHTML = `
            @keyframes float-planet {
                0% { transform: translate(0, 0) rotate(0deg); }
                100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg); }
            }
           `;
                document.head.appendChild(style);
            }
        }

        return () => {
            hero.removeEventListener('mousemove', handleMouseMove);
            hero.removeEventListener('mousemove', handleDotHover);
            // Cleanup dots? No need if component unmounts and removes div.
        };
    }, []);

    return (
        <section id="home" className="hero-section" ref={heroRef}>
            <h1 className="hero-title-top" data-parallax data-parallax-strength="-10">DIGITAL</h1>
            <h1 className="hero-title-bottom" data-parallax data-parallax-strength="-10">AYURVEDA</h1>

            <div id="central-graphic" data-parallax data-parallax-strength="15">
                <div className="inner-orb-glow"></div>
            </div>

            <div className="hero-card-top-right frosted-card" data-parallax data-parallax-strength="30">
                <h2 className="hero-card-title">Ancient Wisdom. Modern Well-being.</h2>
                <p>Welcome to Digital Ayurveda. We bring the time-tested, holistic principles of Ayurvedic science to
                    you, wherever you are.</p>
                <a href="#guidance" className="btn-solid hero-button">Find Your Balance</a>
            </div>

            <div className="hero-card-bottom-left frosted-card" data-parallax data-parallax-strength="-20">
                <blockquote>
                    "दधिशङ्खतुषाराभं क्षीरोदार्णवसम्भवम्।
                    नमामि शशिनं सोमं शम्भोर्मुकुटभूषणम्॥"
                    <br />
                    <span>- Reflection on "Soma" (Calm)</span>
                </blockquote>
            </div>

            <div className="scroll-indicator">
                <a href="#home" className="dot active"></a>
                <a href="#guidance" className="dot"></a>
                <a href="#tracker" className="dot"></a>
                <a href="#about" className="dot"></a>
            </div>

            <div id="interactive-dot-field" ref={dotFieldRef}></div>
            <span className="sparkle s1">✧</span>
            <span className="sparkle s2">✧</span>
            <span className="sparkle s3">✦</span>

            <div className="bg-graphic eye-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4C19 4 22 12 22 12C22 12 19 20 12 20C5 20 2 12 2 12C5 6.5 8 4 12 4Z">
                    </path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            </div>
            <div className="bg-graphic eye-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4C19 4 22 12 22 12C22 12 19 20 12 20C5 20 2 12 2 12C5 6.5 8 4 12 4Z">
                    </path>
                </svg>
            </div>
            <div id="planet-container" ref={planetContainerRef}></div>
        </section>
    );
};

export default Hero;
