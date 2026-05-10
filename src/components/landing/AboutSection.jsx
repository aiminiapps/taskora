"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

export default function AboutSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {/* Main Quote-Style Headline */}
          <motion.p 
            variants={fadeUp} 
            custom={1}
            className="text-xl sm:text-2xl md:text-3xl text-white/70 leading-relaxed sm:leading-relaxed font-light max-w-3xl mx-auto text-balance"
          >
            From <span className="text-white font-medium">fundamental research</span> to{" "}
            <span className="text-white font-medium">real-time verdicts</span> —
            <br className="hidden sm:block" />
            Taskora adapts to your tokens, giving your portfolio{" "}
            <span className="text-gradient-brand font-semibold">exactly what it needs</span>, 
            when it needs it.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
