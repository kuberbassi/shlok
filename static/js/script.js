// This file goes in: /static/js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Fade-in on Scroll Animation ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // Optional: remove to re-animate every time
                // entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Triggers when 10% of the element is visible
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    
    // --- 2. Active Nav Dot Scrolling ---
    const sections = document.querySelectorAll('section[id]');
    const navDots = document.querySelectorAll('.scroll-indicator .dot');

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
    }, {
        rootMargin: '-50% 0px -50% 0px', // Triggers at the vertical center of the viewport
        threshold: 0
    });

    sections.forEach(section => {
        dotObserver.observe(section);
    });


    // --- 3. Mock Journal Form ---
    const journalForm = document.getElementById('journalForm');
    if (journalForm) {
        journalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, you'd save this to localStorage
            alert('Journal entry saved (locally)!');
            journalForm.reset();
        });
    }

});

// This file is in: /static/js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Fade-in on Scroll Animation (Keep this) ---
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

    
    // --- 2. Active Nav Dot Scrolling (Keep this) ---
    const sections = document.querySelectorAll('section[id]');
    const navDots = document.querySelectorAll('.scroll-indicator .dot');

    const dotObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeDot = document.querySelector(`.scroll-indicator a[href="#${id}"]`);
                navDots.forEach(dot => dot.classList.remove('active'));
                if (activeDot) { activeDot.classList.add('active'); }
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => { dotObserver.observe(section); });


    // --- 3. Mock Journal Form (We will update this later) ---
    const journalForm = document.getElementById('journalForm');
    if (journalForm) {
        journalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Journal entry saved (locally)!');
            journalForm.reset();
        });
    }

    
    // --- NEW: 4. Hero Mouse-Move Parallax ---
    const hero = document.querySelector('.hero-section');
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    hero.addEventListener('mousemove', (e) => {
        // Get mouse position from center of screen (from -0.5 to 0.5)
        const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

        // Animate each parallax element
        parallaxElements.forEach(el => {
            const strength = el.dataset.parallaxStrength || 20;
            
            // Apply the transform
            el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
    });

    
    // --- NEW: 5. 3D Card Tilt ---
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Get mouse position relative to the card center
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = (y / (rect.height / 2)) * -5; // Max 5deg tilt
            const rotateY = (x / (rect.width / 2)) * 10; // Max 10deg tilt
            
            // Apply the 3D tilt
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        // Reset when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

});