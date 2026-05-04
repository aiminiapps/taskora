"use client";

import { motion } from "framer-motion";
import { RiEarthLine } from "react-icons/ri";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// TopoJSON map data
const geoUrl = "/features.json";

// Major hub coordinates for the network map
const markers = [
  { name: "New York", coordinates: [-74.006, 40.7128], color: "#7c75ff" },
  { name: "London", coordinates: [-0.1276, 51.5072], color: "#2dd4a0" },
  { name: "Tokyo", coordinates: [139.6917, 35.6895], color: "#f7c94b" },
  { name: "Singapore", coordinates: [103.8198, 1.3521], color: "#7c75ff" },
  { name: "Dubai", coordinates: [55.2708, 25.2048], color: "#2dd4a0" },
  { name: "San Francisco", coordinates: [-122.4194, 37.7749], color: "#f7c94b" },
];

// Arcs connecting the hubs
const lines = [
  { from: [-74.006, 40.7128], to: [-0.1276, 51.5072] },     // NY -> London
  { from: [-0.1276, 51.5072], to: [55.2708, 25.2048] },     // London -> Dubai
  { from: [55.2708, 25.2048], to: [103.8198, 1.3521] },     // Dubai -> Singapore
  { from: [103.8198, 1.3521], to: [139.6917, 35.6895] },    // Singapore -> Tokyo
  { from: [139.6917, 35.6895], to: [-122.4194, 37.7749] },  // Tokyo -> SF
  { from: [-122.4194, 37.7749], to: [-74.006, 40.7128] },   // SF -> NY
  { from: [-0.1276, 51.5072], to: [103.8198, 1.3521] }      // London -> Singapore
];

export default function AboutSection() {
  const stats = [
    { value: "50K+", label: "Analyses Generated" },
    { value: "3", label: "Specialized AI Models" },
    { value: "100%", label: "Real-time Market Data" },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Content Area */}
          <motion.div 
            className="flex-1 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Top Badge matching the image style */}
            <motion.div variants={fadeUp} custom={0} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <RiEarthLine className="text-white/60" />
                <span className="text-xs font-semibold text-white/70 ">
                  Global Intelligence Network
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h2 
              variants={fadeUp} 
              custom={1}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6 text-white"
            >
              Smart Investing with{" "}
              <span className="text-[#7c75ff]">
                Machine Precision
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={fadeUp} 
              custom={2}
              className="text-white/50 text-base sm:text-lg max-w-xl leading-relaxed mb-12 font-light"
            >
              Instead of relying on biased influencers, harness our autonomous network 
              of AI agents. They instantly cross-examine token fundamentals, technical 
              action, and market sentiment to give you total investment clarity.
            </motion.p>

            {/* Stats Area (Stacked exactly like the reference image) */}
            <motion.div variants={fadeUp} custom={3} className="space-y-6 max-w-lg">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between mb-6">
                    <h3 className="text-4xl sm:text-5xl font-mono font-medium text-white tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-white/40 font-medium">
                      {stat.label}
                    </p>
                  </div>
                  {/* Subtle Separator border */}
                  {i !== stats.length - 1 && (
                    <div className="h-px w-full bg-gradient-to-r from-white/[0.1] to-transparent" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Graphic Area (A premium 2D Dot Map with Network Connections) */}
          <motion.div 
            className="flex-1 w-full relative h-[400px] lg:h-[600px] flex items-center justify-center pointer-events-none overflow-hidden rounded-3xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 w-[140%] h-[140%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ mixBlendMode: "screen" }}>
              <ComposableMap
                projection="geoEquirectangular"
                projectionConfig={{ scale: 220, center: [20, 10] }}
                className="w-full h-full object-cover"
              >
                {/* Custom Dot Pattern and Glow Gradients */}
                <defs>
                  <pattern id="dotPattern" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
                    <circle cx="3.5" cy="3.5" r="1.5" fill="#5F718B" opacity="0.4" />
                  </pattern>
                  <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c75ff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#2dd4a0" stopOpacity="1" />
                    <stop offset="100%" stopColor="#7c75ff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c75ff" />
                    <stop offset="100%" stopColor="#2dd4a0" />
                  </linearGradient>
                </defs>

                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        // Use the dot pattern to fill the countries, creating the "Dot Map" effect
                        fill="url(#dotPattern)"
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Animated Connecting Arcs */}
                {lines.map((line, i) => (
                  <g key={`line-group-${i}`}>
                    {/* Glow aura */}
                    <Line
                      from={line.from}
                      to={line.to}
                      stroke="url(#arcGlow)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      opacity="0.15"
                      style={{ filter: "blur(4px)" }}
                    />
                    {/* The traveling beam */}
                    <Line
                      from={line.from}
                      to={line.to}
                      stroke="url(#arcGradient)"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      className={`animated-arc-${i % 2 === 0 ? 'fast' : 'slow'}`}
                    />
                  </g>
                ))}

                {/* Active Hub Markers Matching Reference */}
                {markers.map(({ name, coordinates, color }) => (
                  <Marker key={name} coordinates={coordinates}>
                    {/* Shadow Pill Backdrop for Label */}
                    <rect x="0" y="-12" width="65" height="24" rx="12" fill="#000000" opacity="0.6" />
                    
                    {/* The Badge Text */}
                    <text x="24" y="3" fontSize={11} fill="#e2e8f0" fontWeight={500} style={{ pointerEvents: "none" }}>
                      {name === "San Francisco" ? "SF" : name}
                    </text>

                    {/* Outer Ping Ring */}
                    <circle r={10} fill="none" stroke="#e85d04" strokeWidth="1" className="animate-ping" style={{ animationDuration: "2s" }} />
                    <circle r={10} fill="none" stroke="#e85d04" strokeWidth="2" opacity="0.8" />
                    
                    {/* Inner Graphic - Emulate Flag Style */}
                    <circle r={7} fill="#1a202c" stroke="#e85d04" strokeWidth="1" />
                    <circle r={3} fill="#a0aec0" />
                  </Marker>
                ))}
              </ComposableMap>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Global styles for the SVG map animations */}
      <style jsx global>{`
        .animated-arc-fast {
          stroke-dasharray: 8 20;
          animation: map-dash-fast 3s linear infinite;
        }
        .animated-arc-slow {
          stroke-dasharray: 6 24;
          animation: map-dash-slow 4.5s linear infinite;
        }
        @keyframes map-dash-fast {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes map-dash-slow {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}
