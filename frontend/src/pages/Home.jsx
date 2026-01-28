
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import SomaZone from '../components/SomaZone';
import About from '../components/About';

const Home = () => {
    // We can keep the one-page feel for the landing, 
    // but SomaZone and Tracker sections on the landing 
    // might now serve as "Teasers" linking to full pages.

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />
            {/* We keep SomaZone as the 'teaser' section on Home */}
            <SomaZone />

            {/* Replaced 'Tracker' section on home with a Call-To-Action to the Dashboard?
                Or keep the "My Aura" section but make it a summary that links to full Dashboard.
                For this revamp, let's keep the user flow simple:
                Home -> Hero -> Guidance(Teaser) -> About
                The 'Tracker' was big. Let's make a new 'TrackerTeaser' or just link in Nav.
            */}

            <About />
        </motion.div>
    );
};

export default Home;
