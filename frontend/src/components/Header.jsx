
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [headerState, setHeaderState] = useState('transparent');
    const location = useLocation();

    useEffect(() => {
        // Force solid header on inner pages?
        // Or allow scroll effect everywhere?
        // Let's allow scroll effect but default to scrolled-like style if not on home?
        // Actually, design-wise, Home has the big Hero. Other pages have standard padding.
        // So for non-home pages, maybe we should start 'scrolled' or just use the same logic.
        // The content-section has padding-top: 100px.
        // So 'transparent' works if background is dark.

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setHeaderState('scrolled');
            } else {
                setHeaderState(location.pathname === '/' ? 'transparent' : 'scrolled');
            }
        };

        // Initial check
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    return (
        <header data-header-state={headerState}>
            <nav>
                <Link to="/" className="nav-logo-icon" title="Digital Ayurveda">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 4C19 4 22 12 22 12C22 12 19 20 12 20C5 20 2 12 2 12C5 6.5 8 4 12 4Z">
                        </path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </Link>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/sanctuary">Soma Zone</Link></li>
                    <li><Link to="/dashboard">Tracker</Link></li>
                    {/* <li><a href="#about">About</a></li> Keep About anchor for Home scroll? 
                    If on other page, #about won't work easily without hash router logic or redirect.
                    Let's just remove About link for now or make it cycle to footer.
                */}
                </ul>
                <div className="nav-actions">
                    <Link to="/dashboard" className="btn-ghost">Sign In</Link>
                    <Link to="/dashboard" className="btn-solid">Upgrading...</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
