// Small bridge so non-App components (modals, route changes) can control the
// single Lenis instance without prop-drilling.
let lenis = null;

export const setLenis = (instance) => {
    lenis = instance;
};

export const stopScroll = () => lenis?.stop();

export const startScroll = () => lenis?.start();

// Jump to the top instantly (used on route change). Falls back to the native
// API when Lenis isn't active (e.g. reduced-motion users).
export const scrollToTop = () => {
    if (lenis) {
        lenis.scrollTo(0, { immediate: true });
    } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
};
