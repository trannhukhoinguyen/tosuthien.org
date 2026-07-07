// Traced Canadian maple-leaf outline
const MAPLE_LEAF = [[-0.033,1.000],[0.145,0.706],[0.338,0.758],[0.279,0.237],[0.340,0.246],[0.538,0.485],[0.621,0.341],[0.862,0.405],[0.803,0.103],[0.921,0.020],[0.469,-0.368],[0.499,-0.538],[0.026,-0.510],[0.055,-0.943],[0.006,-1.000],[-0.026,-0.492],[-0.486,-0.556],[-0.468,-0.372],[-0.921,-0.029],[-0.816,0.067],[-0.876,0.365],[-0.631,0.311],[-0.569,0.451],[-0.294,0.227],[-0.384,0.739],[-0.196,0.690],[-0.033,1.000]];

export function initNavbarSky() {
    const SKY_KEY = "gpay_sky_enabled";
    const skyOn = () => { try { return localStorage.getItem(SKY_KEY) === "1"; } catch (e) { return false; } };
    let skyCleanup = null;

    function initSky() {
        const navbar = document.querySelector(".navbar");
        if (!navbar) return null;

        const TAU = Math.PI * 2;
        const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";

        const sky = document.createElement("canvas");
        sky.className = "navbar-sky";
        sky.setAttribute("aria-hidden", "true");
        navbar.insertBefore(sky, navbar.firstChild);
        const ctx = sky.getContext("2d");

        let SW = 1000, SH = 72, skyT = 0, raf;
        let nightMode = isDark(), transitioning = false, transP = 0, targetNight = false;
        let shootingStar = null;

        const stars = [];
        for (let i = 0; i < 60; i++) {
            let fx = (i * 61 % 100) / 100;
            if (fx > 0.77 && fx < 0.90) continue;
            stars.push({
                fx,
                fy: 0.05 + ((i * 37) % 70) / 100 * 0.85,
                r: 0.3 + (i % 3) * 0.35,
                ph: i
            });
        }

        const constelData = [
            {
                baseFx: 0.85, baseFy: 0.5,
                pts: [
                    { px: -65, py: -28 }, { px: -40, py: -12 }, { px: -20, py: -4 }, { px: 0, py: 0 },
                    { px: 5, py: 20 }, { px: 35, py: 15 }, { px: 30, py: -12 }, { px: 0, py: 0 }
                ]
            }
        ];

        const constellations = constelData.map(c => ({
            baseFx: c.baseFx, baseFy: c.baseFy,
            points: c.pts.map((p, j) => ({ px: p.px, py: p.py, r: 0.7 + (j % 3) * 0.3, ph: j * 1.5 }))
        }));

        const clouds = [
            { fx: 0.05, y: 0.30, s: 1.0, sp: 0.09 }, { fx: 0.17, y: 0.22, s: 0.8, sp: 0.11 },
            { fx: 0.30, y: 0.40, s: 1.15, sp: 0.08 }, { fx: 0.43, y: 0.26, s: 0.9, sp: 0.10 },
            { fx: 0.56, y: 0.34, s: 1.05, sp: 0.09 }, { fx: 0.68, y: 0.20, s: 0.85, sp: 0.11 },
            { fx: 0.80, y: 0.38, s: 1.1, sp: 0.08 }, { fx: 0.92, y: 0.28, s: 0.95, sp: 0.10 },
        ];

        const SEASON_MS = 75000;
        const SEASON_TINT = [[120, 200, 140], [255, 210, 120], [230, 140, 70], [185, 212, 245]];
        const flakes = Array.from({ length: 34 }, () => ({
            x: Math.random(), y: Math.random() * 70, vy: 0.09 + Math.random() * 0.24,
            amp: 4 + Math.random() * 9, ph: Math.random() * TAU, size: 0.8 + Math.random() * 1.7, spin: Math.random() * TAU,
        }));

        const rain = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random() * 70, len: 5 + Math.random() * 7, sp: 2.6 + Math.random() * 1.6 }));
        const drizzle = Array.from({ length: 55 }, () => ({ x: Math.random(), y: Math.random() * 70, len: 3 + Math.random() * 3, sp: 2.2 + Math.random() * 1.6 }));

        let drizzleStart = -1, drizzleEnd = -1, nextDrizzleAt = 200 + Math.random() * 600;
        let stormStart = -1, stormEnd = -1, nextStormAt = 500 + Math.random() * 900;
        let flash = 0, nextBolt = 0, bolt = null, boltLife = 0, nextStormGust = 0;
        let wind = 0, windTarget = 0, windAcc = 0, nextGust = 120 + Math.random() * 300;
        let snowPile = 0;
        let lmFx = -1, lmKey = null, lmVar = [];
        let kitePos = null, kiteStrike = 0;
        let lmBox = null, lmBurst = [], lmShake = 0, lmHop = 0;

        function resize() {
            const r = sky.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            SW = Math.max(1, Math.round(r.width));
            SH = Math.max(1, Math.round(r.height));
            sky.width = Math.round(SW * dpr);
            sky.height = Math.round(SH * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        resize();

        function wrapX(baseFx, sp, pad) {
            const span = SW + pad * 2;
            let x = (baseFx * SW - skyT * sp) % span;
            if (x < 0) x += span;
            return x - pad;
        }

        function drawCloud(x, y, s, alpha) {
            ctx.globalAlpha = alpha; ctx.fillStyle = "#ffffff";
            ctx.beginPath(); ctx.arc(x, y, 5 * s, 0, TAU); ctx.arc(x + 6 * s, y - 3 * s, 6 * s, 0, TAU);
            ctx.arc(x + 13 * s, y, 5 * s, 0, TAU); ctx.rect(x - 2 * s, y, 17 * s, 5 * s); ctx.fill(); ctx.globalAlpha = 1;
        }

        const DAY = { top: [150, 213, 245], mid: [199, 233, 250], bot: [233, 247, 255] };
        const GOLD = { top: [126, 120, 168], mid: [245, 150, 92], bot: [255, 205, 140] };
        const BLUE = { top: [28, 38, 86], mid: [54, 64, 120], bot: [118, 92, 142] };
        const NIGHT = { top: [10, 15, 36], mid: [22, 29, 64], bot: [32, 40, 78] };
        const lerp = (a, b, m) => a + (b - a) * m;
        const mix = (c1, c2, m) => `rgb(${Math.round(lerp(c1[0], c2[0], m))},${Math.round(lerp(c1[1], c2[1], m))},${Math.round(lerp(c1[2], c2[2], m))})`;
        const clamp01 = (v) => Math.max(0, Math.min(1, v));

        function skyCol(key, t) {
            if (t <= 0.4) return mix(DAY[key], GOLD[key], t / 0.4);
            if (t <= 0.72) return mix(GOLD[key], BLUE[key], (t - 0.4) / 0.32);
            return mix(BLUE[key], NIGHT[key], (t - 0.72) / 0.28);
        }

        function drawSky(t) {
            ctx.clearRect(0, 0, SW, SH);
            const g = ctx.createLinearGradient(0, 0, 0, SH);
            g.addColorStop(0, skyCol("top", t)); g.addColorStop(0.6, skyCol("mid", t)); g.addColorStop(1, skyCol("bot", t));
            ctx.fillStyle = g; ctx.fillRect(0, 0, SW, SH);

            const horizon = SH - 3;
            const setP = clamp01(t / 0.55);
            const sunX = wrapX(0.7, 0.035, 13);
            const sunY = lerp(SH * 0.24, horizon, setP);
            const mx = wrapX(0.2, 0.03, 8);

            const starA = clamp01((t - 0.45) * 2.2);
            if (starA > 0) {
                ctx.fillStyle = "#ffffff";
                stars.forEach((st) => {
                    ctx.globalAlpha = starA * (0.6 + 0.25 * Math.sin(skyT * 0.04 + st.ph));
                    ctx.beginPath(); ctx.arc(wrapX(st.fx, 0.035, 0), SH * st.fy, st.r, 0, TAU); ctx.fill();
                });

                constellations.forEach(c => {
                    const bx = wrapX(c.baseFx, 0.035, 0); const by = SH * c.baseFy;
                    c.points.forEach((p) => {
                        let px = bx + p.px;
                        if (px < 0) px += SW; else if (px >= SW) px -= SW;
                        ctx.globalAlpha = starA * (0.65 + 0.35 * Math.sin(skyT * 0.05 + p.ph));
                        ctx.beginPath(); ctx.arc(px, by + p.py, p.r, 0, TAU); ctx.fill();
                    });
                });

                if (!shootingStar && Math.random() < 0.003) {
                    shootingStar = { x: Math.random() * (SW * 0.8), y: Math.random() * (SH * 0.3), vx: 15 + Math.random() * 10, vy: 2 + Math.random() * 4, life: 1, decay: 0.02 + Math.random() * 0.03 };
                }
                if (shootingStar) {
                    const { x, y, vx, vy, life } = shootingStar;
                    ctx.globalAlpha = starA * life; ctx.fillStyle = "#ffffff";
                    const tailX = x - vx * 1.5; const tailY = y - vy * 1.5;
                    const grad = ctx.createLinearGradient(x, y, tailX, tailY);
                    grad.addColorStop(0, "rgba(255,255,255,1)"); grad.addColorStop(1, "rgba(255,255,255,0)");
                    ctx.beginPath(); ctx.strokeStyle = grad; ctx.lineWidth = 1.2; ctx.moveTo(x, y); ctx.lineTo(tailX, tailY); ctx.stroke();
                    ctx.beginPath(); ctx.arc(x, y, 0.8, 0, TAU); ctx.fill();
                    shootingStar.x += vx; shootingStar.y += vy; shootingStar.life -= shootingStar.decay;
                    if (shootingStar.life <= 0) shootingStar = null;
                }
                ctx.globalAlpha = 1;
            }

            const dusk = Math.max(0, 1 - Math.abs(t - 0.4) / 0.46);
            if (dusk > 0.002) {
                const rg = ctx.createRadialGradient(sunX, sunY, 1, sunX, sunY, SH * 3.4);
                rg.addColorStop(0, "rgba(255,182,100," + (0.72 * dusk).toFixed(3) + ")");
                rg.addColorStop(0.45, "rgba(255,138,70," + (0.3 * dusk).toFixed(3) + ")");
                rg.addColorStop(1, "rgba(255,120,60,0)");
                ctx.fillStyle = rg; ctx.fillRect(0, 0, SW, SH);
            }

            const sunA = clamp01(1 - t * 1.2);
            if (sunA > 0) {
                ctx.globalAlpha = sunA * 0.4; ctx.fillStyle = "#ffe7a8"; ctx.beginPath(); ctx.arc(sunX, sunY, 11, 0, TAU); ctx.fill();
                ctx.globalAlpha = sunA; ctx.fillStyle = "#ffd23f"; ctx.beginPath(); ctx.arc(sunX, sunY, 6.5, 0, TAU); ctx.fill();
                ctx.globalAlpha = 1;
            }

            const moonA = clamp01((t - 0.5) * 2);
            if (moonA > 0) {
                const my = lerp(horizon, SH * 0.26, clamp01((t - 0.45) / 0.55)); const r = 6;
                const d = Math.cos(skyT * 0.0002) * r * 2.2;
                ctx.globalAlpha = moonA; ctx.fillStyle = "#d9dcea"; ctx.beginPath(); ctx.arc(mx, my, r, 0, TAU); ctx.fill();
                ctx.save(); ctx.beginPath(); ctx.arc(mx, my, r, 0, TAU); ctx.clip();
                ctx.fillStyle = "rgba(150,156,178,0.35)";
                const maria = [[-0.32, -0.18, 0.26], [0.26, 0.12, 0.32], [0.04, 0.36, 0.2], [0.42, -0.3, 0.15], [-0.18, 0.24, 0.22]];
                maria.forEach((c) => { ctx.beginPath(); ctx.arc(mx + c[0] * r, my + c[1] * r, c[2] * r, 0, TAU); ctx.fill(); });
                ctx.fillStyle = skyCol("top", t); ctx.beginPath(); ctx.arc(mx + d, my, r, 0, TAU); ctx.fill(); ctx.restore(); ctx.globalAlpha = 1;
            }

            clouds.forEach((c) => {
                const span = SW + 60; let x = wrapX(c.fx, c.sp, 30) + windAcc * 0.18;
                x = ((x + 30) % span + span) % span - 30;
                drawCloud(x, SH * c.y, c.s, lerp(0.85, 0.45, t));
            });
            drawWind(); drawWeather(t); drawSnowPile(); drawLandmark(t); drawLmBurst(); drawStorm();
        }

        const API_SEASON = { checkout: 0, "s2s-card": 1, iframe: 2, refund: 3 };
        function seasonOverride() {
            const p = (typeof location !== "undefined" && location.pathname) || "";
            const m = p.match(/\/api\/([^/?#]+)/);
            return m && API_SEASON[m[1]] !== undefined ? API_SEASON[m[1]] : -1;
        }

        function drawWeather(t) {
            const ov = seasonOverride(); let idx, intensity;
            if (ov >= 0) { idx = ov; intensity = 1; }
            else { const seasonF = (Date.now() / SEASON_MS) % 4; idx = Math.floor(seasonF); intensity = Math.sin(Math.PI * (seasonF - idx)); }
            if (intensity <= 0.02) return;
            const tc = SEASON_TINT[idx];
            ctx.globalAlpha = 0.07 * intensity * (1 - 0.45 * t); ctx.fillStyle = "rgb(" + tc[0] + "," + tc[1] + "," + tc[2] + ")"; ctx.fillRect(0, 0, SW, SH); ctx.globalAlpha = 1;
            flakes.forEach((p) => {
                p.y += p.vy; p.x += wind * 0.0018;
                if (p.x > 1.05) p.x -= 1.1; else if (p.x < -0.05) p.x += 1.1;
                if (p.y > SH + 6) { p.y = -6; p.x = Math.random(); }
            });
            if (idx === 1) return;
            ctx.globalAlpha = intensity * 0.85;
            flakes.forEach((p) => {
                const x = p.x * SW + Math.sin(p.y * 0.05 + p.ph) * p.amp; const s = p.size * 1.8;
                ctx.save(); ctx.translate(x, p.y); ctx.rotate(p.spin + p.y * 0.04);
                if (idx === 0) {
                    const tip = p.size > 1.6 ? "#ffc2da" : "#ffb0cf"; const grad = ctx.createLinearGradient(0, 0.88 * s, 0, -0.88 * s);
                    grad.addColorStop(0, "#fff3f8"); grad.addColorStop(1, tip); ctx.fillStyle = grad;
                    ctx.beginPath(); ctx.moveTo(0.10 * s, 0.88 * s); ctx.bezierCurveTo(0.54 * s, 0.70 * s, 0.60 * s, -0.42 * s, 0.30 * s, -0.88 * s);
                    ctx.quadraticCurveTo(0.13 * s, -0.74 * s, 0, -0.80 * s); ctx.quadraticCurveTo(-0.13 * s, -0.74 * s, -0.30 * s, -0.88 * s);
                    ctx.bezierCurveTo(-0.60 * s, -0.42 * s, -0.54 * s, 0.70 * s, -0.10 * s, 0.88 * s); ctx.quadraticCurveTo(0, 0.98 * s, 0.10 * s, 0.88 * s); ctx.fill();
                } else if (idx === 2) {
                    const ms = s * 1.20; ctx.fillStyle = p.size > 1.6 ? "#f5793b" : "#e8632a";
                    ctx.beginPath(); ctx.moveTo(MAPLE_LEAF[0][0] * ms, -MAPLE_LEAF[0][1] * ms);
                    for (let i = 1; i < MAPLE_LEAF.length; i++) ctx.lineTo(MAPLE_LEAF[i][0] * ms, -MAPLE_LEAF[i][1] * ms);
                    ctx.closePath(); ctx.fill(); ctx.strokeStyle = "rgba(150,70,20,0.45)"; ctx.lineWidth = Math.max(0.5, ms * 0.05); ctx.lineJoin = "round"; ctx.stroke();
                } else {
                    ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 0.7; ctx.lineCap = "round";
                    for (let a = 0; a < 6; a++) { ctx.rotate(Math.PI / 3); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -s); ctx.moveTo(0, -s * 0.6); ctx.lineTo(s * 0.32, -s * 0.85); ctx.moveTo(0, -s * 0.6); ctx.lineTo(-s * 0.32, -s * 0.85); ctx.stroke(); }
                }
                ctx.restore();
            });
            ctx.globalAlpha = 1;

            if (idx === 0) {
                if (skyT >= nextDrizzleAt) { const dur = 260 + Math.random() * 420; drizzleStart = skyT; drizzleEnd = skyT + dur; nextDrizzleAt = drizzleEnd + (2400 + Math.random() * 5000); }
                const drizzling = drizzleStart >= 0 && skyT >= drizzleStart && skyT < drizzleEnd;
                if (drizzling) {
                    const di = Math.max(0, Math.min(1, (skyT - drizzleStart) / 40, (drizzleEnd - skyT) / 40));
                    ctx.strokeStyle = "rgba(200,215,235,0.45)"; ctx.lineWidth = 1; ctx.globalAlpha = intensity * di * 0.75; ctx.beginPath();
                    drizzle.forEach((d) => {
                        const vx = wind * 0.8; const vy = d.sp; d.y += vy; d.x += vx / SW;
                        if (d.x > 1.04) d.x -= 1.08; else if (d.x < -0.04) d.x += 1.08;
                        if (d.y > SH + 6) { d.y = -6; d.x = Math.random(); }
                        const px = d.x * SW; const k = d.len * 0.5 + 1; ctx.moveTo(px - vx * k, d.y - vy * k); ctx.lineTo(px, d.y);
                    });
                    ctx.stroke(); ctx.globalAlpha = 1;
                }
            }
        }

        function makeBolt(tx, ty) {
            const toKite = tx !== undefined; const x = toKite ? tx + (Math.random() - 0.5) * 30 : SW * (0.1 + Math.random() * 0.8);
            const endY = toKite ? ty : SH * 0.9; const main = []; let cy = 0, cx = x;
            while (cy < endY - 2) { cy = Math.min(endY - 2, cy + SH * 0.1 + Math.random() * SH * 0.1); cx += (Math.random() - 0.5) * 16; main.push([cx, cy]); }
            if (toKite) main.push([tx, ty]);
            const branches = [];
            for (let i = 1; i < main.length - 1; i++) {
                if (Math.random() < 0.45) {
                    let jx = main[i][0], jy = main[i][1]; const seg = [[jx, jy]]; const steps = 1 + (Math.random() * 2 | 0);
                    for (let s = 0; s < steps; s++) { jx += (Math.random() < 0.5 ? -1 : 1) * (8 + Math.random() * 12); jy += SH * 0.12; seg.push([jx, jy]); }
                    branches.push(seg);
                }
            }
            return { x, main, branches };
        }

        function drawStorm() {
            const ovS = seasonOverride(); const isSummer = (ovS >= 0 ? ovS : Math.floor((Date.now() / SEASON_MS) % 4)) === 1;
            if (skyT >= nextStormAt) {
                if (isSummer) { const dur = 320 + Math.random() * 360; stormStart = skyT; stormEnd = skyT + dur; nextStormAt = stormEnd + (3200 + Math.random() * 4500); nextBolt = skyT + 24 + Math.random() * 40; }
                else { nextStormAt = skyT + 120; }
            }
            if (!isSummer && stormEnd > skyT) stormEnd = skyT;
            const storming = isSummer && stormStart >= 0 && skyT >= stormStart && skyT < stormEnd;
            if (storming) {
                const si = Math.max(0, Math.min(1, (skyT - stormStart) / 45, (stormEnd - skyT) / 45));
                if (skyT >= nextStormGust) { windTarget = (Math.random() * 2 - 1) * (2.6 + Math.random() * 3) * si; nextStormGust = skyT + 25 + Math.random() * 70; }
                ctx.globalAlpha = 0.3 * si; ctx.fillStyle = "#2b3245"; ctx.fillRect(0, 0, SW, SH); ctx.globalAlpha = 1;
                ctx.strokeStyle = "rgba(190,205,235,0.55)"; ctx.lineWidth = 1; ctx.globalAlpha = si; ctx.beginPath();
                rain.forEach((d) => {
                    const vx = wind * 1.0; const vy = d.sp; d.y += vy; d.x += vx / SW;
                    if (d.x > 1.04) d.x -= 1.08; else if (d.x < -0.04) d.x += 1.08;
                    if (d.y > SH + 8) { d.y = -8; d.x = Math.random(); }
                    const px = d.x * SW; const k = d.len * 0.32 + 1; ctx.moveTo(px - vx * k, d.y - vy * k); ctx.lineTo(px, d.y);
                });
                ctx.stroke(); ctx.globalAlpha = 1;
                if (skyT >= nextBolt) { flash = 1; if (kitePos && Math.random() < 0.4) { bolt = makeBolt(kitePos.x, kitePos.y); kiteStrike = 1; } else bolt = makeBolt(); boltLife = 4; nextBolt = skyT + 35 + Math.random() * 110; }
            }
            flash *= 0.78; if (flash > 0.02) { ctx.globalAlpha = flash * 0.6; ctx.fillStyle = "#eaf2ff"; ctx.fillRect(0, 0, SW, SH); ctx.globalAlpha = 1; }
            if (boltLife > 0 && bolt) {
                const tracePaths = () => { ctx.beginPath(); ctx.moveTo(bolt.x, 0); bolt.main.forEach((s) => ctx.lineTo(s[0], s[1])); bolt.branches.forEach((b) => { ctx.moveTo(b[0][0], b[0][1]); for (let i = 1; i < b.length; i++) ctx.lineTo(b[i][0], b[i][1]); }); };
                ctx.lineCap = "round"; ctx.strokeStyle = "rgba(190,220,255,0.4)"; ctx.lineWidth = 3.6; tracePaths(); ctx.stroke();
                ctx.strokeStyle = "rgba(242,248,255,0.98)"; ctx.lineWidth = 1.5; tracePaths(); ctx.stroke(); boltLife -= 1;
            }
        }

        function drawWind() {
            const w = Math.abs(wind); if (w < 0.7) return; const dir = Math.sign(wind);
            ctx.strokeStyle = "rgba(255,255,255," + Math.min(0.16, w * 0.07).toFixed(3) + ")"; ctx.lineWidth = 1; ctx.beginPath();
            for (let i = 0; i < 7; i++) { const yy = (i * (SH / 6) + i * 23) % SH; const x = (((i * 137 + skyT * (3 + w) * dir) % SW) + SW) % SW; ctx.moveTo(x, yy); ctx.lineTo(x + dir * (10 + w * 7), yy); }
            ctx.stroke();
        }

        function drawSnowPile() {
            const ov = seasonOverride(); const winter = ov >= 0 ? ov === 3 : Math.floor((Date.now() / SEASON_MS) % 4) === 3;
            const maxPile = Math.max(5, SH * 0.2); snowPile += winter ? 0.05 : -0.04; snowPile = Math.max(0, Math.min(maxPile, snowPile));
            if (snowPile < 0.6) return; const baseY = SH - snowPile; const n = 11; const pts = [];
            for (let i = 0; i <= n; i++) { const x = (i * SW) / n; const h = Math.sin(i * 0.8 + 0.6 + skyT * 0.004) * 0.5 + Math.sin(i * 1.9 + 1.2) * 0.32 + Math.sin(i * 4.3 + 0.3) * 0.16; pts.push([x, baseY - h * snowPile * 0.6 + 1]); }
            function traceSnow() { ctx.beginPath(); ctx.moveTo(-4, SH + 4); ctx.lineTo(pts[0][0], pts[0][1]); for (let i = 0; i < pts.length - 1; i++) { const mx = (pts[i][0] + pts[i + 1][0]) / 2; const my = (pts[i][1] + pts[i + 1][1]) / 2; ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my); } ctx.lineTo(SW + 4, pts[pts.length - 1][1]); ctx.lineTo(SW + 4, SH + 4); ctx.closePath(); }
            traceSnow(); const sg = ctx.createLinearGradient(0, baseY - 3, 0, SH);
            if (nightMode) { sg.addColorStop(0, "#cbd5ee"); sg.addColorStop(1, "#828fb8"); } else { sg.addColorStop(0, "#ffffff"); sg.addColorStop(1, "#cfdef4"); }
            ctx.fillStyle = sg; ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,0.95)"; ctx.lineWidth = 1.6; traceSnow(); ctx.stroke(); ctx.fillStyle = "#ffffff";
            for (let i = 0; i < 11; i++) { const tw = 0.3 + 0.55 * Math.sin(skyT * 0.08 + i * 1.7); if (tw <= 0.06) continue; const px = ((i * 131 + skyT * 0.25) % SW + SW) % SW; const sy = Math.min(SH - 1, baseY + 2 + (i % 3) * 2); ctx.globalAlpha = tw * 0.85; ctx.beginPath(); ctx.arc(px, sy, 0.9, 0, TAU); ctx.fill(); }
            ctx.globalAlpha = 1;
        }

        function drawLandmark(t) {
            kitePos = null; lmBox = null; const ov = seasonOverride(); let idx, intensity;
            if (ov >= 0) { idx = ov; intensity = 1; } else { const f = (Date.now() / SEASON_MS) % 4; idx = Math.floor(f); intensity = Math.min(1, Math.sin(Math.PI * (f - idx)) * 3); }
            if (intensity <= 0.03) return;
            const key = ov >= 0 ? "ov" + ov : Math.floor(Date.now() / SEASON_MS);
            if (key !== lmKey) { lmKey = key; lmFx = 0.28 + Math.random() * 0.55; lmVar = Array.from({ length: 24 }, () => Math.random() * 2 - 1); }
            const J = (i) => lmVar[i % lmVar.length] || 0; const u = (SH / 60) * 0.8 * (1 + 0.12 * J(13)); const x = lmFx * SW; const shade = 1 - 0.35 * t; const col = (r, g, b) => "rgb(" + Math.round(r * shade) + "," + Math.round(g * shade) + "," + Math.round(b * shade) + ")";
            ctx.save(); ctx.globalAlpha = intensity;
            if (idx === 3) {
                let gy = SH - snowPile * 0.75 + 1; if (lmHop > 0) gy -= Math.sin((1 - lmHop) * Math.PI) * 5 * u; const br = (7 + 0.9 * J(0)) * u, hr = (4.8 + 0.55 * J(1)) * u; const by = gy - br, hy = gy - br * 2 - hr * 0.62; const nd = J(7) < 0 ? -1 : 1;
                ctx.fillStyle = col(255, 255, 255); ctx.beginPath(); ctx.arc(x, by, br, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(x, hy, hr, 0, TAU); ctx.fill(); ctx.strokeStyle = col(122, 82, 46); ctx.lineWidth = 1.1 * u; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(x - br * 0.85, by - br * 0.35); ctx.lineTo(x - br * 1.65 - J(2) * u, by - br * (0.95 + 0.4 * J(3))); ctx.moveTo(x + br * 0.85, by - br * 0.35); ctx.lineTo(x + br * 1.65 + J(4) * u, by - br * (0.95 + 0.4 * J(5))); ctx.stroke();
                const scarves = [[222, 64, 74], [44, 136, 140], [232, 152, 44], [98, 112, 222]]; const sc = scarves[Math.abs(Math.round(J(6) * 10)) % scarves.length]; ctx.strokeStyle = col(sc[0], sc[1], sc[2]); ctx.lineWidth = 1.8 * u; ctx.beginPath(); ctx.arc(x, hy + hr * 0.55, hr * 0.9, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
                const flap = Math.sin(skyT * 0.05) * 1.8 + Math.sin(skyT * 0.013) * 0.9 + wind * 1.4; ctx.lineWidth = 1.4 * u; ctx.beginPath(); ctx.moveTo(x - nd * hr * 0.7, hy + hr * 1.05); ctx.quadraticCurveTo(x - nd * hr * 1.1 + flap * 0.5 * u, hy + hr * 1.8, x - nd * hr * 1.3 + flap * u, hy + hr * 2.5); ctx.stroke();
                const blink = Math.sin(skyT * 0.045 + J(9) * 5) > 0.97; ctx.fillStyle = col(40, 44, 54);
                [-0.34, 0.34].forEach((d) => { const ex = x + (nd * 0.12 + d) * hr, ey = hy - 0.24 * hr; ctx.beginPath(); if (blink) ctx.rect(ex - 0.8 * u, ey - 0.2 * u, 1.6 * u, 0.4 * u); else ctx.arc(ex, ey, 0.75 * u, 0, TAU); ctx.fill(); });
                ctx.beginPath(); ctx.arc(x, by - br * 0.3, 0.75 * u, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(x, by + br * 0.12, 0.75 * u, 0, TAU); ctx.fill(); ctx.fillStyle = col(240, 130, 40); const nl = (3.4 + 0.8 * J(8)) * u; ctx.beginPath(); ctx.moveTo(x + nd * 0.3 * u, hy - 0.9 * u); ctx.lineTo(x + nd * (0.3 * u + nl), hy - 0.1 * u); ctx.lineTo(x + nd * 0.3 * u, hy + 0.7 * u); ctx.closePath(); ctx.fill();
                lmBox = { idx, x0: x - 14 * u, x1: x + 14 * u, y0: gy - 24 * u, y1: SH, cx: x, cy: gy - 5 * u };
            } else if (idx === 1) {
                const w = (4 + 0.6 * J(8)) * u, ht = w * 1.15, hb = w * 1.5; const kx = x + (10 + Math.sin(skyT * 0.013 + J(10) * 4) * 5 + wind * 3) * u; const ky = SH * (0.34 + 0.1 * J(2)) + Math.sin(skyT * 0.021 + J(3) * 3) * 3.2 * u;
                const tilt = 0.3 + Math.sin(skyT * 0.017 + J(4) * 2) * 0.12 + wind * 0.08 + J(5) * 0.12 + kiteStrike * 0.3 * Math.sin(skyT); const kits = [[235, 84, 80], [66, 156, 208], [250, 170, 50], [170, 112, 222]]; const kc = kits[Math.abs(Math.round(J(6) * 10)) % kits.length];
                const ax = x - 14 * u, ay = SH + 2; const c1x = x - 2 * u + (Math.sin(skyT * 0.015 + J(12) * 3) * 2.5 + wind * 4) * u + (kx - x - 10 * u) * 0.45; const c1y = (ky + SH) / 2 + 4 * u;
                ctx.strokeStyle = "rgba(130,140,160,0.5)"; ctx.lineWidth = Math.max(0.5, 0.35 * u); ctx.beginPath(); ctx.moveTo(kx, ky + u); ctx.quadraticCurveTo(c1x, c1y, ax, ay); ctx.stroke();
                ctx.save(); ctx.translate(kx, ky); ctx.rotate(tilt); ctx.fillStyle = col(kc[0], kc[1], kc[2]); ctx.beginPath(); ctx.moveTo(0, -ht); ctx.lineTo(w, 0); ctx.lineTo(0, hb); ctx.lineTo(-w, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = col(kc[0] * 0.78, kc[1] * 0.78, kc[2] * 0.78); ctx.beginPath(); ctx.moveTo(0, -ht); ctx.lineTo(w, 0); ctx.lineTo(0, hb); ctx.closePath(); ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,0.65)"; ctx.lineWidth = 0.4 * u; ctx.beginPath(); ctx.moveTo(0, -ht); ctx.lineTo(0, hb); ctx.moveTo(-w, 0); ctx.lineTo(w, 0); ctx.stroke(); ctx.restore();
                const bx = kx - Math.sin(tilt) * hb, byy = ky + Math.cos(tilt) * hb; const drift = -(wind * 1.6 + Math.sin(skyT * 0.02 + J(9) * 3) * 0.9); const pts = [[bx, byy]];
                for (let i = 1; i <= 6; i++) { pts.push([bx + drift * i * 1.1 * u + Math.sin(skyT * 0.06 + i * 1.3) * 1.4 * u * (i / 6), byy + i * 1.5 * u]); }
                ctx.strokeStyle = col(kc[0], kc[1], kc[2]); ctx.lineWidth = 0.5 * u; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke(); ctx.fillStyle = col(kc[0], kc[1], kc[2]);
                [2, 4, 6].forEach((i, k) => { ctx.save(); ctx.translate(pts[i][0], pts[i][1]); ctx.rotate(Math.sin(skyT * 0.06 + i) * 0.6 + k); ctx.beginPath(); ctx.ellipse(0, 0, 1.05 * u, 0.5 * u, 0, 0, TAU); ctx.fill(); ctx.restore(); });
                kitePos = { x: kx, y: ky }; lmBox = { idx, x0: kx - w * 2.2, x1: kx + w * 2.2, y0: ky - ht - 2, y1: ky + hb + 8 * u, cx: kx, cy: ky };
                if (kiteStrike > 0.02) {
                    ctx.save(); ctx.globalAlpha = Math.min(1, kiteStrike * 1.5); const rg = ctx.createRadialGradient(kx, ky, 0, kx, ky, w * 3); rg.addColorStop(0, "rgba(210,240,255,0.75)"); rg.addColorStop(1, "rgba(210,240,255,0)"); ctx.fillStyle = rg; ctx.fillRect(kx - w * 3, ky - w * 3, w * 6, w * 6); ctx.strokeStyle = "rgba(170,225,255,0.9)"; ctx.lineWidth = 0.5 + 1.4 * u * kiteStrike; ctx.beginPath(); ctx.moveTo(kx, ky + u); ctx.quadraticCurveTo(c1x, c1y, ax, ay); ctx.stroke();
                    const q = 1 - kiteStrike, omq = 1 - q; const sx2 = omq * omq * kx + 2 * omq * q * c1x + q * q * ax; const sy2 = omq * omq * (ky + u) + 2 * omq * q * c1y + q * q * ay; ctx.globalAlpha = 0.95; ctx.fillStyle = "#eaf6ff"; ctx.beginPath(); ctx.arc(sx2, sy2, 1.5 * u, 0, TAU); ctx.fill();
                    if (q > 0.78) { const g2 = (q - 0.78) / 0.22; ctx.strokeStyle = "rgba(210,240,255," + (0.9 - 0.7 * g2).toFixed(3) + ")"; ctx.lineWidth = 0.5; ctx.beginPath(); for (let a = 0; a < 5; a++) { const an = Math.PI + (a / 4) * Math.PI; ctx.moveTo(ax, ay); ctx.lineTo(ax + Math.cos(an) * 5 * u * g2, ay + Math.sin(an) * 5 * u * g2); } ctx.stroke(); }
                    ctx.restore(); kiteStrike = Math.max(0, kiteStrike - 0.025);
                }
            } else {
                const gy = SH + 1; const spring = idx === 0; const lean = J(0) * 1.8 * u; const sway = (Math.sin(skyT * 0.018 + J(10) * 4) * 1.1 + Math.sin(skyT * 0.007 + J(11) * 2) * 0.4 + wind * 0.45 + lmShake * Math.sin(skyT * 0.9) * 2.2) * u; const cx = x + lean * 1.2 + sway;
                ctx.fillStyle = "rgba(20,25,40,0.12)"; ctx.beginPath(); ctx.ellipse(x, gy - 0.5 * u, 9 * u, 1.5 * u, 0, 0, TAU); ctx.fill(); ctx.fillStyle = col(104, 70, 44); ctx.beginPath(); ctx.moveTo(x - 1.9 * u, gy); ctx.quadraticCurveTo(x - 1.1 * u + lean * 0.4, gy - 6 * u, x - 0.55 * u + lean + sway * 0.5, gy - 12.5 * u); ctx.lineTo(x + 0.55 * u + lean + sway * 0.5, gy - 12.5 * u); ctx.quadraticCurveTo(x + 1.1 * u + lean * 0.4, gy - 6 * u, x + 1.9 * u, gy); ctx.closePath(); ctx.fill(); ctx.strokeStyle = col(104, 70, 44); ctx.lineCap = "round"; ctx.lineWidth = 1.1 * u; ctx.beginPath(); ctx.moveTo(x - 0.4 * u + lean * 0.5, gy - 8 * u); ctx.quadraticCurveTo(cx - 3 * u, gy - (10.5 + J(1)) * u, cx - (5.5 + J(2)) * u, gy - (14.5 + 1.2 * J(3)) * u); ctx.moveTo(x + 0.4 * u + lean * 0.6, gy - 9 * u); ctx.quadraticCurveTo(cx + 3 * u, gy - (11.5 + J(4)) * u, cx + (5.5 + J(5)) * u, gy - (15.5 + 1.2 * J(6)) * u); ctx.stroke();
                const m2 = (J(11) + 1) / 2; const pick = (a, b) => [lerp(a[0], b[0], m2), lerp(a[1], b[1], m2), lerp(a[2], b[2], m2)]; const shadow = spring ? pick([231, 136, 175], [222, 118, 166]) : pick([204, 118, 34], [186, 96, 42]); const main = spring ? pick([255, 180, 207], [251, 164, 197]) : pick([238, 158, 52], [222, 134, 50]); const hi = spring ? pick([255, 221, 233], [255, 206, 223]) : pick([252, 204, 108], [244, 182, 94]);
                const blobs = [[-6.5, 14.5, 4.6], [6.5, 15, 4.6], [0, 15.5, 5.4], [-3.5, 19, 4.4], [3.5, 19.5, 4.2], [0, 21.5, 4.6], [-7.5, 18, 3.4], [7.5, 18.5, 3.2]].map((c, i) => [c[0] + J(i + 3) * 1.3, c[1] + J(i + 12) * 0.9, c[2] * (1 + 0.14 * J(i + 7))]);
                ctx.fillStyle = col(shadow[0], shadow[1], shadow[2]); blobs.forEach((c) => { ctx.beginPath(); ctx.arc(cx + c[0] * u, gy - (c[1] - 0.9) * u, c[2] * u, 0, TAU); ctx.fill(); });
                ctx.fillStyle = col(main[0], main[1], main[2]); blobs.forEach((c) => { ctx.beginPath(); ctx.arc(cx + c[0] * u, gy - c[1] * u, c[2] * u, 0, TAU); ctx.fill(); });
                ctx.fillStyle = col(hi[0], hi[1], hi[2]); [[-4.5, 20, 2.6], [1.5, 22, 2.6], [-1, 17.5, 2.2], [5, 20.5, 2.2], [-7, 19.5, 1.8]].forEach((c, i) => { ctx.beginPath(); ctx.arc(cx + (c[0] + J(i + 16) * 1.2) * u, gy - (c[1] + J(i + 19) * 0.8) * u, c[2] * u, 0, TAU); ctx.fill(); });
                ctx.fillStyle = spring ? col(255, 196, 216) : col(232, 150, 60);
                for (let i = 0; i < 3; i++) { const p = (skyT * 0.004 + i * 0.37 + (J(i) + 1) * 0.2) % 1; const fx = cx + (J(i + 6) * 6 + Math.sin(p * 9 + i * 2) * 2.5) * u; const fy = gy - (17 - p * 15) * u; ctx.save(); ctx.globalAlpha = intensity * Math.min(1, (1 - p) * 4); ctx.translate(fx, fy); ctx.rotate(p * 7 + i); ctx.beginPath(); ctx.ellipse(0, 0, 1.1 * u, 0.55 * u, 0, 0, TAU); ctx.fill(); ctx.restore(); }
                const drops = 3 + Math.round(J(22) + 1);
                for (let i = 0; i < drops; i++) { ctx.save(); ctx.translate(x + J(i + 2) * 8 * u, gy - (0.7 + 0.6 * (J(i + 9) + 1) / 2) * u); ctx.rotate(J(i + 5) * 1.2); ctx.beginPath(); ctx.ellipse(0, 0, 1.1 * u, 0.55 * u, 0, 0, TAU); ctx.fill(); ctx.restore(); }
                lmBox = { idx, x0: cx - 11 * u, x1: cx + 11 * u, y0: gy - 27 * u, y1: SH, cx, cy: gy - 17 * u };
            }
            ctx.restore();
        }

        function triggerLm() {
            const u = (SH / 60) * 0.8; const idx = lmBox.idx;
            if (idx === 1) { if (kitePos) { flash = 0.9; bolt = makeBolt(kitePos.x, kitePos.y); boltLife = 4; kiteStrike = 1; } }
            else if (idx === 3) {
                for (let i = 0; i < 14; i++) { const a = Math.random() * TAU; lmBurst.push({ type: 3, x: lmBox.cx + Math.cos(a) * 3 * u, y: lmBox.cy + Math.sin(a) * 2 * u, vx: Math.cos(a) * (0.8 + Math.random() * 0.8), vy: Math.sin(a) * 0.5 - 0.5 - Math.random() * 0.5, rot: 0, vr: 0, s: 0.9 + Math.random() * 0.9, life: 45 + Math.random() * 30 }); }
                lmFx = 0.28 + Math.random() * 0.55; lmHop = 1; const nx = lmFx * SW, ngy = SH - snowPile * 0.75 - 3 * u;
                for (let i = 0; i < 8; i++) { const a = Math.random() * TAU; lmBurst.push({ type: 3, x: nx + Math.cos(a) * 4 * u, y: ngy + Math.sin(a) * 2 * u, vx: Math.cos(a) * 0.6, vy: -0.3 - Math.random() * 0.4, rot: 0, vr: 0, s: 0.8 + Math.random() * 0.8, life: 40 + Math.random() * 20 }); }
            } else {
                lmShake = 1;
                for (let i = 0; i < 16; i++) { lmBurst.push({ type: idx, x: lmBox.cx + (Math.random() - 0.5) * 14 * u, y: lmBox.cy + (Math.random() - 0.5) * 8 * u, vx: (Math.random() - 0.5) * 2.6, vy: -0.4 - Math.random() * 1.4, rot: Math.random() * TAU, vr: (Math.random() - 0.5) * 0.3, s: 1.4 + Math.random() * 1.6, life: 80 + Math.random() * 70 }); }
            }
            if (lmBurst.length > 90) lmBurst.splice(0, lmBurst.length - 90);
            if (idx !== 1) window.dispatchEvent(new CustomEvent("gpay-mascot-burst", { detail: { idx, fx: lmFx } }));
        }

        function drawLmBurst() {
            if (!lmBurst.length) return; const u = (SH / 60) * 0.8;
            for (let i = lmBurst.length - 1; i >= 0; i--) {
                const b = lmBurst[i]; b.life -= 1; if (b.life <= 0 || b.y > SH + 8) { lmBurst.splice(i, 1); continue; }
                b.vy += b.type === 3 ? 0.02 : 0.035; b.vx = b.vx * 0.985 + wind * 0.004; b.x += b.vx; b.y += b.vy; b.rot += b.vr; const s = b.s * u;
                ctx.save(); ctx.globalAlpha = Math.min(1, b.life / 40); ctx.translate(b.x, b.y); ctx.rotate(b.rot);
                if (b.type === 0) { ctx.fillStyle = i % 2 ? "#ffc2da" : "#ffb0cf"; ctx.beginPath(); ctx.ellipse(0, 0, 0.55 * s, 0.95 * s, 0, 0, TAU); ctx.fill(); }
                else if (b.type === 2) { const ms = s * 0.9; ctx.fillStyle = i % 2 ? "#f5793b" : "#e8632a"; ctx.beginPath(); ctx.moveTo(MAPLE_LEAF[0][0] * ms, -MAPLE_LEAF[0][1] * ms); for (let j = 1; j < MAPLE_LEAF.length; j++) ctx.lineTo(MAPLE_LEAF[j][0] * ms, -MAPLE_LEAF[j][1] * ms); ctx.closePath(); ctx.fill(); }
                else { ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(0, 0, 0.55 * s, 0, TAU); ctx.fill(); }
                ctx.restore();
            }
            ctx.globalAlpha = 1;
        }

        function onSkyClick(e) {
            if (!lmBox) return; const r = sky.getBoundingClientRect(); const mx = e.clientX - r.left, my = e.clientY - r.top;
            if (mx < lmBox.x0 || mx > lmBox.x1 || my < lmBox.y0 || my > lmBox.y1) return;
            triggerLm();
        }

        function step() {
            raf = requestAnimationFrame(step);
            if (sky.offsetParent === null) return;
            skyT += 0.6;
            if (skyT >= nextGust) { windTarget = (Math.random() * 2 - 1) * (0.7 + Math.random() * 1.0); nextGust = skyT + 700 + Math.random() * 1400; }
            wind += (windTarget - wind) * 0.03; windTarget *= 0.99; windAcc += wind; lmShake *= 0.94;
            if (lmHop > 0) lmHop = Math.max(0, lmHop - 0.028);
            const themeNight = isDark();
            if (transitioning) { transP += 1 / 120; if (transP >= 1) { transP = 1; transitioning = false; nightMode = targetNight; } }
            else if (themeNight !== nightMode) { targetNight = themeNight; transitioning = true; transP = 0; spinModeIcon(); }
            let t = nightMode ? 1 : 0;
            if (transitioning) { const e = 0.5 - 0.5 * Math.cos(Math.PI * transP); const from = nightMode ? 1 : 0, to = targetNight ? 1 : 0; t = from + (to - from) * e; }
            drawSky(t);
        }

        function spinModeIcon() {
            const b = navbar.querySelector('[class*="toggleButton"]') || navbar.querySelector('button[aria-label*="mode" i]');
            const svg = b && b.querySelector("svg");
            if (svg && svg.animate) { svg.animate([{ transform: "rotate(0deg) scale(1)" }, { transform: "rotate(180deg) scale(0.5)" }, { transform: "rotate(360deg) scale(1)" }], { duration: 600, easing: "ease" }); }
        }

        window.addEventListener("resize", resize);
        navbar.addEventListener("click", onSkyClick);
        raf = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            navbar.removeEventListener("click", onSkyClick);
            if (sky.parentNode) sky.parentNode.removeChild(sky);
        };
    }

    function applySky() {
        if (skyOn()) {
            document.documentElement.classList.add("gpay-sky");
            if (!skyCleanup) skyCleanup = initSky();
        } else {
            if (skyCleanup) { skyCleanup(); skyCleanup = null; }
            document.documentElement.classList.remove("gpay-sky");
        }
    }

    applySky();
    window.addEventListener("gpay-sky-toggle", applySky);

    return () => {
        window.removeEventListener("gpay-sky-toggle", applySky);
        if (skyCleanup) skyCleanup();
        document.documentElement.classList.remove("gpay-sky");
    };
}
