import { motion } from 'framer-motion';
import { Network, Database, BrainCircuit, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './About.css';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const About = () => {
    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-glow" style={{ top: '10%', right: '-10%' }} />

            {/* Header Container */}
            <section className="section-padding">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={fadeUp}
                        className="about-header"
                    >
                        <span className="badge">The Narrative</span>
                        <h1 className="hero-title">From Building Platforms <br /><span className="text-gradient">To Shaping Strategy.</span></h1>
                        <p className="hero-subtitle">Bridging the gap between technical feasibility and market reality.</p>
                    </motion.div>

                    <div className="about-grid">
                        {/* Professional Portrait */}
                        <motion.div
                            className="about-image-container glass-card"
                            style={{ padding: 0, overflow: 'hidden' }}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <img src="/assets/profile.png" alt="Swarnesh Jha - Professional Portrait" className="about-image" />
                        </motion.div>

                        {/* Narrative Content */}
                        <motion.div
                            className="about-content"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h2 className="mb-4">Engineering Roots. Product Vision.</h2>
                            <p>
                                My journey started in software engineering, focusing on the intricate mechanics of building digital products. Over the years, I realized that writing code is only a fraction of the equation. True product impact happens at the intersection of technology, business strategy, and human behavior.
                            </p>
                            <p>
                                Before business school, I spent 5 years scaling platforms, 3 at J.P. Morgan and 2 at Q3 Technologies. I architected cloud-native AWS systems processing billions of annual transactions and deployed machine learning frameworks that meaningfully optimized global payment routes. This period ingrained in me a deep appreciation for scale, resilience, and operational excellence.
                            </p>

                            <div className="highlight-quote">
                                Along the way, I realized the problems I loved most weren't how do we build this but what should we build, and why?
                            </div>

                            <p>
                                That's what brought me to UNC Kenan-Flagler (MBA '27), where I'm concentrating in Technology Innovation & Product Management and AI & Business Analytics. I'm currently seeking a Summer 2026 PM or Technical PM internship where I can apply deep technical fluency to product strategy, user problems, and go-to-market decisions.
                            </p>

                            <p>
                                I bring a unique blend of <strong>quant rigor</strong>, grounded in my Mathematics background, and <strong>customer-centricity</strong>. Whether I'm evaluating AI model performance via F1 metrics or interviewing users, my methodology remains the same: ground decisions in data, but deliver for the human on the other side of the screen.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Pillars Section */}
            <section className="section-padding bg-alternate">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-5"
                    >
                        <h2 className="section-title">Core Pillars</h2>
                    </motion.div>

                    <div className="services-grid">
                        <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <Network size={36} className="card-icon" />
                            <h3>Global Experience</h3>
                            <p>Operating at scale across 170+ countries and 120 currencies, understanding the nuances of cross-border operations.</p>
                        </motion.div>

                        <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <Database size={36} className="card-icon" />
                            <h3>Cloud Architecture</h3>
                            <p>Migrating mission-critical applications to AWS, optimizing for latency, cost, and high availability.</p>
                        </motion.div>

                        <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                            <BrainCircuit size={36} className="card-icon" />
                            <h3>AI & NLP</h3>
                            <p>From GenAI orchestration to fine-tuning NLP models (RoBERTa) for scalable business inference.</p>
                        </motion.div>

                        <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                            <LineChart size={36} className="card-icon" />
                            <h3>Quant & Analytics</h3>
                            <p>M.S. Mathematics background combined with MBA analytics training for robust, data-driven decision trees.</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default About;
