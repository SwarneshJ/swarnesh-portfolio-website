import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { Walker } from './JourneyScene';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            {/* the walker's cameo: still going, right across the footer */}
            <div className="footer-walkway" aria-hidden="true">
                <div className="footer-walker">
                    <Walker />
                </div>
            </div>

            <div className="container">
                <p className="footer-eyebrow">From Pilani to New York — the walk continues.</p>
                <h2 className="footer-headline">
                    Let's build something <span className="footer-accent">worth walking to.</span>
                </h2>
                <a className="footer-mail" href="mailto:swarnesh.jha2011@gmail.com">
                    swarnesh.jha2011@gmail.com <ArrowUpRight size={22} />
                </a>

                <div className="footer-base">
                    <p>&copy; 2026 Swarnesh Jha</p>

                    <div className="footer-social">
                        <a href="mailto:swarnesh.jha2011@gmail.com" aria-label="Email">
                            <Mail size={20} />
                        </a>
                        <a href="https://linkedin.com/in/swarnesh7" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <Linkedin size={20} />
                        </a>
                        <a href="https://github.com/SwarneshJ" target="_blank" rel="noreferrer" aria-label="GitHub">
                            <Github size={20} />
                        </a>
                    </div>

                    <p>Chapel Hill, NC</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
