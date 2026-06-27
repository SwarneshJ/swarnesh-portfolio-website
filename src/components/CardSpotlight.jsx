import { useEffect } from 'react';

// Global, delegated pointer tracking: the .glass-card under the cursor gets a
// soft radial highlight that follows the mouse (driven by the --mx/--my/--spot
// custom properties read in index.css). One listener for the whole document.
const CardSpotlight = () => {
    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        let lastCard = null;
        let raf = 0;
        let pending = null;

        const onMove = (e) => {
            const card = e.target.closest?.('.glass-card');

            if (card !== lastCard) {
                if (lastCard) lastCard.style.setProperty('--spot', '0');
                lastCard = card;
                if (card) card.style.setProperty('--spot', '1');
            }
            if (!card) return;

            pending = { card, x: e.clientX, y: e.clientY };
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                if (!pending) return;
                const { card, x, y } = pending;
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mx', `${x - rect.left}px`);
                card.style.setProperty('--my', `${y - rect.top}px`);
            });
        };

        document.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            document.removeEventListener('pointermove', onMove);
            if (raf) cancelAnimationFrame(raf);
            if (lastCard) lastCard.style.setProperty('--spot', '0');
        };
    }, []);

    return null;
};

export default CardSpotlight;
