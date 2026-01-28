
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = 'temp_user_hackathon';

    useEffect(() => {
        fetch(`/api/analytics/${userId}`)
            .then(res => res.json())
            .then(data => {
                setAnalytics(data.analytics);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Radar Chart Data
    const radarData = {
        labels: ['Mood', 'Sleep Quantity', 'Sleep Quality', 'Routine', 'Wellness Score'],
        datasets: [
            {
                label: 'Current Balance',
                data: analytics ? [
                    analytics.average_mood, // 0-100 (if api returns that) - Wait api returns raw mood_level? 
                    // App.py: mood_level is tracked as 10-100? No, int(data.get('mood_level', 50)).
                    // Tracker.jsx sending: mood_level * 10 (so 10-100).
                    // Analytics endpoint returns average_mood.
                    analytics.average_mood,
                    (analytics.average_sleep_hours / 8) * 100, // Normalize to 100
                    (analytics.average_sleep_quality / 5) * 100,
                    analytics.routine_completion,
                    analytics.current_wellness_score
                ] : [50, 50, 50, 50, 50],
                backgroundColor: 'rgba(112, 214, 255, 0.2)',
                borderColor: '#70d6ff',
                borderWidth: 2,
            },
        ],
    };

    const radarOptions = {
        scales: {
            r: {
                angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                pointLabels: { color: '#e0f7fa', font: { size: 12 } },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: { display: false } // Hide numbers on axis for cleaner look
            }
        },
        plugins: {
            legend: { display: false }
        }
    };

    return (
        <motion.div
            className="content-section"
            style={{ paddingTop: '120px', minHeight: '100vh', display: 'block' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="glass-card full-page-card" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>My Aura Dashboard</h2>
                <p className="theme-explanation">Deep insights into your personal wellness journey.</p>

                <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>

                    {/* Visualizer */}
                    <div className="frosted-card" style={{ position: 'relative', width: '100%', maxWidth: 'none', height: 'auto' }}>
                        <h3 className="subsection-title">Wellness Compass</h3>
                        <div style={{ maxHeight: '400px', display: 'flex', justifyContent: 'center' }}>
                            <Radar data={radarData} options={radarOptions} />
                        </div>
                    </div>

                    {/* Stats & Insights */}
                    <div className="stats-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Score Card */}
                        <div className="frosted-card" style={{ position: 'relative', maxWidth: 'none', padding: '1.5rem' }}>
                            <h3 className="subsection-title" style={{ marginBottom: '0.5rem' }}>Current Score</h3>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                                {analytics?.current_wellness_score || 82}
                                <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginLeft: '10px' }}>/ 100</span>
                            </div>
                            <p style={{ marginTop: '0.5rem', color: 'var(--text-light)' }}>
                                {analytics?.current_wellness_score > 80 ? "Your aura is radiating positivity!" : "Focus on restoration today."}
                            </p>
                        </div>

                        {/* AI Suggestions Placeholder - would fetch from /api/ai-suggestions */}
                        <div className="frosted-card" style={{ position: 'relative', maxWidth: 'none', padding: '1.5rem', flexGrow: 1 }}>
                            <h3 className="subsection-title">AI Guide</h3>
                            <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>"Based on your recent sleep patterns, we recommend focusing on 'Soma' (rest) tonight."</p>
                            <ul style={{ listStyle: 'none' }}>
                                <li style={{ marginBottom: '10px' }}>🧘 10 min Yoga Nidra</li>
                                <li style={{ marginBottom: '10px' }}>🍵 Chamomile Tea</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
