// This file is in: /static/js/script.js

document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('header');
    const hero = document.querySelector('.hero-section');
    
    // --- 0. Header Scroll Transition (Transparent to Solid) ---
    const updateHeader = () => {
        if (window.scrollY > 50) { 
            header.setAttribute('data-header-state', 'scrolled');
        } else {
            header.setAttribute('data-header-state', 'transparent');
        }
    };
    window.addEventListener('scroll', updateHeader);
    updateHeader();

    // --- Simple Range Slider Label Update (for visual feedback) ---
    const moodSlider = document.getElementById('mood_level');
    const moodValueSpan = document.getElementById('moodValue');
    if (moodSlider) {
        moodValueSpan.textContent = moodSlider.value;
        moodSlider.addEventListener('input', () => {
            moodValueSpan.textContent = moodSlider.value;
        });
    }

    // --- 1. Fade-in on Scroll Animation (Same as before) ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    
    // --- 2. Active Nav Dot Scrolling (Same as before) ---
    const sections = document.querySelectorAll('section[id]');
    const navDots = document.querySelectorAll('.scroll-indicator .dot');

    if (navDots.length > 0) {
        const dotObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const activeDot = document.querySelector(`.scroll-indicator a[href="#${id}"]`);
                    navDots.forEach(dot => dot.classList.remove('active'));
                    if (activeDot) { 
                        activeDot.classList.add('active'); 
                    }
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

        sections.forEach(section => { dotObserver.observe(section); });
    }

    // --- 3. Wellness Journal Submission (Same as before) ---
    const journalForm = document.getElementById('healthJournalForm');
    if (journalForm) {
        journalForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const data = {
                mood_level: parseInt(document.getElementById('mood_level').value),
                sleep_hours: parseFloat(document.getElementById('sleep_hours').value),
                water_intake: parseFloat(document.getElementById('water_intake').value),
                exercise_time: parseInt(document.getElementById('exercise_time').value),
                screen_time: parseFloat(document.getElementById('screen_time').value),
                notes: document.getElementById('notes').value,
                stress_level: 10 - parseInt(document.getElementById('mood_level').value),
                user_id: 'temp_user_hackathon' 
            };

            console.log('Journal Data to be sent:', data);

            try {
                // Mocking the fetch for quick testing
                alert(`Log Successful! Mood/Stress: ${data.mood_level}/${data.stress_level}. Sleep: ${data.sleep_hours}h. Ready for API call.`);
                journalForm.reset();
                moodValueSpan.textContent = '5'; // Reset slider label
            } catch (error) {
                console.error('Failed to send entry:', error);
                alert('Error connecting to the server.');
            }
        });
    }

    
    // --- 4. Hero Mouse-Move Parallax (Same as before) ---
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
            parallaxElements.forEach(el => {
                const strength = el.dataset.parallaxStrength || 20;
                el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
        });
    }
    
    // --- 5. 3D Card Tilt (Same as before) ---
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = (y / (rect.height / 2)) * -5;
            const rotateY = (x / (rect.width / 2)) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // --- 6. Click Ripple Effect (Same as before) ---
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.classList.add('click-ripple');
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.marginLeft = '-25px';
        ripple.style.marginTop = '-25px';
        document.body.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // --- 7. Interactive Dot Field (Same as before) ---
    const dotField = document.getElementById('interactive-dot-field');
    if (dotField) {
        const numDots = 150;
        const dots = [];

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot-particle');
            dot.style.left = `${Math.random() * 100}%`;
            dot.style.top = `${Math.random() * 100}%`;
            dotField.appendChild(dot);
            dots.push(dot);
        }

        hero.addEventListener('mousemove', (e) => {
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
                    dot.style.backgroundColor = `var(--accent-primary)`;
                } else {
                    dot.style.transition = 'transform 2s ease-out, background-color 0.5s ease';
                    dot.style.backgroundColor = `var(--accent-secondary)`;
                }
            });
        });
        
        hero.addEventListener('mouseleave', () => {
             dots.forEach(dot => {
                dot.style.transition = 'transform 1s ease-out, background-color 0.5s ease';
                dot.style.transform = 'translate(0, 0)'; 
                dot.style.backgroundColor = `var(--accent-secondary)`;
            });
        });
    }
    
    // --- NEW: 8. Interactive Planet Generation (Cosmic Elements) ---
    const planetContainer = document.getElementById('planet-container');
    const colors = ['#A998FF', '#70D6FF', '#E0F7FA']; // Lavender, Cyan, Light
    const numPlanets = 10;

    const generatePlanets = () => {
        for (let i = 0; i < numPlanets; i++) {
            const planet = document.createElement('div');
            planet.classList.add('planet-element');
            
            const size = Math.random() * 8 + 4; // Size between 4px and 12px
            planet.style.width = `${size}px`;
            planet.style.height = `${size}px`;
            
            planet.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            planet.style.opacity = Math.random() * 0.6 + 0.2;
            
            // Initial position (randomized across the screen)
            planet.style.left = `${Math.random() * 100}%`;
            planet.style.top = `${Math.random() * 100}%`;
            
            // Set animation properties
            planet.style.animationName = 'float-planet';
            planet.style.animationDuration = `${Math.random() * 40 + 20}s`; // 20s to 60s
            planet.style.animationTimingFunction = 'ease-in-out';
            planet.style.animationIterationCount = 'infinite';
            planet.style.animationDirection = 'alternate';
            
            // Set transform origin for slight rotation effect
            planet.style.transformOrigin = `${Math.random() * 100}% ${Math.random() * 100}%`;

            planetContainer.appendChild(planet);
        }
    };
    
    if (planetContainer) {
        generatePlanets();
        
        // Add animation keyframes dynamically
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = `
            @keyframes float-planet {
                0% { transform: translate(0, 0) rotate(0deg); }
                100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    

});