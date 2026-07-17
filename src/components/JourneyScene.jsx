import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import './JourneyScene.css';

/*
 * Auto-walking journey hero: mini-Swarnesh (drawn in right-facing profile,
 * walking with articulated knees) stays center while an illustrated strip of
 * his journey scrolls past — BITS Pilani -> Gateway of India + JPMC Mumbai ->
 * ocean crossing -> UNC Kenan-Flagler -> New York. The strip is duplicated so
 * a translateX(-50%) loop is seamless. A fixed sun (light) / moon + stars
 * (dark) hangs in the sky behind the moving strip. Colors are theme-aware
 * CSS vars in JourneyScene.css.
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

const Birds = ({ x, y }) => (
    <g transform={`translate(${x} ${y})`} className="j-ink" strokeWidth="2.5" fill="none">
        <path d="M0 0 Q5 -6 10 0 Q15 -6 20 0" />
        <path d="M34 -10 Q39 -16 44 -10 Q49 -16 54 -10" />
        <path d="M20 12 Q25 6 30 12 Q35 6 40 12" />
    </g>
);

const WaterTower = ({ x, y }) => (
    <g transform={`translate(${x} ${y})`}>
        <path className="j-ink" d="M4 22 L1 34 M20 22 L23 34" strokeWidth="3" />
        <rect className="j-face" x="0" y="4" width="24" height="20" />
        <path className="j-ink-f" d="M-2 4 L26 4 L12 -8 Z" />
    </g>
);

const SceneStrip = () => (
    <svg className="journey-strip" viewBox="0 0 4040 420" preserveAspectRatio="xMidYMax meet" aria-hidden="true">

        {/* ============ ground line ============ */}
        <line className="j-ink" x1="0" y1="388" x2="4040" y2="388" strokeWidth="4" />

        <Cloud x={250} y={80} />
        <Cloud x={1120} y={58} s={0.8} />
        <Cloud x={1760} y={92} s={0.7} />
        <Cloud x={2400} y={66} s={0.9} />
        <Cloud x={3240} y={52} s={0.75} />
        <Birds x={520} y={120} />
        <Birds x={1900} y={150} />
        <Birds x={3020} y={110} />

        {/* ============ 1. BITS PILANI (x 60-580) ============ */}
        <Tree x={56} />
        <rect className="j-bld" x="150" y="252" width="300" height="136" />
        <line className="j-ink" x1="150" y1="274" x2="450" y2="274" strokeWidth="3" />
        {[178, 238, 358, 418].map((wx) => (
            <rect key={wx} className="j-win" x={wx} y="292" width="26" height="34" />
        ))}
        <rect className="j-bld" x="262" y="120" width="76" height="132" />
        <path className="j-amber-f" d="M258 120 L342 120 L300 78 Z" />
        <circle className="j-face" cx="300" cy="158" r="20" />
        <circle className="j-ink" cx="300" cy="158" r="20" fill="none" strokeWidth="3" />
        <path className="j-ink" d="M300 158 L300 146 M300 158 L309 163" strokeWidth="3" />
        <path className="j-win" d="M286 388 L286 350 Q300 336 314 350 L314 388 Z" />
        <rect className="j-sign" x="196" y="220" width="208" height="30" rx="4" />
        <text className="j-text" x="300" y="242" textAnchor="middle" fontSize="22">BITS PILANI</text>
        <text className="j-text-soft" x="300" y="412" textAnchor="middle" fontSize="15" letterSpacing="2">2015–2020</text>
        <Tree x={500} />

        {/* ============ 2. MUMBAI: GATEWAY OF INDIA + JPMC (x 620-1330) ============ */}
        <Lamp x={600} />
        <g transform="translate(660 0)">
            {/* side wings */}
            <rect className="j-bld" x="0" y="262" width="70" height="126" />
            <rect className="j-bld" x="270" y="262" width="70" height="126" />
            {/* corner turrets with onion domes */}
            {[[-6, 236], [58, 236], [264, 236], [328, 236]].map(([tx, ty], i) => (
                <g key={i} transform={`translate(${tx} ${ty})`}>
                    <rect className="j-bld" x="0" y="0" width="18" height="152" />
                    <path className="j-amber-f" d="M-3 0 Q-3 -16 9 -20 Q21 -16 21 0 Z" />
                    <line className="j-ink" x1="9" y1="-20" x2="9" y2="-28" strokeWidth="2.5" />
                </g>
            ))}
            {/* central block */}
            <rect className="j-bld" x="70" y="216" width="200" height="172" />
            {/* decorative band */}
            <line className="j-ink" x1="70" y1="240" x2="270" y2="240" strokeWidth="3" />
            {[86, 110, 134, 182, 206, 230].map((dx) => (
                <circle key={dx} className="j-win" cx={dx + 10} cy="228" r="6" />
            ))}
            {/* grand central arch */}
            <path className="j-win" d="M112 388 L112 306 Q112 262 170 258 Q228 262 228 306 L228 388 Z" />
            <path className="j-ink" d="M112 388 L112 306 Q112 262 170 258 Q228 262 228 306 L228 388" fill="none" strokeWidth="3" />
            {/* small side arches */}
            <path className="j-win" d="M80 388 L80 342 Q90 330 100 342 L100 388 Z" />
            <path className="j-win" d="M240 388 L240 342 Q250 330 260 342 L260 388 Z" />
            {/* central top domes */}
            <path className="j-amber-f" d="M130 216 Q130 200 145 196 Q160 200 160 216 Z" />
            <path className="j-amber-f" d="M180 216 Q180 200 195 196 Q210 200 210 216 Z" />
            <text className="j-text" x="170" y="188" textAnchor="middle" fontSize="19" letterSpacing="1">GATEWAY OF INDIA</text>
        </g>
        {/* Mumbai kaali-peeli taxi */}
        <g transform="translate(1030 348)">
            <path className="j-taxi-body" d="M4 26 L6 14 Q7 8 14 8 L20 8 L26 0 L52 0 L58 8 L66 8 Q73 8 74 14 L76 26 Q76 32 70 32 L10 32 Q4 32 4 26 Z" />
            <path className="j-taxi-roof" d="M26 0 L52 0 L58 8 L20 8 Z" />
            <rect className="j-win" x="30" y="2" width="18" height="6" rx="2" />
            <circle className="j-wheel" cx="20" cy="32" r="7" />
            <circle className="j-wheel" cx="60" cy="32" r="7" />
        </g>
        {/* JPMC tower */}
        <rect className="j-bld" x="1140" y="96" width="180" height="292" />
        <rect className="j-sign" x="1140" y="96" width="180" height="42" />
        <text className="j-text" x="1230" y="116" textAnchor="middle" fontSize="17">JPMORGAN</text>
        <text className="j-text" x="1230" y="133" textAnchor="middle" fontSize="17">CHASE</text>
        {[0, 1, 2, 3, 4].map((row) => (
            [0, 1, 2, 3].map((col) => (
                <rect
                    key={`${row}-${col}`}
                    className={(row + col) % 3 === 0 ? 'j-amber-w' : 'j-win'}
                    x={1158 + col * 38}
                    y={156 + row * 44}
                    width="26"
                    height="30"
                />
            ))
        ))}
        <text className="j-text-soft" x="1230" y="412" textAnchor="middle" fontSize="15" letterSpacing="2">2022–2025</text>

        {/* ============ 3. OCEAN CROSSING (x 1380-2140) ============ */}
        <line className="j-ink" x1="1380" y1="344" x2="2140" y2="344" strokeWidth="4" />
        {[1380, 1460, 1540, 1620, 1700, 1780, 1860, 1940, 2020, 2100].map((px) => (
            <line key={px} className="j-ink" x1={px} y1="344" x2={px} y2="388" strokeWidth="3" />
        ))}
        <path
            className="j-ink"
            d="M1390 404 Q1410 394 1430 404 T1470 404 T1510 404 T1550 404 T1590 404 T1630 404 T1670 404 T1710 404 T1750 404 T1790 404 T1830 404 T1870 404 T1910 404 T1950 404 T1990 404 T2030 404 T2070 404 T2110 404"
            strokeWidth="3"
            fill="none"
        />
        {/* ship */}
        <g className="j-boat">
            <g transform="translate(1560 296)">
                <path className="j-ink-f" d="M0 30 L96 30 L82 48 L14 48 Z" />
                <rect className="j-face" x="30" y="12" width="36" height="18" />
                <rect className="j-amber-f" x="52" y="0" width="8" height="12" />
            </g>
        </g>
        {/* plane */}
        <g className="j-plane">
            <g transform="translate(1840 104)">
                <path className="j-ink" d="M-108 8 L-44 8" strokeWidth="3" strokeDasharray="10 9" />
                <path className="j-ink-f" d="M-30 0 L34 6 L58 0 L38 14 L-22 12 Z" />
                <path className="j-ink-f" d="M2 6 L-10 -16 L2 -14 L14 7 Z" />
                <path className="j-ink-f" d="M4 10 L-4 26 L6 24 L16 11 Z" />
            </g>
        </g>
        <text className="j-text-soft" x="1750" y="378" textAnchor="middle" fontSize="19" letterSpacing="6">13,000 KM</text>
        {/* Statue of Liberty greeting the arrival */}
        <g transform="translate(2064 236)">
            <rect className="j-face" x="6" y="76" width="44" height="32" />
            <rect className="j-ink-f" x="14" y="66" width="28" height="12" />
            <path className="j-liberty" d="M22 66 L22 34 Q22 24 28 22 Q34 24 34 34 L34 66 Z" />
            <circle className="j-liberty" cx="28" cy="16" r="7" />
            <path className="j-liberty-l" d="M24 10 L28 2 L32 10 M20 12 L14 6 M36 12 L42 6" strokeWidth="2.5" />
            <path className="j-liberty" d="M36 30 L46 6 L49 8 L40 32 Z" />
            <circle className="j-amber-f" cx="48" cy="5" r="4" />
        </g>

        {/* ============ 4. UNC KENAN-FLAGLER (x 2200-2900) ============ */}
        <Tree x={2180} />
        {/* Old Well */}
        <g transform="translate(2270 0)">
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
            <rect className="j-ink-f" x="62" y="330" width="26" height="26" rx="4" />
            <text className="j-text-soft" x="75" y="400" textAnchor="middle" fontSize="13" letterSpacing="1">THE OLD WELL</text>
        </g>
        {/* Kenan-Flagler Business School hall */}
        <g transform="translate(2470 0)">
            <rect className="j-bld" x="0" y="230" width="300" height="158" />
            <line className="j-ink" x1="0" y1="254" x2="300" y2="254" strokeWidth="3" />
            {/* columned portico */}
            <rect className="j-face" x="86" y="266" width="128" height="122" />
            {[98, 128, 158, 188].map((cx) => (
                <line key={cx} className="j-ink" x1={cx + 6} y1="272" x2={cx + 6} y2="388" strokeWidth="5" />
            ))}
            <path className="j-ink-f" d="M78 266 L222 266 L150 224 Z" />
            {/* MBA pennant on flagpole */}
            <line className="j-ink" x1="150" y1="224" x2="150" y2="160" strokeWidth="3" />
            <path className="j-pennant" d="M150 160 L216 172 L150 186 Z" />
            <text className="j-text-pennant" x="166" y="178" fontSize="13" fontWeight="800">MBA</text>
            {/* windows */}
            {[16, 46, 232, 262].map((wx) => (
                <rect key={wx} className="j-win" x={wx} y="286" width="24" height="36" />
            ))}
            {[16, 46, 232, 262].map((wx) => (
                <rect key={`b${wx}`} className="j-win" x={wx} y="338" width="24" height="36" />
            ))}
            <rect className="j-sign" x="34" y="196" width="232" height="28" rx="4" />
            <text className="j-text" x="150" y="216" textAnchor="middle" fontSize="17" letterSpacing="1">UNC KENAN-FLAGLER</text>
            <text className="j-text-soft" x="150" y="412" textAnchor="middle" fontSize="15" letterSpacing="2">MBA · 2025–2027</text>
        </g>
        <Tree x={2810} />

        {/* ============ 5. NEW YORK (x 2880-3960) ============ */}
        <Lamp x={2870} />
        {/* far skyline layer */}
        <rect className="j-bld-far" x="2920" y="150" width="90" height="238" />
        <rect className="j-bld-far" x="3080" y="120" width="80" height="268" />
        <rect className="j-bld-far" x="3240" y="164" width="110" height="224" />
        <rect className="j-bld-far" x="3420" y="130" width="84" height="258" />
        <rect className="j-bld-far" x="3600" y="150" width="100" height="238" />
        <rect className="j-bld-far" x="3790" y="176" width="90" height="212" />
        <path className="j-bld-far" d="M3510 388 L3510 200 L3552 160 L3594 200 L3594 388 Z" />
        {/* Chrysler-style tower */}
        <g transform="translate(2950 0)">
            <rect className="j-bld" x="0" y="200" width="100" height="188" />
            <path className="j-bld" d="M8 200 L92 200 L82 172 L18 172 Z" />
            <path className="j-amber-f" d="M22 172 L78 172 Q70 150 50 144 Q30 150 22 172 Z" />
            <path className="j-amber-f" d="M34 148 L66 148 Q60 132 50 128 Q40 132 34 148 Z" />
            <line className="j-ink" x1="50" y1="128" x2="50" y2="98" strokeWidth="3.5" />
            {[0, 1, 2].map((row) => (
                [0, 1].map((col) => (
                    <rect key={`c${row}-${col}`} className={(row + col) % 2 ? 'j-win' : 'j-amber-w'} x={18 + col * 40} y={216 + row * 52} width="24" height="34" />
                ))
            ))}
            <WaterTower x={64} y={140} />
        </g>
        {/* Empire State */}
        <g transform="translate(3120 0)">
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
        {/* glass One WTC-style slab */}
        <g transform="translate(3310 0)">
            <path className="j-glass" d="M0 388 L6 130 L82 118 L88 388 Z" />
            <line className="j-ink-soft-l" x1="22" y1="126" x2="22" y2="388" strokeWidth="2" />
            <line className="j-ink-soft-l" x1="44" y1="123" x2="44" y2="388" strokeWidth="2" />
            <line className="j-ink-soft-l" x1="66" y1="120" x2="66" y2="388" strokeWidth="2" />
            <line className="j-ink" x1="44" y1="123" x2="44" y2="78" strokeWidth="3.5" />
        </g>
        {/* Faherty-style storefront */}
        <g transform="translate(3440 0)">
            <rect className="j-bld" x="0" y="238" width="200" height="150" />
            <line className="j-ink" x1="0" y1="262" x2="200" y2="262" strokeWidth="3" />
            <WaterTower x={150} y={196} />
            <path className="j-awning" d="M-8 300 L208 300 L200 270 L0 270 Z" />
            <path className="j-ink" d="M-8 300 L208 300 L200 270 L0 270 Z" fill="none" strokeWidth="3" />
            <text className="j-text-inv" x="100" y="292" textAnchor="middle" fontSize="19">FAHERTY</text>
            <rect className="j-win" x="16" y="314" width="70" height="74" />
            <rect className="j-win" x="116" y="314" width="70" height="74" rx="2" />
            <text className="j-text" x="100" y="256" textAnchor="middle" fontSize="14">SOHO · NYC</text>
        </g>
        {/* yellow cab */}
        <g transform="translate(3680 348)">
            <path className="j-cab-body" d="M4 26 L6 14 Q7 8 14 8 L22 8 L28 0 L54 0 L60 8 L68 8 Q75 8 76 14 L78 26 Q78 32 72 32 L10 32 Q4 32 4 26 Z" />
            <rect className="j-win" x="32" y="2" width="18" height="6" rx="2" />
            <rect className="j-ink-f" x="36" y="-6" width="12" height="6" rx="2" />
            <circle className="j-wheel" cx="20" cy="32" r="7" />
            <circle className="j-wheel" cx="62" cy="32" r="7" />
        </g>
        <text className="j-text" x="3560" y="150" textAnchor="middle" fontSize="26" letterSpacing="8">NEW YORK</text>
        <text className="j-text-soft" x="3560" y="412" textAnchor="middle" fontSize="15" letterSpacing="2">SUMMER 2026 →</text>
        <Tree x={3960} />
    </svg>
);

