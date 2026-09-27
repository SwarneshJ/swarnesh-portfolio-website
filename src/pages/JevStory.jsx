import { motion } from 'framer-motion';
import { ArrowLeft, Github, Zap, DollarSign, XCircle, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Magnetic from '../components/Magnetic';
import './JevStory.css';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

// What I wanted going in, and what actually made it work.
const wantToGot = [
    { icon: Zap, want: 'A classifier without months of labeling first.', got: 'Categories defined at runtime, as plain-language criteria. No training set, no fine-tuning run.' },
    { icon: DollarSign, want: 'A pass over 12,000 reviews that wouldn\'t rack up a real bill.', got: '$0.042 per million input tokens, and output is free, since a number costs nothing to print.' },
    { icon: XCircle, want: 'A "customer service complaint" bucket.', got: 'A category that never fired once, because I\'d defined it wrong.' },
    { icon: Layers, want: 'One clean label per review.', got: 'Reviews that carry two or three complaints at once, and a second question to catch the one I would have thrown away.' }
];

const JevStory = () => {
    useEffect(() => {
        document.title = 'Meeting Jev | Swarnesh Jha';
    }, []);

    return (
        <motion.div
            className="page-container jev-story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-glow" style={{ top: '-10%', left: '-10%' }} />

            {/* Hero */}
            <section className="section-padding" style={{ paddingBottom: '3rem' }}>
                <div className="container">
                    <motion.div variants={fadeUp} initial="hidden" animate="show">
                        <Link to="/projects" className="js-back">
                            <ArrowLeft size={16} /> Back to Projects
                        </Link>
                        <span className="badge">Product Story · Technical Evaluation</span>
                        <h1 className="hero-title js-title">
                            Meeting <span className="text-gradient">Jev</span>
                        </h1>
                        <p className="js-subtitle">
                            A weekend spent testing a model that never writes a sentence, and why I built
                            a two-stage review pipeline instead of trusting it, or a fine-tuned RoBERTa, on its own.
                        </p>

                        <div className="js-cta">
                            <Magnetic>
                                <a href="https://github.com/SwarneshJ/Jev-Customer-Review-Classifier" target="_blank" rel="noreferrer" className="btn btn-primary">
                                    <Github size={18} /> View Code
                                </a>
                            </Magnetic>
                        </div>

                        <div className="js-stack">
                            {['Jev (System One)', 'Claude', 'Python', 'Pandas'].map((t) => (
                                <span key={t} className="js-pill">{t}</span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="js-hero-img"
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        transition={{ delay: 0.2 }}
                    >
                        <img src="/assets/jev-cascade.svg" alt="Two-stage review triage cascade: Jev classifies, Claude writes the fix for the cases that need one" />
                    </motion.div>
                </div>
            </section>

            {/* Narrative */}
            <section className="section-padding js-narrative-section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <article className="js-article">

                        <h2 className="js-h">The weekend I met Jev</h2>
                        <p>
                            This weekend, I decided to spend some time with the latest hit in the AI world, Jev.
                        </p>
                        <p>
                            Jev is not a chatbot. It doesn't write essays or hold a conversation. TypeSafe AI, the
                            company behind it, calls it a "System One" model, a nod to Daniel Kahneman's idea of
                            fast, intuitive thinking, the opposite of the slow, deliberate "System Two" most AI
                            models try to imitate. Instead of generating text, Jev answers a direct question with a
                            number. That might be a probability, a chosen label, or a score on a scale. Nothing more.
                        </p>
                        <p>
                            That sounded almost too simple to be useful. So I picked a real, messy problem and tried
                            to make Jev solve it. I pointed it at thousands of e-commerce reviews and asked it to
                            figure out, fast and cheap, what each one was actually complaining about.
                        </p>

                        <h2 className="js-h">What Jev actually is</h2>
                        <p>
                            Most AI headlines right now are about models that write, chat, or generate images. Jev
                            does none of that. Give it a piece of text and a question, and instead of a paragraph, it
                            hands back a number.
                        </p>
                        <p>
                            Ask "is this review about a sizing problem?" and it answers with a probability between 0
                            and 1. Ask it to sort a review into one of six categories, and it hands back the category
                            plus how confident it is. That confidence part is what's interesting. Most models sound
                            sure of everything. Jev will actually say "I'm 60% sure" when it's genuinely unsure, and
                            "I'm 98% sure" when the answer is obvious &mdash; a byproduct of how TypeSafe trains it, with
                            reinforcement learning aimed directly at calibration, not just at getting the label right.
                        </p>
                        <p>
                            The pitch is that this narrower job, deciding rather than writing, lets it be fast and
                            absurdly cheap. It costs about $0.042 for every million words of input. There's
                            basically no output cost, since there's no real output, just a number. TypeSafe quotes
                            end-to-end latency in the 70&ndash;500ms range, most of it around 100ms, which they claim
                            is somewhere between 40x and 200x faster than a frontier LLM doing the same call.
                        </p>

                        <h2 className="js-h">The problem I picked</h2>
                        <p>
                            Online stores get thousands of reviews a week, and most of them get skimmed at best, if
                            that. Somewhere in there is real signal. Which products run small, which ones arrive
                            broken, which listings are lying about what's actually in the box.
                        </p>
                        <p>I built a two-step pipeline to read all of it.</p>
                    </article>

                    {/* Cascade diagram, repeated in-line at a legible size */}
                    <motion.div
                        className="js-diagram"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <img src="/assets/jev-cascade.svg" alt="Jev classifies every review. Routine cases are logged. Cases that need a human decision are escalated, and Claude writes the fix." />
                        <p className="js-diagram-caption">the review triage cascade &middot; 2 stages, 1 decision</p>
                    </motion.div>

                    <article className="js-article">
                        <p>
                            Jev reads every review and sorts it into one of six buckets: things like a fit issue, a
                            quality defect, a shipping problem, a customer-service complaint, a listing mismatch, or
                            just a normal review. Only the reviews where Jev is unsure, or where it found something a
                            category manager should actually act on, get escalated. Claude only ever sees that
                            smaller pile, and it isn't classifying anything again. It writes the actual fix, something
                            like a sizing-guide note, a listing correction, or a merchandising flag.
                        </p>

                        <h2 className="js-h">Why not just fine-tune another RoBERTa</h2>
                        <p>
                            I've actually built this exact kind of classifier before. My <Link to="/projects" className="js-inline-link">Business-Grade Review Classifier</Link> fine-tuned a RoBERTa
                            model to sort GrubHub reviews, and it's genuinely good: 88% F1, and cheap to run once it
                            exists. But "once it exists" is doing a lot of work in that sentence. Getting there meant
                            benchmarking six GenAI models against human labelers, picking the best one to auto-label
                            15,000 reviews, and then actually running the fine-tuning job. That's real infrastructure
                            for a single, fixed task.
                        </p>
                        <p>
                            Jev skips all of that. The six categories in this pipeline aren't training labels, they're
                            a paragraph of criteria I wrote and can rewrite the same afternoon. There's no dataset to
                            collect and no model to retrain when a category turns out to be wrong, which, as it
                            happened, one of mine was on the first pass. The honest trade-off: a fine-tuned RoBERTa,
                            once it exists, is a model I fully own, running at effectively zero marginal cost per
                            call. Jev is an API call with a small ongoing cost and no infrastructure at all, and it's
                            far faster to stand up or redefine. For a stable, extremely high-volume task, the RoBERTa
                            math wins eventually. For a weekend spent figuring out whether the categories are even
                            right yet, Jev won by not making me wait a week to find out.
                        </p>

                        <h2 className="js-h">What I found</h2>
                        <p>
                            Before trusting any of this, I hand-labeled 40 real reviews myself and checked them
                            against my own label definitions. Two things broke immediately, and both were useful.
                        </p>
                        <p>
                            First, one of my six categories, "customer service complaint," never fired once. Reviews
                            that said "I returned it" were really fit or quality complaints, not complaints about the
                            support process itself. I had to rewrite the category to require an actual gripe about
                            support, not just the fact that a return happened.
                        </p>
                        <p>
                            Second, real reviews rarely stick to one topic. One review complained the material wasn't
                            suede like advertised, said the metal hardware felt cheap, and mentioned delivery was a
                            day late. Three different problems in four sentences. A single "pick one label" question
                            would have thrown two of those away. So I added a second, almost-free question asking Jev
                            to name a second issue if there was one.
                        </p>
                        <blockquote className="js-quote">
                            Neither of these came from reading a paper about Jev. They came from reading actual
                            reviews and being wrong on purpose first.
                        </blockquote>
                    </article>

                    {/* Want -> Got mapping */}
                    <div className="js-map">
                        {wantToGot.map(({ icon: Icon, want, got }, i) => (
                            <motion.div
                                className="js-map-card glass-card"
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
                            >
                                <div className="js-map-icon"><Icon size={20} /></div>
                                <p className="js-map-want">{want}</p>
                                <div className="js-map-arrow">what I got</div>
                                <p className="js-map-got">{got}</p>
                            </motion.div>
                        ))}
                    </div>

                    <article className="js-article">
                        <h2 className="js-h">The actual cost of never writing a sentence</h2>
                        <p>
                            Here's the back-of-the-envelope math, and I'm calling it that on purpose. At roughly 60
                            words per review across 12,000 reviews, running the classification pass through both
                            questions works out to under a million input tokens, which puts the entire run at
                            around <strong>four cents</strong> at Jev's published rate. There's no meaningful output cost to add,
                            since the entire response is a label and a confidence score.
                        </p>
                        <p>
                            For scale, TypeSafe's own published comparison on a set of decision-style tasks put Jev at
                            roughly the same agreement rate as Claude Sonnet 5, at around 293 times lower cost and 195
                            times lower latency. That's their number, on their benchmark, not mine, and it's worth
                            saying plainly: it measures agreement with two frontier models used as a consensus
                            label, not ground truth. I'm citing it as a reason the economics were worth testing, not
                            as proof the categories in my own pipeline are right. That's what the 40 hand-labeled
                            reviews were for.
                        </p>

                        <h2 className="js-h">What I'd still want to check</h2>
                        <p>
                            For a while I was tempted to call this done after two afternoons. It isn't. Three things
                            stand between this and something I'd actually trust in production.
                        </p>

                        <div className="js-lessons">
                            <div className="js-lesson">
                                <span className="js-lesson-num">01</span>
                                <div>
                                    <h3>Forty reviews is a vibe check, not a benchmark.</h3>
                                    <p>
                                        It was enough to catch two real bugs in my category definitions. It is not
                                        enough to claim a precision or recall number I'd stand behind. A proper
                                        labeled eval set is the next thing to build, not the last.
                                    </p>
                                </div>
                            </div>
                            <div className="js-lesson">
                                <span className="js-lesson-num">02</span>
                                <div>
                                    <h3>Claude's half of the pipeline is still a sketch.</h3>
                                    <p>
                                        Jev's triage is running. The "Claude writes the fix" stage, the part that
                                        turns an escalated review into an actual sizing note or listing correction,
                                        exists as a plan, not yet as shipped code.
                                    </p>
                                </div>
                            </div>
                            <div className="js-lesson">
                                <span className="js-lesson-num">03</span>
                                <div>
                                    <h3>I only tested this on one kind of text.</h3>
                                    <p>
                                        Reviews are short, messy, and topically narrow. Before I believe this pattern
                                        generalizes, I'd want to point Jev at a genuinely different triage problem,
                                        support tickets, maybe, and see if the same two lessons hold or if I get
                                        surprised again.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p>
                            I'm not done with this. But I'd rather ship a project page that says exactly what I know
                            and what I don't than round a weekend of poking at a model into a finished product it
                            isn't yet.
                        </p>

                        <blockquote className="js-quote js-quote-final">
                            Two afternoons in, the numbers look real. The confidence I'd need to put this in
                            front of an actual customer isn't there yet, and that gap is the honest part of the story.
                        </blockquote>
                    </article>

                    <div className="js-bottom-cta">
                        <Magnetic>
                            <a href="https://github.com/SwarneshJ/Jev-Customer-Review-Classifier" target="_blank" rel="noreferrer" className="btn btn-primary">
                                <Github size={18} /> View the Code
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <Link to="/projects" className="btn btn-secondary">
                                <ArrowLeft size={18} /> All Projects
                            </Link>
                        </Magnetic>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default JevStory;
