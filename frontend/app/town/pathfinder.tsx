
import { useEffect, useRef } from "react";

const DURATION = 3000;
const TRAIL_LENGTH = 60;
const PULSE_INTERVAL = 450;


interface Ring {
    x: number;
    y: number;
    r: number;
    opacity: number;
}

export default function PathFinder({ d }: { d: string }) {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotRef = useRef<SVGCircleElement>(null);
    const animRef = useRef<number>(0);
    const startRef = useRef<number | null>(null);
    const trailRef = useRef<{ x: number; y: number }[]>([]);
    const ringsRef = useRef<Ring[]>([]);
    const lastPulseRef = useRef<number>(0);

    useEffect(() => {
        const svg = svgRef.current;
        const path = pathRef.current;
        const canvas = canvasRef.current;
        const dot = dotRef.current;
        if (!svg || !path || !canvas || !dot) return;

        const syncCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = svg.clientWidth * dpr;
            canvas.height = svg.clientHeight * dpr;
            const ctx = canvas.getContext("2d")!;
            ctx.scale(dpr, dpr);
        };
        syncCanvas();
        window.addEventListener("resize", syncCanvas);

        const totalLength = path.getTotalLength();

        const animate = (ts: number) => {
            if (!startRef.current) startRef.current = ts;
            const elapsed = ts - startRef.current;
            const t = Math.min(elapsed / DURATION, 1);
            const pt = path.getPointAtLength(t * totalLength);

            // Move dot
            dot.setAttribute("cx", String(pt.x));
            dot.setAttribute("cy", String(pt.y));

            // Accumulate trail
            trailRef.current.push({ x: pt.x, y: pt.y });
            if (trailRef.current.length > TRAIL_LENGTH) trailRef.current.shift();

            // Spawn pulse ring
            if (ts - lastPulseRef.current > PULSE_INTERVAL) {
                ringsRef.current.push({ x: pt.x, y: pt.y, r: 4, opacity: 0.9 });
                lastPulseRef.current = ts;
            }

            // Age rings
            ringsRef.current = ringsRef.current
                .map((ring) => ({ ...ring, r: ring.r + 2.2, opacity: ring.opacity - 0.018 }))
                .filter((ring) => ring.opacity > 0);

            // Draw canvas
            const ctx = canvas.getContext("2d")!;
            const dpr = window.devicePixelRatio || 1;
            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

            // --- Glowing trail ---
            const trail = trailRef.current;
            for (let i = 1; i < trail.length; i++) {
                const frac = i / trail.length;
                ctx.beginPath();
                ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
                ctx.lineTo(trail[i].x, trail[i].y);
                ctx.strokeStyle = `rgba(0,255,220,${frac * 0.75})`;
                ctx.lineWidth = 1 + frac * 3.5;
                ctx.lineCap = "round";
                ctx.shadowBlur = 10 * frac;
                ctx.shadowColor = "#00ffcc";
                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            // --- Pulse rings ---
            for (const ring of ringsRef.current) {
                ctx.beginPath();
                ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0,255,200,${ring.opacity})`;
                ctx.lineWidth = 1.5;
                ctx.shadowBlur = 8;
                ctx.shadowColor = "#00ffcc";
                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            if (t < 1) {
                animRef.current = requestAnimationFrame(animate);
            }
        };

        animRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", syncCanvas);
        };
    }, [d]);

    return (
        <>
            {/* Scan line overlay */}
            <div className="scan-overlay absolute inset-0 pointer-events-none" />

            {/* Canvas: trail + rings */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 pointer-events-none"
                style={{
                    width: "100%",
                    height: "100%",
                    mixBlendMode: "screen",
                }}
            />

            {/* SVG: path + dot */}
            <svg
                ref={svgRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
            >
                <defs>
                    <filter id="glow-filter">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="dot-glow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Ghosted dashed base path */}
                <path
                    d={d}
                    stroke="rgba(0,255,200,0.15)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="5 6"
                />

                {/* Animated draw path */}
                <path
                    ref={pathRef}
                    d={d}
                    stroke="#00ffcc"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow-filter)"
                    className="path-animate"
                />

                {/* Moving dot — pulsates via CSS */}
                <circle
                    ref={dotRef}
                    cx="0"
                    cy="0"
                    r="5"
                    fill="#00ffcc"
                    filter="url(#dot-glow)"
                    className="dot-pulse"
                />
            </svg>
        </>
    );
}