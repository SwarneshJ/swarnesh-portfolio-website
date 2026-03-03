import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Download } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)' }}
        >
            <div className="bg-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px' }} />

            <section className="contact-section">
                <motion.div
                    className="contact-container glass-card"
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="badge mx-auto block w-fit mb-4">Get In Touch</span>
                    <h1 className="contact-title text-gradient">Let's Build Something.</h1>
                    <p className="contact-subtitle">
                        I am always open to discussing product strategy, cloud architecture, AI workflows, or consulting opportunities.
                    </p>

                    <div className="social-links-grid">
                        <motion.a
                            href="mailto:swarnesh_jha@kenan-flagler.unc.edu"
                            className="social-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Mail className="social-icon" size={24} />
                            <span>Email Me</span>
                        </motion.a>

                        <motion.a
                            href="https://linkedin.com/in/swarnesh7"
                            target="_blank"
                            className="social-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Linkedin className="social-icon" size={24} />
                            <span>LinkedIn</span>
                        </motion.a>

                        <motion.a
                            href="https://github.com/SwarneshJ"
                            target="_blank"
                            className="social-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Github className="social-icon" size={24} />
                            <span>GitHub</span>
                        </motion.a>
                    </div>

                    <div className="resume-cta">
                        <p>Looking for a structured overview of my experience?</p>
                        <motion.a
                            href="https://drive.google.com/file/d/19LxM7ifJ3aZU2mFYOLjswtsuBRFqUSw-/view?usp=sharing"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download size={18} style={{ marginRight: '0.5rem' }} /> Download Resume (.pdf)
                        </motion.a>
                    </div>
                </motion.div>
            </section>
        </motion.div>
    );
};

export default Contact;
