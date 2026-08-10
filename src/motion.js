/*
 * Motion tokens + gesture physics, per the apple-design skill.
 *
 * Apple describes springs with two designer parameters — damping ratio
 * (overshoot) and response (how fast it reaches target, in seconds) — rather
 * than mass/stiffness/damping. Framer Motion's `bounce` + `duration` spring
 * API maps onto those directly, so these tokens are written in those terms.
 *
 * House rule from the skill: critically damped (bounce 0) everywhere by
 * default; reserve overshoot for motion the user's own gesture set going.
 */

/** Default UI spring — critically damped, no overshoot. damping 1.0 / response 0.4 */
export const springDefault = { type: 'spring', bounce: 0, duration: 0.4 };

/** Snappier critically damped spring for small, frequent moves. response 0.3 */
export const springSnappy = { type: 'spring', bounce: 0, duration: 0.3 };

/** Drawer / sheet. Apple ships damping 0.8 / response 0.3 */
export const springSheet = { type: 'spring', bounce: 0.2, duration: 0.3 };

/** Momentum: only for motion a flick or throw preceded. damping ~0.8 */
export const springMomentum = { type: 'spring', bounce: 0.2, duration: 0.4 };

/**
 * Apple's momentum projection (Designing Fluid Interfaces sample code).
 * Predicts where a flick would come to rest, so we can pick the target from
 * where the gesture is *going* rather than where the finger left off.
 * Note this is exponential decay — not the textbook v^2/(2a).
 */
export const project = (velocity, decelerationRate = 0.998) =>
    ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);

/**
 * Progressive resistance past a boundary. The further beyond the edge, the
 * less the element follows — a hard stop reads as frozen, this reads as
 * "responsive, but there's nothing more here."
 */
export const rubberband = (overshoot, dimension, constant = 0.55) =>
    (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));

/**
 * Velocity in px/s from a short position history. Sampling a window (~100ms)
 * instead of the last two events keeps the release velocity stable when
 * pointermove fires irregularly.
 */
export const velocityFrom = (history, windowMs = 100) => {
    if (history.length < 2) return 0;
    const last = history[history.length - 1];
    let first = history[0];
    for (let i = history.length - 1; i >= 0; i--) {
        first = history[i];
        if (last.t - history[i].t >= windowMs) break;
    }
    const dt = (last.t - first.t) / 1000;
    if (dt <= 0) return 0;
    return (last.v - first.v) / dt;
};

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
