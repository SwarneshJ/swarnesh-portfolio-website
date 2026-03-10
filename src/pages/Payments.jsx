import { motion } from 'framer-motion';
import { ArrowLeft, Server, CreditCard, ShieldCheck, Zap, Database, Globe, Layers, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Payments.css';

// Animation variants
const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Payments = () => {
    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-glow" style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)' }} />

            {/* Hero Section */}
            <section className="section-padding payments-hero offset-nav">
                <div className="container text-center">
                    <motion.div variants={staggerContainer} initial="hidden" animate="show">
                        <motion.div variants={fadeUp} className="badge mx-auto mb-4">
                            FinTech & Payments Architecture
                        </motion.div>
                        <motion.h1 variants={fadeUp} className="section-title payments-title">
                            Deep Expertise in <br />
                            <span className="text-gradient">Global Payments Infrastructure</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="section-sub mx-auto" style={{ maxWidth: '800px' }}>
                            Engineered the backbone of the JPMorgan Chase Commerce Platform, orchestrating millions of daily transactions globally through highly scalable, cloud-native microservices.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-secondary)' }}
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>Scroll to Explore</span>
                            <ChevronDown size={28} style={{ color: 'var(--accent-blue)' }} />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Architecture Section */}
            <section className="section-padding bg-alternate">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-heading"><Server className="heading-icon" /> JPMC Commerce Platform</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
                            A breakdown of the core processing systems I managed, routing millions of daily payments across Visa, Mastercard, AMEX, and international gateways.
                        </p>
                    </motion.div>

                    <div className="payments-grid">
                        <motion.div className="glass-card tech-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="tech-icon-wrapper"><ShieldCheck size={32} /></div>
                            <h3>Secured Merchant API Flow</h3>
                            <p>Clients interface with IDA for signed access tokens embedded with client keys, roles, and MIDs. Requests are routed through Apigee where public key verification ensures strict data boundary compliance before hitting internal services.</p>
                        </motion.div>

                        <motion.div className="glass-card tech-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <div className="tech-icon-wrapper"><CreditCard size={32} /></div>
                            <h3>Intelligent Authorizations</h3>
                            <p>Authorization engine fetches Merchant Profiles and BIN data from DynamoDB to determine the optimal payment rail (e.g., Stratus vs. R-switch). This smart-routing algorithm significantly decreases network processing costs.</p>
                        </motion.div>

                        <motion.div className="glass-card tech-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <div className="tech-icon-wrapper"><Layers size={32} /></div>
                            <h3>Advanced Target States</h3>
                            <p>Orchestrated complex features like <strong>Incremental Authorizations</strong>, <strong>Split Captures / Multi-Capture</strong> for deferred shipments, and <strong>Re-Authorizations</strong> extending cart expiry validations.</p>
                        </motion.div>

                        <motion.div className="glass-card tech-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                            <div className="tech-icon-wrapper"><Database size={32} /></div>
                            <h3>Event-Driven Ledger</h3>
                            <p>Transaction states are captured in DynamoDB, streamed via Kinesis, and processed through SQS to a Message Builder Lambda. Generates real-time events (PaymentApproved, PaymentClosed) feeding into the final Clearing file.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stablecoins / Future of Money */}
            <section className="section-padding">
                <div className="container">
                    <div className="stablecoin-banner glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
                        <div className="bg-glow" style={{ top: '-50%', right: '-20%', background: 'radial-gradient(circle, rgba(62,139,255,0.15) 0%, rgba(255,255,255,0) 70%)' }} />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ position: 'relative', zIndex: 2 }}
                        >
                            <div className="flex-between align-center mobile-col">
                                <div style={{ flex: 1, paddingRight: '2rem' }}>
                                    <div className="badge mb-3">Thesis: Programmable Money</div>
                                    <h2 className="section-title mb-3">The Future is  <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)' }}>Stablecoins</span></h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                                        My exposure to the latency and fees embedded in traditional T+2 clearing and settlement networks has driven my deep interest in Stablecoins and blockchain finality.
                                    </p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                        By replacing batch-processed correspondent banking with tokenized, programmable ledgers (like USDC), we can achieve instant, cross-border settlement at a fraction of the cost—fundamentally redefining global B2B money movement and unit economics.
                                    </p>
                                </div>
                                <div className="stablecoin-visual hide-mobile">
                                    <div className="floating-icons">
                                        <motion.div
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="icon-circle"
                                        >
                                            <Zap size={32} color="#00C9FF" />
                                        </motion.div>
                                        <motion.div
                                            animate={{ y: [0, 15, 0] }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                            className="icon-circle"
                                        >
                                            <Globe size={32} color="#92FE9D" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className="text-center pb-5">
                <Link to="/" className="btn btn-secondary">
                    <ArrowLeft size={18} /> Back to Home
                </Link>
            </div>

        </motion.div>
    );
};

export default Payments;
