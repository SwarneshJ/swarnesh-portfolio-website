import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import './JourneyScene.css';

/*
 * Auto-walking journey hero, inspired by hand-drawn storefront scenes:
 * mini-Swarnesh walks in place at center while an illustrated strip of his
 * journey (BITS Pilani -> Mumbai/JPMC -> ocean -> UNC -> New York) scrolls
 * past behind him. The strip is duplicated so a translateX(-50%) loop is
 * seamless. All colors come from theme-aware CSS vars in JourneyScene.css.
 */

const Tree = ({ x }) => (
    <g transform={`translate(${x} 0)`}>
        <path className="j-ink" d="M20 388 L20 330 M20 345 L8 332 M20 340 L33 326" strokeWidth="5" />
        <ellipse className="j-leaf" cx="6" cy="316" rx="22" ry="18" />
        <ellipse className="j-leaf" cx="38" cy="310" rx="24" ry="20" />
        <ellipse className="j-leaf" cx="20" cy="294" rx="26" ry="22" />
    </g>
);

const Lamp = ({ x }) => (
    <g transform={`translate(${x} 0)`}>
        <path className="j-ink" d="M0 388 L0 256 Q0 244 14 244 L30 244" strokeWidth="4" fill="none" />
        <rect className="j-amber-f" x="28" y="238" width="18" height="10" rx="4" />
    </g>
);

const Cloud = ({ x, y, s = 1 }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="j-cloud">
        <ellipse cx="0" cy="0" rx="34" ry="14" />
        <ellipse cx="26" cy="-8" rx="24" ry="12" />
        <ellipse cx="-26" cy="-6" rx="20" ry="10" />
    </g>
);

