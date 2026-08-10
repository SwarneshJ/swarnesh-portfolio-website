import { useEffect, useRef, useState } from 'react';
import { motion, animate, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { springDefault, springMomentum, project, rubberband, velocityFrom, prefersReducedMotion } from '../motion';
import { stopScroll, startScroll } from '../smoothScroll';
import './MemoSheet.css';

/*
 * A grabbable slide sheet built to the apple-design skill:
 *
 *  §1  responds on pointer-down, and feedback is continuous through the drag
 *  §2  tracks the pointer 1:1, honouring where the sheet was grabbed
 *  §3  interruptible — grabbing mid-flight stops the spring at its presentation
 *      value, so there is never a jump back to a logical target
 *  §5  release hands the pointer's velocity to the spring, so there is no seam
 *      between dragging and animating
 *  §6  the dismiss decision uses the *projected* resting point, not the release
 *      point, so a flick throws the sheet away
 *  §7  the sheet emerges from the button that opened it and leaves the same way
 *  §9  dragging up past the top rubber-bands instead of hard-stopping
 *  §12 it materialises (blur + scale together) rather than plainly fading
 */

const DISMISS_DISTANCE = 180;

const MemoSheet = ({ project: memo, origin, onClose }) => {
    const y = useMotionValue(0);
    const [slide, setSlide] = useState(0);
    const [grabbed, setGrabbed] = useState(false);
    const grab = useRef(null);
    const history = useRef([]);
    const running = useRef(null);
    const flungAway = useRef(false);
    const reduced = prefersReducedMotion();

    const slides = memo.memoSlides;
    const label = memo.memoType || 'Executive Memo';

    // Continuous feedback: the scrim's dim and the sheet's depth track the drag
    // the whole way through, not just when it completes (§1). Driving the
    // colour (not opacity) leaves opacity free for the enter/exit fade.
    const scrimAlpha = useTransform(y, [0, 420], [0.44, 0]);
    const scrimTint = useMotionTemplate`rgba(28, 24, 16, ${scrimAlpha})`;
    const sheetScale = useTransform(y, [0, 420], [1, 0.92]);

    // Where the opening button sits relative to the viewport centre. The sheet
    // enters from that direction so the spatial link between trigger and
    // content is legible (§7). Damped so it reads as a hint, not a fly-in.
    const dx = origin ? (origin.x - window.innerWidth / 2) * 0.22 : 0;
    const dy = origin ? (origin.y - window.innerHeight / 2) * 0.22 : 0;
    const transformOrigin = origin
        ? `${origin.x < window.innerWidth / 2 ? '25%' : '75%'} ${origin.y < window.innerHeight / 2 ? '25%' : '75%'}`
        : 'center';

    const next = () => setSlide((s) => (s === slides.length - 1 ? 0 : s + 1));
    const prev = () => setSlide((s) => (s === 0 ? slides.length - 1 : s - 1));

    useEffect(() => {
        stopScroll();
        document.body.style.overflow = 'hidden';
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
            startScroll();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPointerDown = (e) => {
        if (e.target.closest('button')) return; // let controls take their own presses
        // §3: stop any in-flight spring exactly where it is on screen, so the
        // grab continues from the presentation value rather than snapping.
        running.current?.stop();
        // Capture keeps tracking alive when the pointer leaves the sheet (§2).
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
            /* capture is an optimisation, not a requirement — drag still works */
        }
        // §2: remember the offset from where they actually grabbed it.
        grab.current = { pointer: e.clientY, base: y.get() };
        history.current = [{ v: y.get(), t: performance.now() }];
        setGrabbed(true);
    };

    const onPointerMove = (e) => {
        if (!grab.current) return;
        let nextY = grab.current.base + (e.clientY - grab.current.pointer);
        // §9: the sheet only dismisses downward, so upward drags resist.
        if (nextY < 0) nextY = -rubberband(-nextY, window.innerHeight);
        y.set(nextY);
        history.current.push({ v: nextY, t: performance.now() });
        if (history.current.length > 12) history.current.shift();
    };

    const onPointerUp = () => {
        if (!grab.current) return;
        grab.current = null;
        setGrabbed(false);

        const velocity = velocityFrom(history.current);
        // §6: decide against where the throw is heading, not where it stopped.
        const projected = y.get() + project(velocity);

        if (projected > DISMISS_DISTANCE) {
            flungAway.current = true;
            // §5: the spring picks up at the finger's exact speed.
            running.current = animate(y, window.innerHeight, {
                ...springDefault,
                velocity,
                onComplete: onClose
            });
        } else {
            running.current = animate(y, 0, { ...springMomentum, velocity });
        }
    };

    // Reduced motion: a gentle cross-fade instead of travel and overshoot (§14).
    const enter = reduced
        ? { hidden: { opacity: 0 }, shown: { opacity: 1 }, gone: { opacity: 0 } }
        : {
            hidden: { opacity: 0, scale: 0.9, x: dx, y: dy, filter: 'blur(14px)' },
            shown: { opacity: 1, scale: 1, x: 0, y: 0, filter: 'blur(0px)' },
            // §7: leaves along the path it arrived on — unless it was thrown,
            // in which case the throw itself is the exit.
            gone: flungAway.current
                ? { opacity: 0, transition: { duration: 0.12 } }
                : { opacity: 0, scale: 0.9, x: dx, y: dy, filter: 'blur(14px)' }
        };

    return (
        <motion.div
            className="sheet-scrim"
            style={{ backgroundColor: scrimTint }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={springDefault}
            onClick={onClose}
        >
            <motion.div
                className="sheet-anchor"
                style={{ transformOrigin }}
                variants={enter}
                initial="hidden"
                animate="shown"
                exit="gone"
                transition={springDefault}
                onClick={(e) => e.stopPropagation()}
            >
                <motion.div
                    className={`sheet ${grabbed ? 'is-grabbed' : ''}`}
                    style={{ y, scale: sheetScale }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                >
                    <div className="sheet-grip" aria-hidden="true" />

                    <header className="sheet-head">
                        <h3>{memo.title} — {label}</h3>
                        <button className="sheet-close" onClick={onClose} aria-label="Close">
                            <X size={20} />
                        </button>
                    </header>

                    <div className="sheet-body">
                        <button className="sheet-nav prev" onClick={prev} aria-label="Previous slide">
                            <ChevronLeft size={22} />
                        </button>

                        <img
                            src={slides[slide]}
                            alt={`Slide ${slide + 1} of ${slides.length}`}
                            className="sheet-slide"
                            draggable="false"
                        />

                        <button className="sheet-nav next" onClick={next} aria-label="Next slide">
                            <ChevronRight size={22} />
                        </button>
                    </div>

                    <footer className="sheet-foot">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                className={`sheet-dot ${i === slide ? 'active' : ''}`}
                                onClick={() => setSlide(i)}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </footer>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default MemoSheet;
