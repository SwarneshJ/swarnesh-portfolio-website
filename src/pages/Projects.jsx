import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Presentation, Video, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MemoSheet from '../components/MemoSheet';
import './Projects.css';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const projectsData = [
    {
        id: 'review-classifier',
        flagship: true,
        title: 'Business-Grade Review Classifier',
        tags: ['AI/NLP', 'GenAI', 'RoBERTa', 'Python'],
        summary: 'Curated a dataset of 1-star GrubHub reviews by benchmarking 6 GenAI models against human labelers. Selected the highest-alpha LLM to auto-label 15,000 reviews, which were used to fine-tune a RoBERTa model for highly-scalable customer insight extraction.',
        metrics: ['88% F1-Score', '10x Cost Reduction vs GPT-4'],
        links: { github: 'https://github.com/SwarneshJ/AI-Customer-Review-Classification', live: null },
        hasMemo: true,
        memoType: 'Executive Memo',
        image: '/assets/memo/Slide1.jpeg',
        memoSlides: Array.from({ length: 14 }, (_, i) => `/assets/memo/Slide${i + 1}.jpeg`)
    },
    {
        id: 'perfect-form',
        flagship: true,
        title: 'PerfectFormAI (Startup VC Pitch)',
        tags: ['Entrepreneurship', 'React Native', 'Computer Vision'],
        summary: 'Pitched an AI-driven fitness coaching application utilizing on-device pose estimation to analyze real-time workout form and deliver corrective audio feedback.',
        metrics: ['VC Ideation Feedback', 'Expo Go MVP'],
        links: { github: '#', live: null },
        hasMemo: true,
        memoType: 'Pitch Deck',
        image: '/assets/perfectform/Slide1.jpeg',
        appVideo: '/assets/perfectform/app-video.mp4',
        memoSlides: Array.from({ length: 21 }, (_, i) => `/assets/perfectform/Slide${i + 1}.jpeg`)
    },
    {
        id: 'fifa-prediction-pool',
        flagship: false,
        title: 'FIFA World Cup 2026 Prediction Pool',
        tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Auth.js'],
        summary: 'Six friends ran a World Cup prediction game by hand in a WhatsApp group, so I turned every recurring argument (vote-changing, copying, manual scoring) into features and shipped a full web app with locked votes, hidden picks, a one-time lifeline, and auto-scoring. Then they voted it back off in favor of the original polls: my favorite lesson in why better isn\'t the same as winning.',
        metrics: ['6-Player Pool · 104 Matches', 'Better ≠ Winning'],
        image: '/assets/fifa-prediction-pool.png',
        caseStudy: '/fifa-prediction-pool',
        links: { github: 'https://github.com/SwarneshJ/fifa-world-cup-prediction-pool', live: 'https://fifa-world-cup-prediction-pool.vercel.app/demo' }
    },
    {
        id: 'dmv-chatbot',
        flagship: false,
        title: 'NC DMV AI Chatbot',
        tags: ['RAG', 'LangChain', 'OpenAI'],
        summary: 'A conversational AI interface built to help North Carolina residents quickly find vehicle registration wait times and obscure policy requirements.',
        metrics: ['Reduced Bounce Rate 40%'],
        image: '/assets/dmv-chatbot.png',
        links: { github: 'https://github.com/SwarneshJ/myAI3', live: 'https://my-ai-3-pearl-alpha.vercel.app/' }
    }
];

const Projects = () => {
    const [selectedMemo, setSelectedMemo] = useState(null);
    const [memoOrigin, setMemoOrigin] = useState(null);

    // Remember the summoning button so the sheet emerges from it (§7).
    const openMemo = (project, event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setMemoOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        setSelectedMemo(project);
    };

    const closeMemo = () => setSelectedMemo(null);

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

                                <div className="project-content-wrapper">
                                    <div className="project-image-container">
                                        <img src={project.image} alt={project.title} className="project-image" />
                                    </div>

                                    <div className="project-details">
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
                                            {project.caseStudy && (
                                                <Link
                                                    to={project.caseStudy}
                                                    className="btn-icon"
                                                    style={{ background: 'var(--accent-purple)', color: 'white', order: -2 }}
                                                >
                                                    <BookOpen size={18} /> Read the Story
                                                </Link>
                                            )}
                                            {project.hasMemo && (
                                                <button
                                                    className="btn-icon"
                                                    style={{ background: 'var(--accent-blue)', color: 'white', order: -2 }}
                                                    onClick={(e) => openMemo(project, e)}
                                                >
                                                    <Presentation size={18} /> {project.memoType || 'Executive Memo'}
                                                </button>
                                            )}
                                            {project.appVideo && (
                                                <a href={project.appVideo} target="_blank" rel="noreferrer" className="btn-icon" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white', order: -1 }} aria-label="Watch Demo">
                                                    <Video size={18} /> Watch Demo
                                                </a>
                                            )}
                                            {project.links.live && (
                                                <a href={project.links.live} target="_blank" rel="noreferrer" className="btn-icon" aria-label="View Live">
                                                    <ExternalLink size={18} /> View App
                                                </a>
                                            )}
                                            {project.links.github && (
                                                <a href={project.links.github} target="_blank" rel="noreferrer" className="btn-icon" aria-label="GitHub">
                                                    <Github size={18} /> Code
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedMemo && (
                    <MemoSheet project={selectedMemo} origin={memoOrigin} onClose={closeMemo} />
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default Projects;
