import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Lenis from 'lenis';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Atmosphere from './components/Atmosphere';
import ScrollProgress from './components/ScrollProgress';
import CardSpotlight from './components/CardSpotlight';
import { setLenis, scrollToTop } from './smoothScroll';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Coursework from './pages/Coursework';
import Frameworks from './pages/Frameworks';
import Contact from './pages/Contact';
import Payments from './pages/Payments';
import Faherty from './pages/Faherty';
import FifaStory from './pages/FifaStory';

function App() {
  const location = useLocation();

  // Momentum-based smooth scrolling (skipped for reduced-motion users).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    setLenis(lenis);

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Always start a newly-navigated page from the top, not wherever the
  // previous page was scrolled to.
  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  return (
    <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Atmosphere />
      <ScrollProgress />
      <CardSpotlight />
      <Navbar />

      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/coursework" element={<Coursework />} />
            <Route path="/frameworks" element={<Frameworks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/faherty" element={<Faherty />} />
            <Route path="/fifa-prediction-pool" element={<FifaStory />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
