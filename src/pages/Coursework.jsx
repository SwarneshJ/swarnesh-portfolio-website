import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Lightbulb, Users, PieChart, Zap, Globe, DollarSign, Target } from 'lucide-react';
import './Coursework.css';

// Mock Lucide Icon until imported globally
const Database = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>;

const courses = [
    {
        id: 'mba714',
        code: 'MBA 714',
        title: 'Business Statistics & Analytics',
        tag: 'Core',
        situation: 'Evaluated historical data to optimize pricing and inventory for a simulated retail environment.',
        learned: 'Applied multi-variable regression, hypothesis testing, and probabilistic forecasting models to derive concrete recommendations.',
        shift: 'Moved from simple data-pulling workflows to designing rigorous statistical experiments to validate feature viability.',
        icon: <TrendingUp size={24} />
    },
    {
        id: 'mba703',
        code: 'MBA 703',
        title: 'Operations',
        tag: 'Core',
        situation: 'Analyzed the operational bottlenecks of the Toyota Production System and a local healthcare clinic.',
        learned: 'Mastered queuing theory, capacity planning, and Lean Six Sigma principles for continuous process improvement.',
        shift: 'Began viewing software microservices not just as code architecture, but as discrete operational nodes that require capacity planning.',
        icon: <Database size={24} />
    },
    {
        id: 'mba800',
        code: 'MBA 800',
        title: 'Business Strategy',
        tag: 'Core',
        situation: 'Dissected competitive moats (e.g., Apple\'s ecosystem, Netflix\'s content scale).',
        learned: 'Utilized Porter\'s Five Forces and the VRIN framework to evaluate sustainable competitive advantages in tech markets.',
        shift: 'Transitioned from asking "Can we build this?" to "How does building this defend our market position against new entrants?"',
        icon: <Lightbulb size={24} />
    },
    {
        id: 'mba742',
        code: 'MBA 742',
        title: 'Data Science & AI',
        tag: 'Elective',
        situation: 'Designed an analytical approach for predicting customer churn using raw CRM datasets.',
        learned: 'Studied the business implications of AI/ML trade-offs (e.g., Precision vs. Recall) and algorithmic bias.',
        shift: 'Strengthened ability to bridge the gap between data science teams and executive stakeholders by translating ML metrics (F1-score, AUC) into revenue impact.',
        icon: <BookOpen size={24} />
    },
    {
        id: 'mba713',
        code: 'MBA 713',
        title: 'Financial Accounting',
        tag: 'Core',
        situation: 'Analyzed 10-K statements to dissect revenue recognition and cash flow health of SaaS competitors.',
        learned: 'Deconstructed balance sheets, income statements, and statements of cash flow to understand enterprise valuation.',
        shift: 'Shifted perspective from optimizing cloud compute costs to understanding how capitalized software development impacts EBITDA and overall company valuation.',
        icon: <PieChart size={24} />
    },
    {
        id: 'mba710',
        code: 'MBA 710',
        title: 'Corporate Finance',
        tag: 'Core',
        situation: 'Built discounted cash flow (DCF) models to evaluate M&A targets and new product line investments.',
        learned: 'Applied WACC, NPV, and IRR methodologies to value strategic initiatives under extreme uncertainty.',
        shift: 'Learned to justify technical refactoring and technical debt payoff using rigorous NPV frameworks, effectively securing budget from non-technical stakeholders.',
        icon: <DollarSign size={24} />
    },
    {
        id: 'mba726',
        code: 'MBA 726',
        title: 'Leading & Managing',
        tag: 'Core',
        situation: 'Navigated simulated organizational crises and change management scenarios across global matrices.',
        learned: 'Explored frameworks for conflict resolution, organizational design, and aligning incentives across divergent teams.',
        shift: 'Realized that launching a product is only 20% engineering; the other 80% is orchestrating alignment between sales, marketing, legal, and engineering siloes.',
        icon: <Users size={24} />
    },
    {
        id: 'mba778',
        code: 'MBA 778',
        title: 'Strategic Innovation',
        tag: 'Elective',
        situation: 'Formulated a disruption strategy for an incumbent tech firm facing pressure from agile AI startups.',
        learned: 'Applied Christensen\'s Innovator\'s Dilemma and Resource Allocation Processes to map disruption vulnerabilities.',
        shift: 'Transitioned from building features customers ask for today, to anticipating orthogonal technological vectors that will render the current product obsolete tomorrow.',
        icon: <Zap size={24} />
    },
    {
        id: 'mba834',
        code: 'MBA 834',
        title: 'Marketing Strategy & Analytics',
        tag: 'Core',
        situation: 'Optimized digital marketing spend across multiple acquisition channels using customer lifetime value (CLV) constraints.',
        learned: 'Modeled Customer Acquisition Cost (CAC) against CLV, segmented target audiences, and drove positioning.',
        shift: 'Embedded tracking telemetry earlier in the software lifecycle, treating activation funnels and product analytics as core engineering requirements.',
        icon: <Target size={24} />
    },
    {
        id: 'mba803',
        code: 'MBA 803',
        title: 'Global Macroeconomics',
        tag: 'Core',
        situation: 'Assessed the impact of central bank interest rate hikes on venture capital funding environments and tech valuations.',
        learned: 'Analyzed exchange rates, monetary policy, and global supply chain vulnerabilities.',
        shift: 'Began architecting global payment systems with an awareness of macro-regulatory shifts and cross-border currency exposure.',
        icon: <Globe size={24} />
    }
];

const Coursework = () => {
    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-glow" style={{ top: '30%', right: '10%' }} />

            <section className="section-padding">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-5"
                    >
                        <span className="badge">Academic Rigor</span>
                        <h1 className="section-title">UNC Kenan-Flagler Coursework</h1>
                        <p className="section-sub" style={{ maxWidth: '700px', margin: '0 auto' }}>
                            Transforming academic frameworks into actionable product logic. Each course treated as a distinct "mini-case".
                        </p>
                    </motion.div>

                    <div className="coursework-grid">
                        {courses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                className="course-card glass-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="course-header flex-between mb-4">
                                    <div>
                                        <span className="pill outline mb-2 block w-fit">{course.tag}</span>
                                        <h3>{course.code}: {course.title}</h3>
                                    </div>
                                    <div className="course-icon">{course.icon}</div>
                                </div>

                                <div className="course-section">
                                    <h4>Situation</h4>
                                    <p>{course.situation}</p>
                                </div>

                                <div className="course-section">
                                    <h4>Core Learning</h4>
                                    <p>{course.learned}</p>
                                </div>

                                <div className="course-section highlight">
                                    <h4>Shift in Product Thinking</h4>
                                    <p>{course.shift}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};


export default Coursework;
