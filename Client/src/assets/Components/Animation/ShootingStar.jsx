

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ShootingStar({ targetId }) {
  const [targetRect, setTargetRect] = useState(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (target) {
      const rect = target.getBoundingClientRect();
      setTargetRect({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, [targetId]);

  if (!targetRect) return null;

  return (
    <motion.div
      initial={{
        x: "-10%",
        y: "100%",
        opacity: 0.4,
        scale: 0.5,
      }}
      animate={{
        x: targetRect.x,
        y: targetRect.y,
        opacity: [0.4, 1, 0.2],
        scale: [0.5, 1.2, 0],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
      }}
      className="pointer-events-none fixed z-40"
    >
      {/* Shooting Line */}
      <div className="h-1 w-32 bg-gradient-to-r from-transparent via-blue-400 to-white rounded-full shadow-[0_0_20px_6px_rgba(0,150,255,0.8)]" />
    </motion.div>
  );
}