const SceneStrip = () => (
    <svg className="journey-strip" viewBox="0 0 3600 420" preserveAspectRatio="xMidYMax meet" aria-hidden="true">

        {/* ============ ground line (full width) ============ */}
        <line className="j-ink" x1="0" y1="388" x2="3600" y2="388" strokeWidth="4" />

        <Cloud x={240} y={82} />
        <Cloud x={1040} y={60} s={0.8} />
        <Cloud x={2260} y={72} s={0.9} />
        <Cloud x={3060} y={56} s={0.7} />

        {/* ============ 1. BITS PILANI (x 60-560) ============ */}
        <Tree x={60} />
        {/* main academic block */}
        <rect className="j-bld" x="150" y="252" width="300" height="136" />
        <line className="j-ink" x1="150" y1="274" x2="450" y2="274" strokeWidth="3" />
        {[178, 238, 358, 418].map((wx) => (
            <rect key={wx} className="j-win" x={wx} y="292" width="26" height="34" />
        ))}
        {/* clock tower */}
        <rect className="j-bld" x="262" y="120" width="76" height="132" />
        <path className="j-amber-f" d="M258 120 L342 120 L300 78 Z" />
        <circle className="j-face" cx="300" cy="158" r="20" />
        <circle className="j-ink" cx="300" cy="158" r="20" fill="none" strokeWidth="3" />
        <path className="j-ink" d="M300 158 L300 146 M300 158 L309 163" strokeWidth="3" />
        {/* entrance arch */}
        <path className="j-win" d="M286 388 L286 350 Q300 336 314 350 L314 388 Z" />
        {/* sign */}
        <rect className="j-sign" x="196" y="220" width="208" height="30" rx="4" />
        <text className="j-text" x="300" y="242" textAnchor="middle" fontSize="22">BITS PILANI</text>
        <Tree x={490} />

        {/* ============ 2. MUMBAI + JPMC (x 620-1180) ============ */}
        <Lamp x={600} />
        {/* Gateway of India */}
        <rect className="j-bld" x="660" y="230" width="240" height="158" />
        <path className="j-win" d="M736 388 L736 296 Q780 252 824 296 L824 388 Z" />
        <line className="j-ink" x1="660" y1="252" x2="900" y2="252" strokeWidth="3" />
        {/* corner turrets + domes */}
        <rect className="j-bld" x="646" y="208" width="34" height="180" />
        <path className="j-amber-f" d="M646 208 Q663 182 680 208 Z" />
        <rect className="j-bld" x="880" y="208" width="34" height="180" />
        <path className="j-amber-f" d="M880 208 Q897 182 914 208 Z" />
        <path className="j-amber-f" d="M756 230 Q780 204 804 230 Z" />
        <text className="j-text" x="780" y="222" textAnchor="middle" fontSize="20">MUMBAI</text>
        {/* JPMC tower */}
        <rect className="j-bld" x="960" y="96" width="180" height="292" />
        <rect className="j-sign" x="960" y="96" width="180" height="42" />
        <text className="j-text" x="1050" y="116" textAnchor="middle" fontSize="17">JPMORGAN</text>
        <text className="j-text" x="1050" y="133" textAnchor="middle" fontSize="17">CHASE</text>
        {[0, 1, 2, 3, 4].map((row) => (
            [0, 1, 2, 3].map((col) => (
                <rect
                    key={`${row}-${col}`}
                    className={(row + col) % 3 === 0 ? 'j-amber-w' : 'j-win'}
                    x={978 + col * 38}
                    y={156 + row * 44}
                    width="26"
                    height="30"
                />
            ))
        ))}

        {/* ============ 3. OCEAN CROSSING (x 1240-1980) ============ */}
        {/* boardwalk railing */}
        <line className="j-ink" x1="1240" y1="344" x2="1980" y2="344" strokeWidth="4" />
        {[1240, 1320, 1400, 1480, 1560, 1640, 1720, 1800, 1880, 1960].map((px) => (
            <line key={px} className="j-ink" x1={px} y1="344" x2={px} y2="388" strokeWidth="3" />
        ))}
        {/* waves */}
        <path
            className="j-ink"
            d="M1250 404 Q1270 394 1290 404 T1330 404 T1370 404 T1410 404 T1450 404 T1490 404 T1530 404 T1570 404 T1610 404 T1650 404 T1690 404 T1730 404 T1770 404 T1810 404 T1850 404 T1890 404 T1930 404 T1970 404"
            strokeWidth="3"
            fill="none"
        />
        {/* ship on horizon */}
        <g transform="translate(1420 296)">
            <path className="j-ink-f" d="M0 30 L96 30 L82 48 L14 48 Z" />
            <rect className="j-face" x="30" y="12" width="36" height="18" />
            <rect className="j-amber-f" x="52" y="0" width="8" height="12" />
        </g>
        {/* plane with contrail */}
        <g className="j-plane">
            <g transform="translate(1700 108)">
                <path className="j-ink" d="M-96 8 L-40 8" strokeWidth="3" strokeDasharray="10 9" />
                <path className="j-ink-f" d="M-30 0 L34 6 L58 0 L38 14 L-22 12 Z" />
                <path className="j-ink-f" d="M2 6 L-10 -16 L2 -14 L14 7 Z" />
                <path className="j-ink-f" d="M4 10 L-4 26 L6 24 L16 11 Z" />
            </g>
        </g>
        <text className="j-text-soft" x="1610" y="378" textAnchor="middle" fontSize="19" letterSpacing="6">13,000 KM</text>

        {/* ============ 4. UNC CHAPEL HILL (x 2040-2620) ============ */}
        <Tree x={2020} />
        {/* Old Well */}
        <g transform="translate(2120 0)">
            <rect className="j-face" x="0" y="366" width="150" height="10" />
            <rect className="j-face" x="12" y="356" width="126" height="10" />
            {[26, 60, 94, 122].map((cx) => (
                <line key={cx} className="j-ink" x1={cx} y1="288" x2={cx} y2="356" strokeWidth="5" />
            ))}
            <rect className="j-face" x="10" y="276" width="130" height="14" />
            <path className="j-sky-dome" d="M14 276 Q75 216 136 276 Z" />
            <path className="j-ink" d="M14 276 Q75 216 136 276" strokeWidth="3" fill="none" />
            <line className="j-ink" x1="75" y1="230" x2="75" y2="212" strokeWidth="3" />
            <circle className="j-amber-f" cx="75" cy="208" r="5" />
            {/* well basin */}
            <rect className="j-ink-f" x="62" y="330" width="26" height="26" rx="4" />
        </g>
        {/* Bell tower */}
        <g transform="translate(2380 0)">
            <rect className="j-bld" x="0" y="180" width="90" height="208" />
            <rect className="j-face" x="10" y="200" width="70" height="60" rx="4" />
            <circle className="j-ink" cx="45" cy="230" r="18" fill="none" strokeWidth="3" />
            <path className="j-ink" d="M45 230 L45 219 M45 230 L52 235" strokeWidth="3" />
            <path className="j-amber-f" d="M-6 180 L96 180 L45 118 Z" />
            <rect className="j-win" x="30" y="290" width="30" height="52" />
        </g>
        <text className="j-text" x="2425" y="106" textAnchor="middle" fontSize="20">UNC CHAPEL HILL</text>
        <Tree x={2540} />

        {/* ============ 5. NEW YORK (x 2680-3460) ============ */}
        <Lamp x={2660} />
        {/* background slabs */}
        <rect className="j-bld-far" x="2720" y="170" width="110" height="218" />
        <rect className="j-bld-far" x="3010" y="150" width="120" height="238" />
        <rect className="j-bld-far" x="3330" y="190" width="100" height="198" />
        {/* Empire State */}
        <g transform="translate(2840 0)">
            <rect className="j-bld" x="0" y="176" width="150" height="212" />
            <rect className="j-bld" x="24" y="120" width="102" height="56" />
            <rect className="j-bld" x="48" y="84" width="54" height="36" />
            <line className="j-ink" x1="75" y1="84" x2="75" y2="40" strokeWidth="4" />
            {[0, 1, 2, 3].map((row) => (
                [0, 1, 2, 3].map((col) => (
                    <rect
                        key={`e${row}-${col}`}
                        className={(row * col) % 2 === 0 ? 'j-win' : 'j-amber-w'}
                        x={16 + col * 32}
                        y={196 + row * 46}
                        width="20"
                        height="30"
                    />
                ))
            ))}
        </g>
        {/* Faherty-style storefront */}
        <g transform="translate(3060 0)">
            <rect className="j-bld" x="0" y="238" width="200" height="150" />
            <line className="j-ink" x1="0" y1="262" x2="200" y2="262" strokeWidth="3" />
            <path className="j-awning" d="M-8 300 L208 300 L200 270 L0 270 Z" />
            <path className="j-ink" d="M-8 300 L208 300 L200 270 L0 270 Z" fill="none" strokeWidth="3" />
            <text className="j-text-inv" x="100" y="292" textAnchor="middle" fontSize="19">FAHERTY</text>
            <rect className="j-win" x="16" y="314" width="70" height="74" />
            <rect className="j-win" x="116" y="314" width="70" height="74" rx="2" />
            <text className="j-text" x="100" y="256" textAnchor="middle" fontSize="14">EST. 2013 — NYC</text>
        </g>
        <text className="j-text" x="3160" y="150" textAnchor="middle" fontSize="26" letterSpacing="8">NEW YORK</text>
        <Tree x={3480} />
    </svg>
);

