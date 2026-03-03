import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Terminal, Brain, Cloud, Briefcase, GraduationCap, ExternalLink, Github, Presentation, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Projects.css';
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

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: 'easeIn' } }
};

const Home = () => {
    const [selectedMemo, setSelectedMemo] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const openMemo = (project) => {
        setSelectedMemo(project);
        setCurrentSlide(0);
        document.body.style.overflow = 'hidden';
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
                                <span className="text-gradient">MBA Candidate at UNC Kenan-Flagler Business School</span>
                            </motion.h1>

                            <motion.div variants={fadeUp} className="hero-skills">
                                {['Product Management', 'AI Strategy', 'Cloud Technology', 'FinTech Payments', 'JPMorganChase'].map((skill) => (
                                    <span key={skill} className="skill-tag">{skill}</span>
                                ))}
                            </motion.div>

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
                            <img src="/assets/profile.png" alt="Swarnesh Jha" className="hero-image-full" />
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
                        <p className="section-sub">Core pillars bridging engineering with business requirements.</p>
                    </motion.div>

                    <div className="services-grid">
                        <motion.div
                            className="glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
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
                            transition={{ delay: 0.2 }}
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
                            transition={{ delay: 0.3 }}
                        >
                            <Cloud size={40} className="card-icon" />
                            <h3>Cloud Architecture</h3>
                            <p>Architecting robust, cloud-native AWS platforms capable of scaling to process billions of events globally, ensuring extreme high availability.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Projects Showcase */}
            <section className="section-padding bg-alternate">
                <div className="container">
                    <div className="flex-between">
                        <div>
                            <h2 className="section-title">Projects</h2>
                            <p className="section-sub">A glimpse into what I've built.</p>
                        </div>
                        <Link to="/projects" className="btn btn-secondary hide-mobile">All Projects</Link>
                    </div>

                    <div className="projects-grid mt-4">
                        {homeProjectsData.map((project, index) => (
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
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Mental Models & Frameworks */}
            <section className="section-padding">
                <div className="container">
                    <div className="flex-between align-center mb-4">
                        <div>
                            <h2 className="section-title">Frameworks</h2>
                            <p className="section-sub mb-0" style={{ marginBottom: 0 }}>Mental models scaling ambiguity to actionable clarity.</p>
                        </div>
                        <Link to="/frameworks" className="btn btn-secondary hide-mobile">All Frameworks</Link>
                    </div>

                    <div className="frameworks-grid mt-4">
                        <motion.div className="framework-card glass-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="fc-header">
                                <span className="fc-icon">🔺</span>
                                <h3>The Minto Pyramid</h3>
                            </div>
                            <div className="fc-content">
                                <p className="fc-def"><strong>Definition:</strong> A top-down structure communicating the core answer first, followed by supporting grouped arguments.</p>
                                <p className="fc-ex"><strong>In Practice:</strong> Used to restructure a convoluted 40-slide technical cloud architecture review into a 3-page executive brief for JPMC MDs.</p>
                            </div>
                        </motion.div>
                        <motion.div className="framework-card glass-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <div className="fc-header">
                                <span className="fc-icon">🧊</span>
                                <h3>ICE Scoring (Impact, Confidence, Ease)</h3>
                            </div>
                            <div className="fc-content">
                                <p className="fc-def"><strong>Definition:</strong> A rapid prioritization matrix multiplying Impact x Confidence x Ease to stack-rank product backlog items.</p>
                                <p className="fc-ex"><strong>In Practice:</strong> Deployed alongside the Head of Product to brutally prioritize Q3 roadmap items, deferring a complex dashboard rebuild in favor of high-yield API integrations.</p>
                            </div>
                        </motion.div>
                        <motion.div className="framework-card glass-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <div className="fc-header">
                                <span className="fc-icon">🎯</span>
                                <h3>TAM / SAM / SOM</h3>
                            </div>
                            <div className="fc-content">
                                <p className="fc-def"><strong>Definition:</strong> Top-down / Bottom-up methodology for correctly sizing market opportunities and setting realistic GTM targets.</p>
                                <p className="fc-ex"><strong>In Practice:</strong> Calculated bottom-up Serviceable Obtainable Market (SOM) for an AI startup based on realistic enterprise sales capacities.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Experience Timeline */}
            <section className="section-padding pt-0">
                <div className="container resume-container">
                    <h2 className="section-heading"><Briefcase className="heading-icon" /> Professional Experience</h2>

                    <div className="timeline-wrapper">
                        {experienceData.map((company, cIdx) => (
                            <motion.div
                                key={company.company}
                                className="company-block"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: cIdx * 0.1 }}
                            >
                                <div className="company-header">
                                    <div className="company-info-wrapper">
                                        {company.logo && <img src={company.logo} alt={company.company} className="company-logo" />}
                                        <div>
                                            <h3 className="company-title">{company.company}</h3>
                                            <p className="company-meta">{company.group}</p>
                                        </div>
                                    </div>
                                    <div className="company-duration">{company.duration}</div>
                                </div>

                                <div className="roles-container">
                                    {company.roles.map((role, rIdx) => (
                                        <div key={rIdx} className="role-block">
                                            <div className="role-dot" />
                                            <div className="role-header flex-between align-center">
                                                <div className="role-title">{role.title}</div>
                                                <div className="role-date">{role.date}</div>
                                            </div>
                                            <div className="role-location">{role.location}</div>

                                            <ul className="role-bullets">
                                                {role.bullets.map((bullet, bIdx) => (
                                                    <li key={bIdx}>{bullet}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education Grid */}
            <section className="section-padding bg-alternate">
                <div className="container resume-container">
                    <h2 className="section-heading"><GraduationCap className="heading-icon" /> Education</h2>

                    <div className="edu-grid">
                        {educationData.map((edu, idx) => (
                            <motion.div
                                key={edu.degree}
                                className="edu-card glass-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                            >
                                <div className="edu-header">
                                    {edu.logo && <img src={edu.logo} alt={edu.school} className="edu-logo" />}
                                    <div style={{ flex: 1 }}>
                                        <h3 className="edu-school">{edu.school}</h3>
                                        <p className="edu-degree">{edu.degree}</p>
                                        <p className="edu-year">{edu.year}</p>

                                        {(edu.title || edu.bullets) && (
                                            <div className="edu-details">
                                                {edu.title && <p className="edu-title">{edu.title}</p>}
                                                {edu.bullets && (
                                                    <ul className="edu-bullets">
                                                        {edu.bullets.map((bullet, bIdx) => (
                                                            <li key={bIdx}>{bullet}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        )}
                                    </div>
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

export default Home;

const experienceData = [
    {
        type: 'work',
        company: 'JPMorgan Chase & Co.',
        logo: '/assets/JPMC.jpeg',
        group: 'Corporate & Investment Banking | Payments Technology',
        duration: '3 Years',
        roles: [
            {
                title: 'Associate (Product Manager)',
                date: 'Feb 2024 - Jul 2025',
                location: 'Mumbai, Maharashtra, India',
                bullets: [
                    'Defined product vision, roadmap, and requirements for migrating a global payments platform from on-premises to AWS cloud, ensuring extreme scalability across 170+ countries, 120 currencies, and generating $1T+ in annual volume.',
                    'Prototyped and conceptualized a RAG-based AI framework designed to analyze millions of high-volume processing events, dynamically identifying least-cost payment routing mechanisms to reduce network processing costs by 15%.'
                ]
            },
            {
                title: 'Analyst',
                date: 'Aug 2022 - Jan 2024',
                location: 'Mumbai, Maharashtra, India',
                bullets: [
                    'Engineered a complex data-driven routing system optimizing digital transaction flows. Algorithmically selected cost-effective payment rails resulting in a 10% processing cost reduction for high-scale enterprise clients (including Netflix).',
                    'Launched Executive KPI dashboards tracking the platform’s major 1 Billion transaction milestone post-cloud migration, empowering C-suite leaders with critical insights to guide scaling and go-to-market decisions.'
                ]
            }
        ]
    },
    {
        type: 'work',
        company: 'Q3 Technologies',
        logo: '/assets/q3.jpeg',
        group: 'Software Engineering & Product Execution',
        duration: '2 Years 1 Month',
        roles: [
            {
                title: 'Software Engineer',
                date: 'Aug 2021 - Jul 2022',
                location: 'Gurugram, Haryana, India',
                bullets: [
                    'Operated as an AWS Subject Matter Expert overseeing two concurrent enterprise projects. Led end-to-end development/deployment for one platform while driving cross-functional architectural design on another scalable service.',
                    'Launched a highly successful digital B2B marketplace by conducting rigorous customer workflow analysis. Synthesized insights to refine feature requirements and prioritize product roadmaps, ultimately improving UX and driving adoption across 125,000+ customers.'
                ]
            },
            {
                title: 'Junior Software Engineer',
                date: 'Jul 2020 - Jul 2021',
                location: 'Gurugram, Haryana, India',
                bullets: [
                    'Core contributor to the development and AWS deployment of a scalable cloud-based architecture for SREI Infrastructure’s marketplace platform, facilitating the purchase and auctioning of heavy construction equipment.',
                    'Implemented robust proactive monitoring systems utilizing AWS Lambda and SNS to automatically broadcast email alerts whenever live API error rates breached a 5% threshold, directly mitigating downtime and enhancing site reliability.'
                ]
            }
        ]
    }
];

const educationData = [
    {
        school: 'UNC Kenan-Flagler Business School',
        logo: '/assets/unc.jpeg',
        degree: 'Master of Business Administration (MBA)',
        year: 'Aug 2025 - May 2027',
        title: 'Concentrations:',
        bullets: [
            'Technology Innovation & Product Management',
            'AI & Business Analytics'
        ]
    },
    {
        school: 'BITS Pilani',
        logo: '/assets/bits.png',
        degree: 'Dual Degree:',
        year: 'Aug 2015 - May 2020',
        bullets: [
            'Master of Science (M.Sc.) in Mathematics',
            'Bachelor of Engineering (B.E.)'
        ]
    }
];

const homeProjectsData = [
    {
        id: 'review-classifier',
        flagship: true,
        title: 'Business-Grade Review Classifier',
        tags: ['AI/NLP', 'GenAI', 'RoBERTa', 'Python'],
        summary: 'An end-to-end sentiment and taxonomy classification pipeline utilizing GenAI for labeling and RoBERTa for cost-effective inference.',
        metrics: ['88% F1-Score', '10x Cost Reduction vs GPT-4'],
        links: { github: 'https://github.com/SwarneshJ/AI-Customer-Review-Classification', live: null },
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
        links: { github: 'https://github.com/SwarneshJ/ai-talent-intelligence-dashboard', live: 'https://ai-talent-intelligence-dashboard.vercel.app/' },
        hasMemo: false
    }
];
