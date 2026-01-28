
const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-columns">
                <div className="footer-column">
                    <h4>Digital Ayurveda</h4>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                        Ancient Wisdom. Modern Well-being.
                    </p>
                </div>
                <div className="footer-column">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="#guidance">Guidance</a></li>
                        <li><a href="#guidance">Articles & Insights</a></li>
                        <li><a href="#about">FAQ</a></li>
                        <li><a href="#about">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="#about">Privacy Policy</a></li>
                        <li><a href="#about">Terms of Service</a></li>
                        <li><a href="#about">Medical Disclaimer</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom-line">
                <p>© 2025 Digital Ayurveda. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