export const Walker = () => (
    <svg viewBox="0 0 150 212" preserveAspectRatio="xMidYMax meet">
        {/* soft contact shadow */}
        <ellipse className="w-shadow" cx="76" cy="206" rx="34" ry="5" />

        <g className="w-rig">
            {/* back arm (behind torso) */}
            <g className="w-limb w-arm-back">
                <path className="w-sleeve" d="M68 104 Q62 116 62 126 L76 128 Q76 116 80 106 Z" />
                <path className="w-skin" d="M63 122 Q60 138 62 154 L72 154 Q72 138 75 124 Z" />
            </g>

            {/* back leg: thigh + articulated shin */}
            <g className="w-limb w-thigh-back">
                <path className="w-pant" d="M66 144 Q62 158 63 172 L79 172 Q80 158 82 146 Z" />
                <g className="w-limb w-shin-back">
                    <path className="w-pant" d="M64 168 Q63 182 64 196 L77 196 Q78 182 78 168 Z" />
                    <path className="w-shoe" d="M62 194 L78 194 Q88 196 88 202 Q88 206 82 206 L62 206 Z" />
                </g>
            </g>

            {/* backpack */}
            <path className="w-pack" d="M52 102 Q44 104 43 116 L43 138 Q43 148 52 148 L60 148 L60 104 Z" />
            <line className="w-pack-line" x1="46" y1="122" x2="60" y2="122" />

            {/* torso */}
            <path className="w-shirt" d="M58 96 Q76 88 92 98 L94 148 Q74 156 58 148 Z" />
            {/* strap across chest */}
            <path className="w-pack-line" d="M62 100 L84 144" />
            {/* collar */}
            <path className="w-collar" d="M74 96 L79 104 L86 98" fill="none" />

            {/* head in profile, facing right */}
            <g className="w-head">
                <rect className="w-skin" x="72" y="82" width="13" height="12" />
                <path className="w-skin" d="M64 62 Q64 44 82 44 Q99 44 100 60 Q101 70 96 76 Q90 84 80 84 Q66 82 64 62 Z" />
                {/* nose + chin */}
                <path className="w-skin" d="M99 62 Q104 65 102 70 Q99 74 96 73 Z" />
                {/* ear */}
                <path className="w-ear" d="M72 66 Q68 64 69 69 Q70 73 74 71 Z" />
                {/* hair: swept back over top */}
                <path className="w-hair" d="M62 60 Q60 40 82 38 Q100 38 101 54 Q101 58 98 60 Q96 48 82 47 Q68 47 66 62 Q64 66 62 60 Z" />
                {/* glasses: front lens + temple arm to ear */}
                <rect className="w-glass" x="88" y="57" width="13" height="11" rx="3" />
                <line className="w-glass" x1="88" y1="61" x2="72" y2="63" />
                <circle className="w-eye" cx="94" cy="62" r="1.8" />
                {/* smile */}
                <path className="w-smile" d="M95 76 Q98 75 99 72" fill="none" />
                {/* eyebrow */}
                <path className="w-smile" d="M90 53 Q94 51 98 53" fill="none" />
            </g>

            {/* front leg */}
            <g className="w-limb w-thigh-front">
                <path className="w-pant" d="M72 146 Q70 160 71 174 L87 174 Q88 160 90 148 Z" />
                <g className="w-limb w-shin-front">
                    <path className="w-pant" d="M72 170 Q71 184 72 198 L85 198 Q86 184 86 170 Z" />
                    <path className="w-shoe" d="M70 196 L86 196 Q96 198 96 204 Q96 208 90 208 L70 208 Z" />
                </g>
            </g>

            {/* front arm */}
            <g className="w-limb w-arm-front">
                <path className="w-sleeve" d="M78 104 Q86 114 87 126 L73 130 Q73 116 71 108 Z" />
                <path className="w-skin" d="M76 124 Q80 140 79 156 L69 156 Q70 140 66 126 Z" />
            </g>
        </g>
    </svg>
);

const JourneyScene = () => {
    const [paused, setPaused] = useState(false);

    return (
        <section
            className={`journey-scene ${paused ? 'paused' : ''}`}
            aria-label="Illustration of Swarnesh's journey: BITS Pilani, then the Gateway of India and JPMorgan Chase in Mumbai, across the ocean to UNC Kenan-Flagler for his MBA, and on to New York"
        >
            <div className="journey-band">
                {/* fixed sky: sun by day, moon and stars by night */}
                <div className="journey-sky" aria-hidden="true">
                    <svg className="j-sun" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="26" />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                            <line
                                key={a}
                                x1={60 + 38 * Math.cos((a * Math.PI) / 180)}
                                y1={60 + 38 * Math.sin((a * Math.PI) / 180)}
                                x2={60 + 50 * Math.cos((a * Math.PI) / 180)}
                                y2={60 + 50 * Math.sin((a * Math.PI) / 180)}
                            />
                        ))}
                    </svg>
                </div>

                <div className="journey-track">
                    <SceneStrip />
                    <SceneStrip />
                </div>

                <div className="journey-walker" aria-hidden="true">
                    <Walker />
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
