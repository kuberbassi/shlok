
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Tracker = () => {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    // Form State
    const [formData, setFormData] = useState({
        mood_level: 5,
        sleep_hours: 7.5,
        water_intake: 2.5,
        exercise_time: 30,
        screen_time: 5,
        notes: ''
    });

    const [analyticsData, setAnalyticsData] = useState(null);
    const [currentScore, setCurrentScore] = useState(82);

    const userId = 'temp_user_hackathon'; // Hardcoded as per original

    useEffect(() => {
        // Fetch analytics on mount
        const fetchAnalytics = async () => {
            try {
                const response = await fetch(`/api/analytics/${userId}`);
                if (response.ok) {
                    const result = await response.json();
                    setAnalyticsData(result.analytics);
                    if (result.analytics?.current_wellness_score) {
                        setCurrentScore(result.analytics.current_wellness_score);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch analytics", error);
            }
        };

        fetchAnalytics();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Local Storage Logic
        const nonMoodData = {
            sleep_hours: parseFloat(formData.sleep_hours),
            water_intake: parseFloat(formData.water_intake),
            exercise_time: parseInt(formData.exercise_time),
            screen_time: parseFloat(formData.screen_time),
            notes: formData.notes,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(`daily_metrics_${userId}_${new Date().toDateString()}`, JSON.stringify(nonMoodData));

        // 2. Prepare Mood Data for API
        const moodData = {
            user_id: userId,
            mood_level: parseInt(formData.mood_level) * 10,
            emotional: parseInt(formData.mood_level),
            mental: parseInt(formData.mood_level),
            physical: parseInt(formData.mood_level),
            notes: `Mood Log: ${formData.notes}`
        };

        try {
            const moodResponse = await fetch('/api/mood', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(moodData)
            });

            if (!moodResponse.ok) throw new Error('Failed to log mood.');

            // 3. Wellness Score Calculation
            const moodLevel = parseInt(formData.mood_level);
            const sleepHours = parseFloat(formData.sleep_hours);
            const waterIntake = parseFloat(formData.water_intake);
            const exerciseTime = parseInt(formData.exercise_time);

            const wellnessScore = Math.round((moodLevel / 10) * 40 + (sleepHours / 8) * 30 + (waterIntake / 2) * 10 + (exerciseTime / 60) * 20);
            const finalScore = Math.min(100, wellnessScore);

            // 4. Send Session Score
            await fetch('/api/wellness-session-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    score: finalScore,
                    timestamp: new Date().toISOString()
                })
            });

            alert(`Log Successful! Wellness Score: ${finalScore}/100. Data sent to API/saved locally.`);
            setFormData({
                mood_level: 5,
                sleep_hours: 7.5,
                water_intake: 2.5,
                exercise_time: 30,
                screen_time: 5,
                notes: ''
            }); // Reset form
            setCurrentScore(finalScore);

        } catch (error) {
            console.error('Failed to send entry:', error);
            alert('Error connecting to the server. Check console for details.');
        }
    };

    // Chart Data
    const chartData = {
        labels: ['Mood', 'Routine', 'Sleep', 'Quality'],
        datasets: [
            {
                label: 'Weekly Average',
                data: analyticsData ? [
                    analyticsData.average_mood / 10, // Scale down to match others approx
                    analyticsData.routine_completion,
                    analyticsData.average_sleep_hours * 10,
                    analyticsData.average_sleep_quality * 20
                ] : [5, 6, 7, 8], // Defaults
                backgroundColor: [
                    'rgba(112, 214, 255, 0.6)',
                    'rgba(169, 152, 255, 0.6)',
                    'rgba(112, 214, 255, 0.6)',
                    'rgba(169, 152, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(112, 214, 255, 1)',
                    'rgba(169, 152, 255, 1)',
                    'rgba(112, 214, 255, 1)',
                    'rgba(169, 152, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#e0f7fa' }
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(224, 247, 250, 0.1)' },
                ticks: { color: '#a998ff' }
            },
            x: {
                grid: { color: 'rgba(224, 247, 250, 0.1)' },
                ticks: { color: '#a998ff' }
            }
        }
    };

    return (
        <section id="tracker" className={`content-section reveal-on-scroll ${inView ? 'is-visible' : ''}`} ref={ref}>
            <div className="glass-card tilt-card flower-shadow-card">
                <h2 className="gradient-text">My Aura: Your Wellness Dashboard</h2>

                <div className="shloka-header-theme">
                    <p className="theme-explanation" style={{ marginBottom: 0 }}>
                        This is your personal space to nurture your daily practice and watch your well-being blossom.
                    </p>
                    <blockquote>
                        "यथा पुष्पं न पात्येत वासितं हि समन्ततः।
                        तथा सत्पुरुषैर्नित्यं कार्यं यत्सर्वहिताय वै॥"
                    </blockquote>
                    <p className="chart-caption" style={{ marginTop: '-1rem', marginBottom: '2.5rem' }}>
                        - A Reflection on Your Practice
                    </p>
                </div>

                <div className="tracker-layout">
                    <div className="dashboard-visuals">
                        <h3 className="subsection-title">Wellness Score</h3>
                        <div className="score-card">
                            <div className="score-value">{currentScore}<small>/100</small></div>
                            <div className="score-summary">Your Wellness Score this week: {currentScore}/100 — You're doing great!</div>
                        </div>
                        <div className="dashboard-charts">
                            {/* <canvas id="wellnessChart" style="max-height: 200px; margin-top: 20px;"></canvas> */}
                            <div style={{ maxHeight: '200px', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                            <p className="chart-caption">Weekly Trends (Mood, Routine, Sleep, Quality)</p>
                        </div>
                    </div>

                    <div className="journal-form">
                        <h3 className="subsection-title">Your Daily "Fragrance" Tracker</h3>
                        <form id="healthJournalForm" onSubmit={handleSubmit}>
                            <div className="form-group full-width">
                                <label htmlFor="mood_level">1. Mood / Stress Level (1=Stressed, 10=Calm)</label>
                                <input type="range" id="mood_level" name="mood_level" min="1" max="10"
                                    value={formData.mood_level} onChange={handleChange}
                                    className="range-input" />
                                <small className="range-label">Current: <span id="moodValue">{formData.mood_level}</span></small>
                            </div>
                            <div className="form-group half-width">
                                <label htmlFor="sleep_hours">2. Sleep (Hours)</label>
                                <input type="number" id="sleep_hours" name="sleep_hours" min="0" max="15" step="0.5"
                                    value={formData.sleep_hours} onChange={handleChange}
                                    className="form-input" />
                            </div>
                            <div className="form-group half-width">
                                <label htmlFor="water_intake">3. Water (Liters)</label>
                                <input type="number" id="water_intake" name="water_intake" min="0" max="5" step="0.1"
                                    value={formData.water_intake} onChange={handleChange}
                                    className="form-input" />
                            </div>
                            <div className="form-group half-width">
                                <label htmlFor="exercise_time">4. Exercise (Mins)</label>
                                <input type="number" id="exercise_time" name="exercise_time" min="0" max="300" step="10"
                                    value={formData.exercise_time} onChange={handleChange}
                                    className="form-input" />
                            </div>
                            <div className="form-group half-width">
                                <label htmlFor="screen_time">5. Screen Time (Hours)</label>
                                <input type="number" id="screen_time" name="screen_time" min="0" max="18" step="0.5"
                                    value={formData.screen_time} onChange={handleChange}
                                    className="form-input" />
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="notes">6. My Health Journal / Notes</label>
                                <textarea id="notes" name="notes" rows="3" className="form-input"
                                    placeholder="Brief reflection on your day, or any unusual symptoms..."
                                    value={formData.notes} onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" className="form-button">Log Wellness</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tracker;
