import { motion } from 'framer-motion';
import './Frameworks.css';

const frameworks = [
    {
        category: "Communication",
        items: [
            {
                title: "The Minto Pyramid",
                definition: "A top-down structure communicating the core answer first, followed by supporting grouped arguments.",
                example: "Used to restructure a convoluted 40-slide technical cloud architecture review into a 3-page executive brief for JPMC MDs.",
                icon: "🔺"
            }
        ]
    },
    {
        category: "Product & Prioritization",
        items: [
            {
                title: "ICE Scoring (Impact, Confidence, Ease)",
                definition: "A rapid prioritization matrix multiplying Impact x Confidence x Ease to stack-rank product backlog items.",
                example: "Deployed alongside the Head of Product to brutally prioritize Q3 roadmap items, deferring a complex dashboard rebuild in favor of high-yield API integrations.",
                icon: "🧊"
            },
            {
                title: "KPI Trees",
                definition: "Breaking down a lagging North Star Metric into actionable leading indicators.",
                example: "Mapped 'Annual Revenue' down to 'Activation Rate' and 'Time-to-First-Transaction' to give engineering clear local optimization targets.",
                icon: "🌳"
            }
        ]
    },
    {
        category: "Strategy & Economics",
        items: [
            {
                title: "VRIN Model",
                definition: "Assessing competitive advantage by evaluating if a resource is Valuable, Rare, Inimitable, and Non-substitutable.",
                example: "Analyzed an internal ML model to determine if it was a true competitive moat or easily replicable by competitors using OpenAI APIs.",
                icon: "🛡️"
            },
            {
                title: "TAM / SAM / SOM",
                definition: "Top-down / Bottom-up methodology for correctly sizing market opportunities and setting realistic GTM targets.",
                example: "Calculated bottom-up Serviceable Obtainable Market (SOM) for an AI startup based on realistic enterprise sales capacities.",
                icon: "🎯"
            }
        ]
    }
];

const Frameworks = () => {
    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-glow" style={{ top: '60%', right: '40%' }} />

            <section className="section-padding">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-5"
                    >
                        <span className="badge">Toolkit</span>
                        <h1 className="section-title">Mental Models & Frameworks</h1>
                        <p className="section-sub" style={{ maxWidth: '700px', margin: '0 auto' }}>
                            Cognitive shortcuts for cutting through noise and aligning cross-functional teams around a shared truth.
                        </p>
                    </motion.div>

                    <div className="frameworks-container">
                        {frameworks.map((category, catIdx) => (
                            <div key={category.category} className="framework-category">
                                <motion.h2
                                    className="category-title"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    {category.category}
                                </motion.h2>

                                <div className="frameworks-grid">
                                    {category.items.map((item, itemIdx) => (
                                        <motion.div
                                            key={item.title}
                                            className="framework-card glass-card"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: itemIdx * 0.1 }}
                                        >
                                            <div className="fc-header">
                                                <span className="fc-icon">{item.icon}</span>
                                                <h3>{item.title}</h3>
                                            </div>

                                            <div className="fc-content">
                                                <p className="fc-def"><strong>Definition:</strong> {item.definition}</p>
                                                <p className="fc-ex"><strong>In Practice:</strong> {item.example}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Frameworks;