const JourneyScene = () => {
    const [paused, setPaused] = useState(false);

    return (
        <section
            className={`journey-scene ${paused ? 'paused' : ''}`}
            aria-label="Illustration of Swarnesh's journey: BITS Pilani to JPMorgan Chase in Mumbai, across the ocean to UNC Chapel Hill, and on to New York"
        >
            <div className="journey-band">
                <div className="journey-track">
                    <SceneStrip />
                    <SceneStrip />
                </div>

                {/* mini-Swarnesh walking in place */}
                <div className="journey-walker" aria-hidden="true">
                    <svg viewBox="0 0 140 218" preserveAspectRatio="xMidYMax meet">
                        {/* back arm */}
                        <g className="w-limb w-arm-back">
                            <path className="w-skin" d="M62 108 Q54 134 56 158 L64 158 Q64 134 71 112 Z" />
                            <path className="w-shirt" d="M60 104 Q56 116 57 124 L68 126 Q68 114 72 106 Z" />
                        </g>
                        {/* back leg */}
                        <g className="w-limb w-leg-back">
                            <path className="w-pant" d="M62 150 Q54 176 56 198 L70 198 Q70 176 76 154 Z" />
                            <path className="w-shoe" d="M52 198 L72 198 L74 210 Q60 214 48 208 Z" />
                        </g>
                        {/* torso / shirt */}
                        <g className="w-body">
                            <path className="w-shirt" d="M56 100 Q72 92 88 100 L92 152 Q72 160 52 152 Z" />
                            {/* collar */}
                            <path className="w-collar" d="M66 100 L72 108 L78 100" fill="none" />
                            {/* neck + head */}
                            <rect className="w-skin" x="66" y="84" width="12" height="12" />
                            <circle className="w-skin" cx="72" cy="66" r="21" />
                            {/* hair */}
                            <path className="w-hair" d="M51 62 Q50 42 72 42 Q94 42 93 62 Q88 50 72 50 Q56 50 51 62 Z" />
                            {/* glasses */}
                            <rect className="w-glass" x="56" y="60" width="14" height="11" rx="3" />
                            <rect className="w-glass" x="74" y="60" width="14" height="11" rx="3" />
                            <line className="w-glass" x1="70" y1="65" x2="74" y2="65" />
                            {/* smile */}
                            <path className="w-smile" d="M66 80 Q72 85 78 80" fill="none" />
                        </g>
                        {/* front leg */}
                        <g className="w-limb w-leg-front">
                            <path className="w-pant" d="M70 152 Q78 178 74 200 L88 200 Q92 176 86 152 Z" />
                            <path className="w-shoe" d="M72 200 L92 200 L96 212 Q80 216 68 210 Z" />
                        </g>
                        {/* front arm */}
                        <g className="w-limb w-arm-front">
                            <path className="w-skin" d="M80 108 Q90 134 87 158 L79 158 Q80 134 73 112 Z" />
                            <path className="w-shirt" d="M78 104 Q84 116 84 124 L72 126 Q73 114 71 106 Z" />
                        </g>
                    </svg>
                </div>

                <button
                    className="journey-toggle"
                    onClick={() => setPaused(!paused)}
                    aria-label={paused ? 'Play journey animation' : 'Pause journey animation'}
                >
                    {paused ? <Play size={16} /> : <Pause size={16} />}
                </button>
            </div>

            <p className="journey-caption">
                Pilani → Mumbai → Chapel Hill → New York — still walking.
            </p>
        </section>
    );
};

export default JourneyScene;
