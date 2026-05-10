"use client";

import { motion } from "framer-motion";
import { RiEarthLine } from "react-icons/ri";

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
