import { motion } from "framer-motion";

export default function GlowBurst({ targetId }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.5, 1], opacity: [0, 0.8, 0] }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="pointer-events-none absolute z-50 rounded-full bg-blue-400 blur-2xl"
      style={{
        width: "300px",
        height: "300px",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
