import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Lock, EyeOff, LifeBuoy, Globe, Calculator, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './FifaStory.css';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

// Every argument we kept having was a feature nobody had built yet.
const fightToFeature = [
    { icon: Lock, fight: 'People changed their vote mid-match.', feature: 'Votes lock the moment the match kicks off.' },
    { icon: LifeBuoy, fight: 'My thumb slipped, I put it back.', feature: 'One-time lifeline: a single 30-min grace window, once per tournament.' },
    { icon: EyeOff, fight: 'You could see picks in a poll, so people copied.', feature: 'Hidden votes. You see who voted, never what they picked.' },
    { icon: Globe, fight: 'Nobody wanted to install anything.', feature: 'A website. Zero install, six logins, password resets.' },
    { icon: Calculator, fight: 'One friend tallied scores by hand every night.', feature: 'A standings page that adds everything up for you.' },
    { icon: History, fight: 'A new app on day 18 would start cold.', feature: 'Backfilled all 18 days of WhatsApp history, live from minute one.' }
];

const FifaStory = () => {
    useEffect(() => {
        document.title = 'I Lost to a WhatsApp Poll | Swarnesh Jha';
    }, []);

    return (
        <motion.div
            className="page-container fifa-story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-glow" style={{ top: '-10%', left: '-10%' }} />

            {/* Hero */}
            <section className="section-padding" style={{ paddingBottom: '3rem' }}>
                <div className="container">
                    <motion.div variants={fadeUp} initial="hidden" animate="show">
                        <Link to="/projects" className="fs-back">
                            <ArrowLeft size={16} /> Back to Projects
                        </Link>
                        <span className="badge">Product Story · Case Study</span>
                        <h1 className="hero-title fs-title">
                            I Lost to a <span className="text-gradient">WhatsApp Poll</span>
                        </h1>
                        <p className="fs-subtitle">
                            FIFA World Cup 2026 Prediction Pool. What happened when I shipped
                            something better than a group chat, and the group chat won anyway.
                        </p>

                        <div className="fs-cta">
                            <a href="https://fifa-world-cup-prediction-pool.vercel.app/demo" target="_blank" rel="noreferrer" className="btn btn-primary">
                                <ExternalLink size={18} /> View Live Demo
                            </a>
                            <a href="https://github.com/SwarneshJ/fifa-world-cup-prediction-pool" target="_blank" rel="noreferrer" className="btn btn-secondary">
                                <Github size={18} /> View Code
                            </a>
                        </div>

                        <div className="fs-stack">
                            {['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Auth.js', 'Tailwind', 'Vercel'].map((t) => (
                                <span key={t} className="fs-pill">{t}</span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="fs-hero-img"
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        transition={{ delay: 0.2 }}
                    >
                        <img src="/assets/fifa-prediction-pool.png" alt="FIFA World Cup 2026 Prediction Pool" />
                    </motion.div>
                </div>
            </section>

            {/* Narrative */}
            <section className="section-padding fs-narrative-section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <article className="fs-article">

                        <h2 className="fs-h">The setup</h2>
                        <p>Six friends. One WhatsApp group. A World Cup. That is the whole setup.</p>
                        <p>
                            We wanted to play a prediction game. Pick who wins each match, keep score, earn the right
                            to be smug about it. We went looking for an app to do it for us. Nothing good. So one
                            friend just made a second WhatsApp group, switched off everyone's permission to post, and
                            started running the whole thing by hand.
                        </p>
                        <p>
                            Every morning he put up polls for that day's games. USA, Draw, AUS. Everyone voted.
                            Right pick, plus one. Wrong, nothing. Forgot to vote, minus one. At night he added it all
                            up and posted the standings. It was a lot of work, and he did it anyway, every single day.
                        </p>

                        <h2 className="fs-h">And then the fights started. The good kind.</h2>
                        <p>
                            One guy changed his vote in the middle of a match. Swore it was an accident, said he had
                            the right team picked, his thumb slipped during the game, and he just put it back. Nobody
                            believed him. We argued about it for a whole evening. Does he get the minus one? Was it
                            really a slip? How would you even know?
                        </p>
                        <p>
                            A few days later someone else changed his vote five minutes after kickoff. Same fight,
                            louder. We ended up making a rule on the spot: everyone gets one lifeline. You can change
                            a vote once, but only in the first 30 minutes, and you have to announce it on the main
                            group first. No sneaking around.
                        </p>
                        <p>
                            Then people started accusing each other of copying. Because in a poll you can see what
                            everyone picks. So you wait, you peek, you copy whoever usually gets it right. More fighting.
                        </p>

                        <blockquote className="fs-quote">
                            Every dumb argument we kept having was actually a feature nobody had built yet.
                        </blockquote>

                        <p>
                            I was watching all of this, and somewhere in the middle of it, it clicked. The
                            vote-changing fight meant votes should just lock when the match starts. The lifeline was a
                            real thing I could code. The copying meant votes should be hidden. And the reason nobody
                            wanted an app was simple: nobody wanted to install anything.
                        </p>
                        <p className="fs-build-line">So I built a website.</p>
                    </article>

                    {/* Fight -> Feature mapping */}
                    <div className="fs-map">
                        {fightToFeature.map(({ icon: Icon, fight, feature }, i) => (
                            <motion.div
                                className="fs-map-card glass-card"
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                            >
                                <div className="fs-map-icon"><Icon size={20} /></div>
                                <p className="fs-map-fight">{fight}</p>
                                <div className="fs-map-arrow">becomes</div>
                                <p className="fs-map-feature">{feature}</p>
                            </motion.div>
                        ))}
                    </div>

                    <article className="fs-article">
                        <h2 className="fs-h">What I shipped</h2>
                        <p>
                            Six logins, one for each of us, with a way to reset your password. All the fixtures loaded
                            in. You could vote starting 24 hours before a game, and the moment it kicked off, your vote
                            locked. Votes were secret. You could see who had voted but not who they picked, so no more
                            copying. Four of us got the lifeline as a grace window, 30 minutes after kickoff to change
                            a pick, but you could only ever use it once in the whole tournament. And a standings page
                            that added everything up for you.
                        </p>
                        <p>
                            The part I was proudest of: I went back through the entire WhatsApp history and pulled out
                            every old vote, so the site launched with all 18 days already in it, scores and all. It was
                            up to date from minute one.
                        </p>

                        <h2 className="fs-h">The launch</h2>
                        <p>
                            I showed everyone. They loved it. Genuinely loved it. They were surprised I had actually
                            gone and built the thing. We decided to run the website and the polls side by side for a few
                            days, just to be sure nothing was broken. First day had a couple of bugs. I fixed them.
                        </p>
                        <p>
                            And then, slowly, people stopped voting on the website. One missed it. Then two. When I
                            asked why, one friend just said it: voting in two places is annoying.
                        </p>
                        <p>
                            So we took a vote. Website or polls. Four out of six picked the polls. The thing I built
                            got switched off.
                        </p>

                        <h2 className="fs-h">Three things went wrong</h2>
                        <p>
                            For a while I told myself it just wasn't what people wanted. That is not true. They wanted
                            it. They were excited about it. Looking back, three things went wrong, and I only see them
                            clearly now.
                        </p>

                        <div className="fs-lessons">
                            <div className="fs-lesson">
                                <span className="fs-lesson-num">01</span>
                                <div>
                                    <h3>Timing.</h3>
                                    <p>
                                        I built it on day 18. The group stage was almost over. I was asking everyone to
                                        learn something new for a game that was nearly finished.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-lesson">
                                <span className="fs-lesson-num">02</span>
                                <div>
                                    <h3>Running both at once.</h3>
                                    <p>
                                        I thought that was the safe choice. It was the worst one. I never took the old
                                        thing away, I just piled new work on top of it. If you want people to move to a
                                        new thing, you have to take the old thing away. You cannot leave it running and
                                        hope they walk over on their own.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-lesson">
                                <span className="fs-lesson-num">03</span>
                                <div>
                                    <h3>The fights were the whole point.</h3>
                                    <p>
                                        The accusing, the arguing, the lifeline drama, all of it, that was the game.
                                        That was us hanging out. I looked at all of that and called it a problem. I
                                        cleaned it up. I made everything fair and quiet and anonymous, and I moved it
                                        out of the group chat where all the talking actually happened. I built something
                                        better and accidentally deleted the fun.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p>So they went back to the polls. And honestly, they were right.</p>
                        <p>
                            I am not upset about it. I got to watch a real little product get born out of six friends
                            shouting at each other, I built it, and they used it long enough to teach me something I
                            would not have learned if it had just worked.
                        </p>

                        <blockquote className="fs-quote fs-quote-final">
                            Better is not the same as winning. Sometimes the mess is the magic.
                            The hard part is knowing what to leave alone.
                        </blockquote>
                    </article>

                    <div className="fs-bottom-cta">
                        <a href="https://fifa-world-cup-prediction-pool.vercel.app/demo" target="_blank" rel="noreferrer" className="btn btn-primary">
                            <ExternalLink size={18} /> Try the Live Demo
                        </a>
                        <Link to="/projects" className="btn btn-secondary">
                            <ArrowLeft size={18} /> All Projects
                        </Link>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default FifaStory;
