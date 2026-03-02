import { Mail, Linkedin, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>Swarnesh Jha</h3>
                        <p>Where business thinking meets technical execution. Innovating at the intersection of AI, Product Management, and Cloud Architecture.</p>
                    </div>

                    <div className="footer-social">
                        <a href="mailto:swarnesh.jha@example.com" aria-label="Email">
                            <Mail size={20} />
                        </a>
                        <a href="https://linkedin.com/in/swarnesh7" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <Linkedin size={20} />
                        </a>
                        <a href="https://github.com/SwarneshJ" target="_blank" rel="noreferrer" aria-label="GitHub">
                            <Github size={20} />
                        </a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Swarnesh Jha. Crafted with analytical rigor.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
