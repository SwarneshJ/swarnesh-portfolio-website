import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Download } from 'lucide-react';
import './Experience.css';

const experienceData = [
    {
        type: 'work',
        company: 'JPMorgan Chase & Co.',
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
        degree: 'Master of Business Administration (MBA)',
        year: 'Expected Aug 2025'
    },
    {
        school: 'BITS Pilani',
        degree: 'Master of Science (M.S.) in Mathematics',
        year: '2015 - 2020'
    },
    {
        school: 'BITS Pilani',
        degree: 'Bachelor of Engineering (B.E.)',
        year: '2015 - 2020'
    }
];

const Experience = () => {
    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-glow" style={{ top: '10%', left: '10%' }} />

            {/* Header */}
            <section className="section-padding pb-0">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-5"
                    >
                        <span className="badge">Track Record</span>
                        <h1 className="section-title">Experience & Education</h1>
                        <p className="section-sub" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            Building enterprise-grade systems and shaping product strategies.
                        </p>
                        <motion.a
                            href="https://drive.google.com/file/d/19LxM7ifJ3aZU2mFYOLjswtsuBRFqUSw-/view?usp=sharing"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary mt-4 inline-flex"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download size={18} style={{ marginRight: '0.5rem' }} /> Download Full Resume
                        </motion.a>
                    </motion.div>
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
                                    <div>
                                        <h3 className="company-title">{company.company}</h3>
                                        <p className="company-meta">{company.group}</p>
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
                                <h3 className="edu-school">{edu.school}</h3>
                                <p className="edu-degree">{edu.degree}</p>
                                <p className="edu-year">{edu.year}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </motion.div>
    );
};

export default Experience;
