
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Sanctuary from './pages/Sanctuary';

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {

  useEffect(() => {
    // --- Global Effects (Ripple, Tilt) ---
    // Ripple
    const handleGlobalClick = (e) => {
      // Check if clicking inside a button that handles its own visual state?
      // existing logic is fine.
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
    };
    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sanctuary" element={<Sanctuary />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
