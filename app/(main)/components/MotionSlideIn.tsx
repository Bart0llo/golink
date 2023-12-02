"use client";
import { motion } from "framer-motion";

export default function MotionSlieIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
}
