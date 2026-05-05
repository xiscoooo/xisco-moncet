"use client";

import { motion } from "framer-motion";

export default function Ornament() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, type: "spring" }}
      className="mx-auto my-8 max-w-2xl px-6"
    >
      <div className="ornament">
        <motion.span
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1.2 }}
          className="font-display text-xl text-[#8a7c6a]"
        >
          ❦
        </motion.span>
      </div>
    </motion.div>
  );
}
