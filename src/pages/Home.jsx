import { motion } from 'framer-motion';
import { ArrowRight, Download, Terminal, Brain, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

// Animation Variants
const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Home = () => {
    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-glow" style={{ top: '-20%', left: '-10%' }} />

            {/* 1. Who I Am (Hero Identity) */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-flex">
                        <motion.div
                            className="hero-content"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.div variants={fadeUp} className="badge">
                                Software Engineer &rarr; Product Leader
                            </motion.div>

                            <motion.h1 variants={fadeUp} className="hero-title">
                                Hi, I'm Swarnesh. <br />
                                <span className="text-gradient">Where business thinking meets technical execution.</span>
                            </motion.h1>

                            <motion.p variants={fadeUp} className="hero-subtitle">
                                UNC Kenan-Flagler MBA ’27 | AI & Product Strategy <br />
                                Previously scaling global payment platforms at J.P. Morgan Processing $1T+ Annually.
                            </motion.p>

                            <motion.div variants={fadeUp} className="hero-cta">
                                <Link to="/projects" className="btn btn-primary">
                                    View Projects <ArrowRight size={18} />
                                </Link>
                                <Link to="/about" className="btn btn-secondary">
                                    My Full Story
                                </Link>
                                <a href="https://drive.google.com/file/d/19LxM7ifJ3aZU2mFYOLjswtsuBRFqUSw-/view?usp=sharing" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ border: 'none', background: 'transparent' }}>
                                    <Download size={18} /> Resume
                                </a>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="hero-image-wrapper"
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                        >
                            <div className="hero-image-container glass-card">
                                <img src="/assets/profile.jpg" alt="Swarnesh Jha" className="hero-image" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. What I Do */}
            <section className="section-padding" style={{ position: 'relative', zIndex: 2 }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">What I Do</h2>
                        <p className="section-sub">Core pillars bridging engineering with market reality.</p>
                    </motion.div>

                    <div className="services-grid">
                        <motion.div
                            className="glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <Brain size={40} className="card-icon" />
                            <h3>AI Engineering</h3>
                            <p>Designing scalable AI pipelines, from fine-tuning transformer models (RoBERTa) to orchestrating complex RAG architectures for dynamic workflow optimization.</p>
                        </motion.div>

                        <motion.div
                            className="glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Terminal size={40} className="card-icon" />
                            <h3>Product Strategy</h3>
                            <p>Translating market insights into actionable roadmaps. Applying MBA-level rigor to pricing, Go-to-Market strategies, and unit economics.</p>
                        </motion.div>

                        <motion.div
                            className="glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <Cloud size={40} className="card-icon" />
                            <h3>Cloud Architecture</h3>
                            <p>Architecting robust, cloud-native AWS platforms capable of scaling to process billions of events globally, ensuring extreme high availability.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Featured Projects Teaser */}
            <section className="section-padding bg-alternate">
                <div className="container">
                    <div className="flex-between">
                        <div>
                            <h2 className="section-title">Case Studies</h2>
                            <p className="section-sub">A glimpse into what I've built.</p>
                        </div>
                        <Link to="/projects" className="btn btn-secondary hide-mobile">All Projects</Link>
                    </div>

                    <div className="feature-project glass-card mt-4">
                        <div className="project-meta">
                            <span className="pill">Flagship</span>
                            <span className="pill outline">AI/ML</span>
                        </div>
                        <h3>Business-Grade Review Classifier</h3>
                        <p>Engineered an end-to-end sentiment and taxonomy classification pipeline utilizing GenAI for labeling and RoBERTa for cost-effective inference. Delivered actionable customer insights to guide engineering prioritization.</p>
                        <Link to="/projects" className="read-more">Read Full Case Study &rarr;</Link>
                    </div>
                </div>
            </section>

        </motion.div>
    );
};

export default Home;
