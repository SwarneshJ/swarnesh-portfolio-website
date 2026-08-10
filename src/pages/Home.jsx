import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Briefcase, GraduationCap, ExternalLink, Github, Presentation, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import Magnetic from '../components/Magnetic';
import JourneyScene from '../components/JourneyScene';
import MemoSheet from '../components/MemoSheet';
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

const Home = () => {
    const [selectedMemo, setSelectedMemo] = useState(null);
    const [memoOrigin, setMemoOrigin] = useState(null);

    // Subtle scroll-driven parallax across the hero.
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

    // Remember where the sheet was summoned from, so it can emerge from — and
    // return to — that exact button (§7 spatial consistency).
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
            <div className="bg-glow" style={{ top: '-20%', left: '-10%' }} />

            {/* 0. The Journey (walking scene) */}
            <JourneyScene />

            {/* 1. Who I Am (Hero Identity) */}
            <section className="hero-section" ref={heroRef} style={{ minHeight: 'auto', paddingTop: '4rem', paddingBottom: '4rem' }}>
                <div className="container">
                    <motion.div className="hero-flex" style={{ opacity: heroFade }}>
                        <motion.div
                            className="hero-content"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                            style={{ y: contentY }}
                        >
                            <motion.div variants={fadeUp} className="badge">
                                Software Engineer &rarr; Product Leader
                            </motion.div>

                            <motion.h1 variants={fadeUp} className="hero-title">
                                <span className="hero-line">
                                    {"Hi, I'm Swarnesh.".split(' ').map((word, i) => (
                                        <motion.span
                                            key={i}
                                            className="hero-word"
                                            initial={{ opacity: 0, y: 36, rotate: 5 }}
                                            animate={{ opacity: 1, y: 0, rotate: 0 }}
                                            transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            {word}&nbsp;
                                        </motion.span>
                                    ))}
                                </span>
                                <motion.span
                                    className="text-gradient"
                                    initial={{ opacity: 0, y: 26 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ display: 'block' }}
                                >
                                    MBA Candidate at UNC Kenan-Flagler Business School
                                </motion.span>
                            </motion.h1>

                            <motion.div variants={fadeUp} className="hero-skills">
                                {['Product Management', 'AI Strategy', 'Cloud Technology', 'FinTech Payments', 'JPMorganChase'].map((skill) => (
                                    skill === 'FinTech Payments' ? (
                                        <Link to="/payments" key={skill} className="skill-tag" style={{ cursor: 'pointer', textDecoration: 'none', background: 'rgba(53, 114, 174, 0.1)', borderColor: 'rgba(53, 114, 174, 0.4)', color: 'var(--accent-blue)' }}>
                                            {skill} ↗
                                        </Link>
                                    ) : (
                                        <span key={skill} className="skill-tag">{skill}</span>
                                    )
                                ))}
                            </motion.div>
                            <motion.p variants={fadeUp} style={{ color: 'var(--accent-blue)', fontSize: '0.85rem', marginTop: '1.5rem', fontStyle: 'italic', opacity: 0.8 }}>
                                *Click FinTech Payments above to explore my core JPMC architecture experience.
                            </motion.p>

                            <motion.div variants={fadeUp} className="hero-cta">
                                <Magnetic>
                                    <Link to="/projects" className="btn btn-primary">
                                        View Projects <ArrowRight size={18} />
                                    </Link>
                                </Magnetic>
                                <Magnetic>
                                    <Link to="/about" className="btn btn-secondary">
                                        My Full Story
                                    </Link>
                                </Magnetic>
                                <Magnetic>
                                    <a href="https://drive.google.com/file/d/19LxM7ifJ3aZU2mFYOLjswtsuBRFqUSw-/view?usp=sharing" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ border: 'none', background: 'transparent' }}>
                                        <Download size={18} /> Resume
                                    </a>
                                </Magnetic>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="hero-image-wrapper"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ y: imageY }}
                        >
                            <img src="/assets/profile.png" alt="Swarnesh Jha" className="hero-image-full" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Skill ticker — flowing marquee */}
            <div className="ticker" aria-hidden="true">
                <div className="ticker-track">
                    {[0, 1].map((copy) => (
                        <div className="ticker-item" key={copy}>
                            {['Product Strategy', 'AI Systems', 'Global Payments', 'Cloud Architecture', 'FinTech', 'Storytelling', 'Go-To-Market', 'Data & Analytics'].map((skill, i) => (
                                <span key={skill} className={i % 2 ? 'tick-alt' : ''}>{skill}&nbsp;&nbsp;<span className="tick-star">✦</span></span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Projects Showcase */}
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

                                <div className="project-content-wrapper">
                                    <motion.div
                                        className="project-image-container"
                                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                                        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
                                        viewport={{ once: true, margin: '-80px' }}
                                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <motion.img
                                            src={project.image}
                                            alt={project.title}
                                            className="project-image"
                                            initial={{ scale: 1.18 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true, margin: '-80px' }}
                                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                        />
                                    </motion.div>

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
                                                    style={{ background: 'var(--accent-blue)', color: 'white', order: -1 }}
                                                    onClick={(e) => openMemo(project, e)}
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
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Experience Timeline */}
            <section className="section-padding">
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

            {/* 5. What I Do */}
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

                    <div className="craft-list">
                        {[
                            { n: '01', title: 'Product Strategy', desc: 'Translating market insights into actionable roadmaps. Applying MBA-level rigor to pricing, Go-to-Market strategies, and unit economics.' },
                            { n: '02', title: 'AI Engineering', desc: 'Designing scalable AI pipelines, from fine-tuning transformer models (RoBERTa) to orchestrating complex RAG architectures for dynamic workflow optimization.' },
                            { n: '03', title: 'Cloud Architecture', desc: 'Architecting robust, cloud-native AWS platforms capable of scaling to process billions of events globally, ensuring extreme high availability.' }
                        ].map((craft, i) => (
                            <motion.div
                                className="craft-row"
                                key={craft.n}
                                initial={{ opacity: 0, y: 26 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="craft-num">{craft.n}</span>
                                <h3>{craft.title}</h3>
                                <p>{craft.desc}</p>
                                <ArrowRight size={22} className="craft-arrow" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Mental Models & Frameworks */}
            <section className="section-padding pt-0">
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

            <AnimatePresence>
                {selectedMemo && (
                    <MemoSheet project={selectedMemo} origin={memoOrigin} onClose={closeMemo} />
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default Home;

const experienceData = [
    {
        type: 'work',
        company: 'Faherty Brand',
        logo: '/assets/faherty.png',
        group: 'AI Strategy | Merchandising & Planning Analytics',
        duration: '3 Months',
        roles: [
            {
                title: 'MBA AI Strategy Intern',
                date: 'Jun 2026 - Aug 2026',
                location: 'New York, NY',
                bullets: [
                    'Designed and shipped an agentic workflow that turned fragmented seasonal data into structured hindsight reports for the merchandising and planning teams, surfacing sell-through patterns, return signals, and weeks-on-hand recommendations to inform next-season allocation strategy.',
                    'Designed and deployed an AI signal aggregator that closed a three-year-old gap in cross-channel customer feedback synthesis, classifying complaints at the SKU level across five fragmented data sources and feeding actionable insights into the product team’s weekly review cycle.'
                ]
            }
        ]
    },
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
        summary: 'Curated a dataset of 1-star GrubHub reviews by benchmarking 6 GenAI models against human labelers. Selected the highest-alpha LLM to auto-label 15,000 reviews, which were used to fine-tune a RoBERTa model for highly-scalable customer insight extraction.',
        metrics: ['88% F1-Score', '10x Cost Reduction vs GPT-4'],
        links: { github: 'https://github.com/SwarneshJ/AI-Customer-Review-Classification', live: null },
        hasMemo: true,
        image: '/assets/memo/Slide1.jpeg',
        memoSlides: Array.from({ length: 14 }, (_, i) => `/assets/memo/Slide${i + 1}.jpeg`)
    },
    {
        id: 'fifa-prediction-pool',
        flagship: false,
        title: 'FIFA World Cup 2026 Prediction Pool',
        tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Auth.js'],
        summary: 'Six friends ran a World Cup prediction game by hand in a WhatsApp group, so I turned every recurring argument (vote-changing, copying, manual scoring) into features and shipped a full web app with locked votes, hidden picks, a one-time lifeline, and auto-scoring. Then they voted it back off in favor of the original polls: my favorite lesson in why better isn\'t the same as winning.',
        metrics: ['6-Player Pool · 104 Matches', 'Better ≠ Winning'],
        links: { github: 'https://github.com/SwarneshJ/fifa-world-cup-prediction-pool', live: 'https://fifa-world-cup-prediction-pool.vercel.app/demo' },
        hasMemo: false,
        caseStudy: '/fifa-prediction-pool',
        image: '/assets/fifa-prediction-pool.png'
    },
    {
        id: 'dmv-chatbot',
        flagship: false,
        title: 'NC DMV AI Chatbot',
        tags: ['RAG', 'LangChain', 'OpenAI'],
        summary: 'A conversational AI interface built to help North Carolina residents quickly find vehicle registration wait times and obscure policy requirements.',
        metrics: ['Reduced Bounce Rate 40%'],
        links: { github: 'https://github.com/SwarneshJ/myAI3', live: 'https://my-ai-3-pearl-alpha.vercel.app/' },
        hasMemo: false,
        image: '/assets/dmv-chatbot.png'
    }
];
