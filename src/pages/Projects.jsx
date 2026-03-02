import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Presentation, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import './Projects.css';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: 'easeIn' } }
};

const projectsData = [
    {
        id: 'review-classifier',
        flagship: true,
        title: 'Business-Grade Review Classifier',
        tags: ['AI/NLP', 'GenAI', 'RoBERTa', 'Python'],
        summary: 'An end-to-end sentiment and taxonomy classification pipeline utilizing GenAI for labeling and RoBERTa for cost-effective inference.',
        metrics: ['88% F1-Score', '10x Cost Reduction vs GPT-4'],
        links: { github: '#', live: '#' },
        hasMemo: true,
        memoSlides: Array.from({ length: 14 }, (_, i) => `/assets/memo/Slide${i + 1}.jpeg`)
    },
    {
        id: 'talent-dashboard',
        flagship: false,
        title: 'AI Talent Intelligence Dashboard',
        tags: ['React', 'Next.js', 'PostgreSQL', 'AI Agent'],
        summary: 'A real-time analytics engine with ML forecasting to identify global tech talent pools, scrape live job boards, and benchmark competitor compensation.',
        metrics: ['Real-time Streaming', 'RAG Integration'],
        links: { github: '#', live: '#' }
    },
    {
        id: 'jpmc-routing',
        flagship: false,
        title: 'Next-Gen Payments Migration (JPMC)',
        tags: ['Product Management', 'AWS', 'System Architecture'],
        summary: 'Definining requirements and go-to-market strategy for migrating a legacy global payments processing engine to AWS public cloud infrastructure.',
        metrics: ['$1T+ Annual Volume', '15% Processing Cost Reduction'],
        links: { github: '#', live: '#' }
    },
    {
        id: 'dmv-chatbot',
        flagship: false,
        title: 'NC DMV AI Chatbot',
        tags: ['RAG', 'LangChain', 'OpenAI'],
        summary: 'A conversational AI interface built to help North Carolina residents quickly find vehicle registration wait times and obscure policy requirements.',
        metrics: ['Reduced Bounce Rate 40%'],
        links: { github: '#', live: '#' }
    }
];

const Projects = () => {
    const [selectedMemo, setSelectedMemo] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const openMemo = (project) => {
        setSelectedMemo(project);
        setCurrentSlide(0);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeMemo = () => {
        setSelectedMemo(null);
        document.body.style.overflow = 'auto';
    };

    const nextSlide = () => {
        if (selectedMemo) {
            setCurrentSlide((prev) => (prev === selectedMemo.memoSlides.length - 1 ? 0 : prev + 1));
        }
    };

    const prevSlide = () => {
        if (selectedMemo) {
            setCurrentSlide((prev) => (prev === 0 ? selectedMemo.memoSlides.length - 1 : prev - 1));
        }
    };

    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-glow" style={{ top: '20%', left: '30%' }} />

            <section className="section-padding">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={fadeUp}
                        className="text-center mb-5"
                    >
                        <span className="badge">Portfolio</span>
                        <h1 className="section-title">Case Studies & Execution</h1>
                        <p className="section-sub" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            Deep dives into AI engineering, platform architecture, and strategic product initiatives.
                        </p>
                    </motion.div>

                    <div className="projects-grid">
                        {projectsData.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className={`project-card glass-card ${project.flagship ? 'flagship-card' : ''}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {project.flagship && <div className="flagship-badge">Flagship Case Study</div>}

                                <div className="project-tags">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="pill outline text-xs">{tag}</span>
                                    ))}
                                </div>

                                <h3>{project.title}</h3>
                                <p>{project.summary}</p>

                                <div className="project-metrics">
                                    {project.metrics.map(metric => (
                                        <div key={metric} className="metric-item">
                                            <ArrowRight size={14} className="metric-icon" /> {metric}
                                        </div>
                                    ))}
                                </div>

                                <div className="project-actions" style={{ flexWrap: 'wrap' }}>
                                    {project.hasMemo && (
                                        <button
                                            className="btn-icon"
                                            style={{ background: 'var(--accent-blue)', color: 'white', order: -1 }}
                                            onClick={() => openMemo(project)}
                                        >
                                            <Presentation size={18} /> Executive Memo
                                        </button>
                                    )}
                                    <a href={project.links.live} className="btn-icon" aria-label="View Live">
                                        <ExternalLink size={18} /> View App
                                    </a>
                                    <a href={project.links.github} className="btn-icon" aria-label="GitHub">
                                        <Github size={18} /> Code
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Executive Memo Modal */}
            <AnimatePresence>
                {selectedMemo && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMemo}
                    >
                        <motion.div
                            className="modal-content"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
                        >
                            <div className="modal-header">
                                <h3>{selectedMemo.title} - Executive Memo</h3>
                                <button className="close-btn" onClick={closeMemo}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="modal-body">
                                <button className="modal-nav-btn prev" onClick={prevSlide}>
                                    <ChevronLeft size={24} />
                                </button>

                                <img
                                    src={selectedMemo.memoSlides[currentSlide]}
                                    alt={`Slide ${currentSlide + 1}`}
                                    className="slide-image"
                                    onError={(e) => {
                                        // Fallback if user hasn't uploaded images yet
                                        e.target.onerror = null;
                                        e.target.src = `https://placehold.co/1000x562/1a1a1a/3e8bff?text=Placeholder+Slide+${currentSlide + 1}%0A(Export+PPTX+as+Images+and+place+in+src/assets/memo/)`;
                                    }}
                                />

                                <button className="modal-nav-btn next" onClick={nextSlide}>
                                    <ChevronRight size={24} />
                                </button>
                            </div>

                            <div className="modal-footer">
                                {selectedMemo.memoSlides.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`slide-dot ${idx === currentSlide ? 'active' : ''}`}
                                        onClick={() => setCurrentSlide(idx)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default Projects;
