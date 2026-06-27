import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Wraps an element so it gently drifts toward the cursor while hovered, then
// springs back. Used on primary call-to-action buttons.
const Magnetic = ({ children, strength = 0.35 }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
    const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

    const handleMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.span
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            style={{ x: springX, y: springY, display: 'inline-flex' }}
        >
            {children}
        </motion.span>
    );
};

export default Magnetic;
